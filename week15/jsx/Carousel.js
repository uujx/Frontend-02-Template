import { Component, createElement, STATE, ATTRIBUTES } from './framework.js'
import { enableGesture } from './gesture.js'
import { Timeline, Animation } from './animation.js'

// 可能有类继承Carousel，所以export
export { STATE, ATTRIBUTES } from './framework.js'

export class Carousel extends Component {
  constructor() {
    super()
  }

  render() {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')
    for (let record of this[ATTRIBUTES].src) {
      let child = document.createElement('div')
      child.style.backgroundImage = `url('${record.img}')`
      this.root.appendChild(child)
    }

    enableGesture(this.root)
    let timeline = new Timeline()
    timeline.start()

    let children = this.root.children

    this[STATE].position = 0
    let duration = 1000
    let handler

    let t = 0
    let ax = 0 // animation caused offset

    this.root.addEventListener('start', (e) => {
      timeline.pause()
      clearInterval(handler)

      let progress = (Date.now() - t) / duration
      ax = progress * 500 - 500
    })

    this.root.addEventListener('tap', (e) => {
      this.triggerEvent('click', {
        position: this[STATE].position,
        data: this[ATTRIBUTES].src[this[STATE].position]
      })
    })

    this.root.addEventListener('pan', (e) => {
      let x = e.clientX - e.startX - ax // 考虑动画造成的偏移
      let current = this[STATE].position - (x - (x % 500)) / 500

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = ((pos % children.length) + children.length) % children.length

        children[pos].style.transition = 'none'
        children[pos].style.transform = `translateX(${
          -pos * 500 + offset * 500 + (x % 500)
        }px)`
      }
    })

    this.root.addEventListener('end', (e) => {
      timeline.reset()
      timeline.start()
      handler = setInterval(nextPic, 2000)

      let x = e.clientX - e.startX - ax
      let current = this[STATE].position - (x - (x % 500)) / 500

      let direction = Math.round((x % 500) / 500)

      if (e.isFlick) {
        if (e.velocity < 0) {
          direction = Math.ceil((x % 500) / 500)
        } else {
          direction = Math.floor((x % 500) / 500)
        }
      }

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = ((pos % children.length) + children.length) % children.length

        children[pos].style.transition = 'none'

        timeline.add(
          new Animation(
            children[pos].style,
            'transform',
            -pos * 500 + offset * 500 + (x % 500),
            -pos * 500 + offset * 500 + direction * 500,
            duration,
            0,
            (v) => v,
            (v) => `translateX(${v}px)`
          )
        )
      }

      this[STATE].position =
        this[STATE].position - (x - (x % 500)) / 500 - direction
      this[STATE].position =
        ((this[STATE].position % children.length) + children.length) %
        children.length

      this.triggerEvent('change', { position: this[STATE].position })
    })

    let nextPic = () => {
      let children = this.root.children
      let nextIndex = (this[STATE].position + 1) % children.length

      let current = children[this[STATE].position]
      let next = children[nextIndex]

      t = Date.now()

      timeline.add(
        new Animation(
          current.style,
          'transform',
          -this[STATE].position * 500,
          -500 - this[STATE].position * 500,
          duration,
          0,
          (v) => v,
          (v) => `translateX(${v}px)`
        )
      )
      timeline.add(
        new Animation(
          next.style,
          'transform',
          500 - nextIndex * 500,
          -nextIndex * 500,
          duration,
          0,
          (v) => v,
          (v) => `translateX(${v}px)`
        )
      )

      this[STATE].position = nextIndex
      this.triggerEvent('change', { position: this[STATE].position })
    }

    handler = setInterval(nextPic, 2000)

    return this.root
  }
}
