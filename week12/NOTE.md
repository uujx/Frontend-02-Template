# Week12 学习笔记

- [Week12 学习笔记](#week12-%e5%ad%a6%e4%b9%a0%e7%ac%94%e8%ae%b0)
  - [组件的基本知识 | 组件的基本概念和基本组成部分](#%e7%bb%84%e4%bb%b6%e7%9a%84%e5%9f%ba%e6%9c%ac%e7%9f%a5%e8%af%86--%e7%bb%84%e4%bb%b6%e7%9a%84%e5%9f%ba%e6%9c%ac%e6%a6%82%e5%bf%b5%e5%92%8c%e5%9f%ba%e6%9c%ac%e7%bb%84%e6%88%90%e9%83%a8%e5%88%86)
    - [对象与组件](#%e5%af%b9%e8%b1%a1%e4%b8%8e%e7%bb%84%e4%bb%b6)
      - [Attribute 与 Property](#attribute-%e4%b8%8e-property)
    - [如何设计组件状态](#%e5%a6%82%e4%bd%95%e8%ae%be%e8%ae%a1%e7%bb%84%e4%bb%b6%e7%8a%b6%e6%80%81)
    - [Lifecycle](#lifecycle)
    - [Children](#children)
  - [组件的基本知识 | 为组件添加 JSX 语法](#%e7%bb%84%e4%bb%b6%e7%9a%84%e5%9f%ba%e6%9c%ac%e7%9f%a5%e8%af%86--%e4%b8%ba%e7%bb%84%e4%bb%b6%e6%b7%bb%e5%8a%a0-jsx-%e8%af%ad%e6%b3%95)
  - [组件的基本知识 | JSX 的基本使用方法](#%e7%bb%84%e4%bb%b6%e7%9a%84%e5%9f%ba%e6%9c%ac%e7%9f%a5%e8%af%86--jsx-%e7%9a%84%e5%9f%ba%e6%9c%ac%e4%bd%bf%e7%94%a8%e6%96%b9%e6%b3%95)
  - [轮播组件](#%e8%bd%ae%e6%92%ad%e7%bb%84%e4%bb%b6)

---

## 组件的基本知识 | 组件的基本概念和基本组成部分

前端架构：组件化 + 架构模式

组件化：目标是服用，直接决定了团队的复用率
架构模式：如 MVC，MVVM，主要在于前端和数据逻辑层是如何交互的

### 对象与组件

- 组件是和 UI 强相关的，是一种特殊的模块和对象。特点以树形结构来进行组合，具有一定的模板化的配置能力

对象：属性，方法，继承关系
组件：除了以上三个，还包括 Attribute，Config & State，Event，Lifecycle，Children

因为组件的这些特点，使得它成为适合描述 UI 的概念

#### Attribute 与 Property

Attribute 和 Property 可以统一，取决于组件的设计者
Attribute 强调描述性，Property 强调从属关系
实际中，property 是用面向对象实现的，attribute 是 XML 的概念

Ex1: HTML element class

```html
<!-- Attribute: class -->
<div class="cls1 cls2"></div>
<script>
  const div = document.getElementByTagName('div')
  // Property: className
  div.className
</script>
```

Ex2: HTML element style

```html
<!-- Attribute: string -->
<div style="color: blue;"></div>
<script>
  const div = document.getElementByTagName('div')
  // Property: style - k-v Object
  div.style
</script>
```

Ex3: HTML a href

```html
<a href="//m.taobao.com"></a>
<script>
  const a = document.getElementByTagName('a')
  a.href // Property: "http://m.taobao.com", resolve过的结果
  a.getAttribute('href') // Attribute："//m.taobao.com"，和HTML代码中一致
</script>
```

Ex4：HTML input value

```html
<input value="cute" />
<script>
  const input = document.getElementByTagName('input')

  // 如果property没有设置，结果是attribute
  input.value // cute
  input.getAttribute('value') // cute

  // 如果property已经设置，则attribute不变，property变化，元素实际效果是property优先
  input.value = 'hello'
  input.value // hello
  input.getAttribute('value') // cute
</script>
```

### 如何设计组件状态

| Name      | Markup set(标签设置) | JS set(JS 设置) | JS Change(JS 改变) | User Input Change(用户输入改变) |
| --------- | -------------------- | --------------- | ------------------ | ------------------------------- |
| property  | X                    | O               | O                  | ?                               |
| attribute | O                    | O               | O                  | ?                               |
| state     | X                    | X               | X                  | O                               |
| config    | X                    | O               | X                  | X                               |

### Lifecycle

Created -> Mount -> Update -> Unmount -> Destroy

### Children

Content 型 Children 与 Template 型 Children

---

## 组件的基本知识 | 为组件添加 JSX 语法

---

## 组件的基本知识 | JSX 的基本使用方法

---

## 轮播组件
