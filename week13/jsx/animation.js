const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ANIMATIONS = Symbol('animations')
const START_TIME = Symbol('start-time')
const PAUSE_START = Symbol('pause-start')
const PAUSE_TIME = Symbol('pause-time')

export class Timeline {
  constructor() {
    this.state = 'init'
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
  }

  // 启动tick，tick是私有方法
  start() {
    if (this.state !== 'init') return
    this.state = 'start'

    let startTime = Date.now()
    this[PAUSE_TIME] = 0

    this[TICK] = () => {
      let now = Date.now()
      for (let animation of this[ANIMATIONS]) {
        let t

        if (this[START_TIME].get(animation) < startTime) {
          t = now - startTime - this[PAUSE_TIME] - animation.delay
        } else {
          t =
            now -
            this[START_TIME].get(animation) -
            this[PAUSE_TIME] -
            animation.delay
        }

        if (animation.duration < t) {
          this[ANIMATIONS].delete(animation)
          t = animation.duration
        }

        if (t > 0) {
          animation.receiveTime(t)
        }
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }

    this[TICK]()
  }

  add(animation, startTime) {
    if (arguments.length < 2) {
      startTime = Date.now()
    }
    this[ANIMATIONS].add(animation)
    this[START_TIME].set(animation, startTime)
  }

  // 暂停
  pause() {
    if (this.state !== 'start') return
    this.state = 'pause'

    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLER])
  }

  // 恢复
  resume() {
    if (this.state !== 'pause') return
    this.state = 'start'

    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]()
  }

  // 重启，
  reset() {
    this.pause()
    
    this.state = 'init'
    this[PAUSE_TIME] = 0
    this[PAUSE_START] = 0
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
    this[TICK_HANDLER] = null
  }

  // 高级功能，暂不考虑
  // set rate() {}
  // get rate() {}
}

// 属性动画
export class Animation {
  constructor(
    obj,
    prop,
    startVal,
    endVal,
    duration,
    delay,
    timingFn,
    template
  ) {
    this.obj = obj
    this.prop = prop
    this.startVal = startVal
    this.endVal = endVal
    this.duration = duration
    this.delay = delay
    this.timingFn = timingFn || ((v) => v)
    this.template = template || ((v) => v)
  }

  receiveTime(time) {
    console.log(time)

    let range = this.endVal - this.startVal
    let progress = this.timingFn(time / this.duration)

    this.obj[this.prop] = this.template(this.startVal + range * progress)
  }
}
