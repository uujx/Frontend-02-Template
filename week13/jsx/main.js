import { Component, createElement } from './framework.js'
import { Carousel } from './carousel.js'
import { Timeline, Animation } from './animation.js'

const images = [
  'https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1552933529-e359b2477252?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1456796148441-485386946471?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1531646838846-5033894ba2d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
]

const a = <Carousel src={images} />
a.mountTo(document.body)

let tl = new Timeline()
window.tl = tl
window.animation = new Animation({}, 'a', 0, 100, 1000, null)

tl.start()
