import { Component, createElement } from './framework.js'
import { Carousel } from './Carousel.js'
import { Button } from './Button.js'
import { List } from './List.js'
import { Timeline, Animation } from './animation.js'

const images = [
  {
    img:
      'https://images.unsplash.com/photo-1516125073169-9e3ecdee83e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    url: 'https://time.geekbang.org',
    title: '大咪'
  },
  {
    img:
      'https://images.unsplash.com/photo-1552933529-e359b2477252?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1050&q=80',
    url: 'https://time.geekbang.org',
    title: '二咪'
  },
  {
    img:
      'https://images.unsplash.com/photo-1456796148441-485386946471?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    url: 'https://time.geekbang.org',
    title: '三咪'
  },
  {
    img:
      'https://images.unsplash.com/photo-1531646838846-5033894ba2d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    url: 'https://time.geekbang.org',
    title: '小咪'
  }
]

// const a = (
//   <Carousel
//     src={images}
//     onChange={(event) => console.log(event.detail.position)}
//     onClick={(e) => {
//       window.location.href = e.detail.data.url
//     }}
//   />
// )

// 内容children
// let a = <Button>content</Button>

// 模板children
let a = (
  <List data={images}>
    {(record) => (
      <div>
        <img src={record.img} />
        <a href={record.url}>{record.title}</a>
      </div>
    )}
  </List>
)

a.mountTo(document.body)

// let tl = new Timeline()
// window.tl = tl
// window.animation = new Animation({}, 'a', 0, 100, 1000, null)

// tl.start()
