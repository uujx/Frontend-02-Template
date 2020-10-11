// ****************API****************

// 派发事件
export class Dispatcher {
  constructor(el) {
    this.el = el
  }

  dispatch(type, props) {
    let event = new Event(type)
    event = Object.assign(event, props)

    this.el.dispatchEvent(event)
  }
}

// new Listener(new Recognizer(dispatch))

export class Listener {
  constructor(el, recognizer) {
    let isListeningMouse = false
    let contexts = new Map()

    // 鼠标事件
    el.addEventListener('mousedown', (e) => {
      let context = Object.create(null)
      contexts.set('mouse' + (1 << e.button), context)

      recognizer.start(e, context)

      let mousemove = (event) => {
        // event.buttons 掩码 0b00001表示左键
        let button = 1

        while (button <= event.buttons) {
          if (button & event.buttons) {
            //move的buttons 和 down的button 中右键相反
            let key
            if (button === 2) {
              key = 4
            } else if (button === 4) {
              key = 2
            } else {
              key = button
            }

            let context = contexts.get('mouse' + key)
            recognizer.move(event, context)
          }

          button = button << 1
        }
      }

      let mouseup = (event) => {
        let context = contexts.get('mouse' + (1 << event.button))

        recognizer.end(event, context)

        contexts.delete('mouse' + (1 << event.button))

        if (event.buttons === 0) {
          document.removeEventListener('mousemove', mousemove)
          document.removeEventListener('mouseup', mouseup)
          isListeningMouse = false
        }
      }

      if (!isListeningMouse) {
        isListeningMouse = true

        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
      }
    })

    // 触屏事件
    el.addEventListener('touchstart', (event) => {
      for (let touch of event.changedTouches) {
        let context = Object.create(null)
        contexts.set(touch.identifier, context)

        recognizer.start(touch, context)
      }
    })

    el.addEventListener('touchmove', (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)

        recognizer.move(touch, context)
      }
    })

    el.addEventListener('touchend', (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)

        recognizer.end(touch, context)

        contexts.delete(touch.identifier)
      }
    })

    el.addEventListener('touchcancel', (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)

        recognizer.cancel(touch, context)

        contexts.delete(touch.identifier)
      }
    })
  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher
  }

  start(point, context) {
    context.startX = point.clientX
    context.startY = point.clientY

    this.dispatcher.dispatch('start', {
      clientX: point.clientX,
      clientY: point.clientY
    })

    context.points = [
      {
        t: Date.now(),
        x: point.clientX,
        y: point.clientY
      }
    ]

    context.isPan = false
    context.isTap = true // pan和tap互斥，是tap就不会是pan
    context.isPress = false

    context.handler = setTimeout(() => {
      context.isPan = false
      context.isTap = false
      context.isPress = true
      context.handler = null

      this.dispatcher.dispatch('press', {}) // 实际是pressstart
    }, 500)
  }

  move(point, context) {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY

    // 判断是否移动10px
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isPan = true
      context.isTap = false
      context.isPress = false
      context.isVertical = Math.abs(dx) < Math.abs(dy)

      this.dispatcher.dispatch('panstart', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      })

      clearTimeout(context.handler)
    }

    if (context.isPan) {
      this.dispatcher.dispatch('pan', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      })
    }

    // 只记录500ms内的点
    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    )

    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    })
  }

  end(point, context) {
    if (context.isTap) {
      this.dispatcher.dispatch('tap', {})
      clearTimeout(context.handler)
    }

    if (context.isPress) {
      this.dispatcher.dispatch('pressend', {})
    }

    // 计算速度
    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    )

    let d, v

    if (!context.points.length) {
      v = 0
    } else {
      d = Math.sqrt(
        (point.clientX - context.points[0].x) ** 2 +
          (point.clientY - context.points[0].y) ** 2
      )

      v = d / (Date.now() - context.points[0].t)
    }

    if (v > 1.5) {
      this.dispatcher.dispatch('flick', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      })
      context.isFlick = true
    } else {
      context.isFlick = false
    }

    if (context.isPan) {
      this.dispatcher.dispatch('panend', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      })
    }

    this.dispatcher.dispatch('end', {
      startX: context.startX,
      startY: context.startY,
      clientX: point.clientX,
      clientY: point.clientY,
      isVertical: context.isVertical,
      isFlick: context.isFlick,
      velocity: v
    })
  }

  cancel(point, context) {
    this.dispatcher.dispatch('cancel', {})

    clearTimeout(context.handler)
  }
}

export function enableGesture(element) {
  new Listener(element, new Recognizer(new Dispatcher(element)))
}
