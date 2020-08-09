// 编写一个 match 函数。它接受两个参数，第一个参数是一个选择器字符串性质，第二个是一个 HTML 元素。这个元素你可以认为它一定会在一棵 DOM 树里面。通过选择器和 DOM 元素来判断，当前的元素是否能够匹配到我们的选择器。（不能使用任何内置的浏览器的函数，仅通过 DOM 的 parent 和 children 这些 API，来判断一个元素是否能够跟一个选择器相匹配。）以下是一个调用的例子。

function match(selector, element) {
  if (selector === '' || !element) return

  class TraceElement {
    constructor() {
      this.id = ''
      this.currentClass = ''
      this.classList = []
      this.tagName = ''
      this.children = []
      this.parent = null
    }
  }

  const rootElement = new TraceElement()
  let currentElement = rootElement

  // 只考虑子孙选择器 - 空格连接的简单选择器
  let state = start
  for (let c of selector) {
    state = state(c)
  }
  if (currentElement.currentClass !== '') {
    currentElement.classList.push(currentElement.currentClass)
  }

  // div #id.class
  let curEl = currentElement
  let targetEl = element
  let isCurElMatched = true
  let isLastEl = true
  while (curEl !== null) {
    if (targetEl === document) {
      return false
    }

    if (curEl.id !== '') {
      isCurElMatched = isCurElMatched && targetEl.id === curEl.id
    }

    if (curEl.classList.length !== 0) {
      curEl.classList.forEach((className) => {
        isCurElMatched =
          isCurElMatched && Array.from(targetEl.classList).includes(className)
      })
    }

    if (curEl.tagName !== '') {
      isCurElMatched =
        isCurElMatched && targetEl.tagName.toLowerCase() === curEl.tagName
    }

    // target element does't match, return false directly
    if (isLastEl) {
      if (!isCurElMatched) {
        return false
      }
      isLastEl = false
    }

    // parent element match or not
    if (isCurElMatched) {
      curEl = curEl.parent
    } else {
      isCurElMatched = true
    }
    targetEl = targetEl.parentNode
  }

  return true

  function start(c) {
    if (c === '.') {
      return className
    } else if (c === '#') {
      return idName
    } else if (c === ' ') {
      return child(c)
    } else {
      return tagName(c)
    }
  }

  function className(c) {
    if (c === '.' || c === '#' || c === ' ') {
      return classNameEnd(c)
    } else {
      currentElement.currentClass += c
      return className
    }
  }

  function classNameEnd(c) {
    currentElement.classList.push(currentElement.currentClass)
    currentElement.className = ''
    return start(c)
  }

  function idName(c) {
    if (c === '.' || c === '#' || c === ' ') {
      return start(c)
    } else {
      currentElement.id += c
      return idName
    }
  }

  function tagName(c) {
    if (c === '.' || c === '#' || c === ' ') {
      return start(c)
    } else {
      currentElement.tagName += c
      return tagName
    }
  }

  function child(c) {
    let newElement = new TraceElement()
    newElement.parent = currentElement
    currentElement.children.push(newElement)
    currentElement = newElement
    return start
  }
}

// 只考虑简单选择器 .class #id div
// if (selector[0] === '#' && element.id === selector.replace('#', '')) {
//   return true
// } else if (
//   selector[0] === '.' &&
//   Array.from(element.classList).includes(selector.replace('.', ''))
// ) {
//   return true
// } else if (selector === element.tagName.toLowerCase()) {
//   return true
// }
// return false

// Test
console.log(match('div', document.getElementById('id'))) // true
console.log(match('.class', document.getElementById('id'))) // false
console.log(match('#id', document.getElementById('id'))) // true

console.log(match('div #id.class', document.getElementById('id'))) // false
console.log(match('div .class', document.querySelector('.class'))) // true
console.log(match('div #id', document.getElementById('id'))) // true
console.log(match('main #id', document.getElementById('id'))) // false
