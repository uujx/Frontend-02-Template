# Week 11 学习笔记

- [Week 11 学习笔记](#week-11-%e5%ad%a6%e4%b9%a0%e7%ac%94%e8%ae%b0)
  - [proxy 与双向绑定 | proxy 的基本用法](#proxy-%e4%b8%8e%e5%8f%8c%e5%90%91%e7%bb%91%e5%ae%9a--proxy-%e7%9a%84%e5%9f%ba%e6%9c%ac%e7%94%a8%e6%b3%95)
  - [proxy 与双向绑定 | 模仿 reactive 实现原理](#proxy-%e4%b8%8e%e5%8f%8c%e5%90%91%e7%bb%91%e5%ae%9a--%e6%a8%a1%e4%bb%bf-reactive-%e5%ae%9e%e7%8e%b0%e5%8e%9f%e7%90%86)
  - [proxy 与双向绑定 | reactivity 响应式对象](#proxy-%e4%b8%8e%e5%8f%8c%e5%90%91%e7%bb%91%e5%ae%9a--reactivity-%e5%93%8d%e5%ba%94%e5%bc%8f%e5%af%b9%e8%b1%a1)
  - [使用 Range 实现 DOM 精确操作 | 基本拖拽](#%e4%bd%bf%e7%94%a8-range-%e5%ae%9e%e7%8e%b0-dom-%e7%b2%be%e7%a1%ae%e6%93%8d%e4%bd%9c--%e5%9f%ba%e6%9c%ac%e6%8b%96%e6%8b%bd)
  - [使用 Range 实现 DOM 精确操作 | 正常流里的拖拽](#%e4%bd%bf%e7%94%a8-range-%e5%ae%9e%e7%8e%b0-dom-%e7%b2%be%e7%a1%ae%e6%93%8d%e4%bd%9c--%e6%ad%a3%e5%b8%b8%e6%b5%81%e9%87%8c%e7%9a%84%e6%8b%96%e6%8b%bd)

---

## proxy 与双向绑定 | proxy 的基本用法

```javascript
let object = {
  a: 1,
  b: 2
}

let po = new Proxy(object, {
  set(obj, prop, val) {
    console.log(obj, prop, val)
  }
})

po.a = 3
po.x = 5 // po.x不存在，但依旧会触发set
```

1. object 是不可监听的，只是一个单纯的数据存储
2. proxy 可以监听并且改变行为，导致代码可预测性降低，适合用来做底层的库
3. 即使属性不存在，也会触发
4. 直接调用 object 不会触发 proxy 上的方法，只有通过 po

---

## proxy 与双向绑定 | 模仿 reactive 实现原理

- Vue 的 reactive 包实现原理，使用 proxy 实现
- 把对象简单包装，po 对 object 的完全代理，需要考虑所有的 hook

```javascript
function reactive(obj) {
  if (reactivies.has(obj)) {
    return reactivities.get(obj)
  }

  let proxy = new Proxy(obj, {
    set(obj, prop, val) {
      obj[prop] = val

      if (callbacks.has(obj) && callbacks.get(obj).has(prop)) {
        for (let cb of callbacks.get(obj).get(prop)) {
          cb()
        }
      }

      return obj[prop]
    },
    get(obj, prop) {
      useReactivities.push([obj, prop])
      if (typeof obj[prop] === 'obj') {
        return reactive(obj[prop])
      }
      return obj[prop]
    }
  })

  reactivities.set(obj, proxy)

  return proxy
}

let callbacks = new Map()
let reactivities = new Map()
let useReactivities = []

// 在effect中先调用一次callback
// 记录下来callback依赖哪些proxy变量的哪些属性
// 这样只有这些属性变化时候，才触发对应的effect
function effect(callback) {
  // callbacks.push(callback)
  useReactivities = []

  callback()

  for (let [obj, prop] of useReactivities) {
    if (!callbacks.has(obj)) {
      callbacks.set(obj, new Map())
    }
    if (!callbacks.get(obj).has(prop)) {
      callbacks.get(obj).set(prop, [])
    }
    callbacks.get(obj).get(prop).push(callback)
  }
}

let object = {
  a: 1,
  b: 2
}

let po = reactive(object)

effect(() => {
  console.log(po.a)
})
```

- 由于不能获得一个 effect 函数内部到底使用了哪些变量，也没有数据结构可以存储，所以通过调用一次这个函数，如果这个函数使用了 proxy 变量，在 proxy 变量的 get hook 里就可以做监听
- reactive 函数需要处理 **嵌套对象**，如：po.a.b
- 实际需要大量 test case 保证边缘情况，参考 Vue 源码

---

## proxy 与双向绑定 | reactivity 响应式对象

Reactive 有什么用

- Reactivity 是半成品的双向绑定，负责从数据到 DOM 元素的这一条线的监听；也不一定是到 DOM 元素
- 再通过 DOM 元素的 addEventListener，就可以实现双向绑定了

---

## 使用 Range 实现 DOM 精确操作 | 基本拖拽

不仅仅是拖动，拖动的元素还要参与排版

为什么在 mousedown 里监听 mousemove 和 mouseup：

- 如果用一个 flag 去检测是不是已经 mousedown，再决定 mousemove，总是要执行 mousemove，性能上不行
- mousemove 和 mouseup 都需要在 document 上监听，如果在 dragable 上监听，一旦鼠标移动快了超过了 dragable 的区域，就会出现拖断现象

---

## 使用 Range 实现 DOM 精确操作 | 正常流里的拖拽

- 文字没有分节点，所以需要用 range 去找到空位
- range.insertNode() 如果已经存在，就会先 remove 再 insert，所以不需要先 remove
