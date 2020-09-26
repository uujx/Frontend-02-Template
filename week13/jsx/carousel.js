import { Component, createElement } from './framework.js'

export class Carousel extends Component {
  constructor() {
    super()
    this.attributes = Object.create(null)
  }

  setAttribute(name, value) {
    this.attributes[name] = value
  }

  render() {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')
    for (let record of this.attributes.src) {
      let child = document.createElement('div')
      child.style.backgroundImage = `url('${record}')`
      this.root.appendChild(child)
    }

    let position = 0

    this.root.addEventListener('mousedown', (event) => {
      let children = this.root.children
      let startX = event.clientX

      let move = (event) => {
        let x = event.clientX - startX

        let current = position - (x - (x % 500)) / 500

        for (let offset of [-1, 0, 1]) {
          let pos = current + offset
          pos = (pos + children.length) % children.length

          children[pos].style.transition = 'none'
          children[pos].style.transform = `translateX(${
            -pos * 500 + offset * 500 + (x % 500)
          }px)`
        }
      }

      let up = (event) => {
        let x = event.clientX - startX
        position -= Math.round(x / 500)

        for (let offset of [
          0,
          - Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))
        ]) {
          let pos = position + offset
          pos = (pos + children.length) % children.length

          children[pos].style.transition = ''
          children[pos].style.transform = `translateX(${
            -pos * 500 + offset * 500
          }px)`
        }

        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)

      document.addEventListener('mouseup', up)
    })

    // 自动播放
    // let curIndex = 0
    // setInterval(() => {
    //   let children = this.root.children
    //   let nextIndex = (curIndex + 1) % children.length

    //   let current = children[curIndex]
    //   let next = children[nextIndex]

    //   // 把下一张要显示的图片transform到下一张的位置
    //   next.style.transition = 'none'
    //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`

    //   // 如果用requestAnimationFrame，需要用两次
    //   setTimeout(() => {
    //     next.style.transition = '' // 置为空的话，js的控制就失效了，css里写的就生效了
    //     current.style.transform = `translateX(${-100 - curIndex * 100}%)`
    //     next.style.transform = `translateX(${-nextIndex * 100}%)`

    //     curIndex = nextIndex
    //   }, 16)
    // }, 2000)

    return this.root
  }

  mountTo(parent) {
    parent.appendChild(this.render())
  }
}


