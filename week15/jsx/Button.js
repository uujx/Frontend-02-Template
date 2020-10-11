import { Component, createElement, STATE, ATTRIBUTES } from './framework.js'
import { enableGesture } from './gesture.js'

// 可能有类继承Carousel，所以export
export { STATE, ATTRIBUTES } from './framework.js'

export class Button extends Component {
  constructor() {
    super()
  }

  render() {
    this.childContainer = <span />
    this.root = (<div>{this.childContainer}</div>).render()

    return this.root
  }

  appendChild(child) {
    if (!this.childContainer) {
      this.render()
    }
    this.childContainer.appendChild(child)
  }
}
