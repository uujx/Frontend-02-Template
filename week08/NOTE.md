# Week8 学习笔记

- [Week8 学习笔记](#week8-%e5%ad%a6%e4%b9%a0%e7%ac%94%e8%ae%b0)
  - [重学 HTML | HTML 的定义：XML 与 SGML](#%e9%87%8d%e5%ad%a6-html--html-%e7%9a%84%e5%ae%9a%e4%b9%89xml-%e4%b8%8e-sgml)
    - [DTD 与 XML namespace](#dtd-%e4%b8%8e-xml-namespace)
  - [重学 HTML | HTML 标签语义](#%e9%87%8d%e5%ad%a6-html--html-%e6%a0%87%e7%ad%be%e8%af%ad%e4%b9%89)
    - [\<aside\>](#aside)
    - [\<main>](#main)
    - [\<article>](#article)
    - [\<hgroup> \<h1> \<h2>](#hgroup-h1-h2)
    - [\<p>](#p)
    - [\<abbr> 缩写](#abbr-%e7%bc%a9%e5%86%99)
    - [\<strong> \<em>](#strong-em)
    - [\<figure> \<img> \<figcaption>](#figure-img-figcaption)
    - [\<ol> \<ul> \<li>](#ol-ul-li)
    - [\<nav>](#nav)
    - [\<dfn> 定义](#dfn-%e5%ae%9a%e4%b9%89)
    - [\<pre>](#pre)
    - [\<samp> 例子](#samp-%e4%be%8b%e5%ad%90)
    - [\<code>](#code)
    - [\<footer>](#footer)
  - [重学 HTML | HTML 语法](#%e9%87%8d%e5%ad%a6-html--html-%e8%af%ad%e6%b3%95)
  - [浏览器 API | DOM API](#%e6%b5%8f%e8%a7%88%e5%99%a8-api--dom-api)
    - [DOM](#dom)
    - [Node](#node)
    - [导航类操作](#%e5%af%bc%e8%88%aa%e7%b1%bb%e6%93%8d%e4%bd%9c)
    - [修改操作](#%e4%bf%ae%e6%94%b9%e6%93%8d%e4%bd%9c)
    - [高级操作](#%e9%ab%98%e7%ba%a7%e6%93%8d%e4%bd%9c)
  - [浏览器 API | 事件 API](#%e6%b5%8f%e8%a7%88%e5%99%a8-api--%e4%ba%8b%e4%bb%b6-api)
  - [浏览器 API | Range API](#%e6%b5%8f%e8%a7%88%e5%99%a8-api--range-api)
    - [一个问题](#%e4%b8%80%e4%b8%aa%e9%97%ae%e9%a2%98)
    - [Range API](#range-api)

## 重学 HTML | HTML 的定义：XML 与 SGML

SGML: 60s, IBM, 庞大复杂

XML：SGML 子集，改良

HTML：XML 子集 - XHTML HTML4 - XHTML2 流产 - HTML5 重新定义和两门语言的关系

### DTD 与 XML namespace

实体定义：&...;

- \&nbsp;
- \&lambda;
- \&quot;
- \&amp; - &
- \&lt;
- \&gt;
- \&apos;

Namespace: XHTML, MathML, SVG

HTML5 提供 XHTML 和 HTML 两类写法，XHTML 严格闭合，所以就不严格区分

---

## 重学 HTML | HTML 标签语义

> HTML 是一个语义系统，不应该去关心表现是什么样子，而是关注语义表达的正确

### \<aside\>

The HTML \<aside> element represents a portion of a document whose content is only indirectly related to the document's main content. Asides are frequently presented as sidebars or call-out boxes.

### \<main>

### \<article>

### \<hgroup> \<h1> \<h2>

The HTML \<hgroup> element represents a multi-level heading for a section of a document. It groups a set of \<h1>–\<h6> elements.

### \<p>

没有合适的语义化标签来表达信息，那就加一个 class 作为补充

### \<abbr> 缩写

### \<strong> \<em>

- \<strong> 语义中的重要性
- \<em> 语句中的语气表示

### \<figure> \<img> \<figcaption>

### \<ol> \<ul> \<li>

ul 和 ol 的区别在语义上是：列表是否有顺序性

所以即使需要圆点的列表，如果存在顺序性也要用 ol，然后用 css 去改变 counter

> 不要为了表现，牺牲语义

### \<nav>

### \<dfn> 定义

### \<pre>

预先调整好格式的文本

> 打出来 HTML 标签，需要\&lt;转义小于号

### \<samp> 例子

### \<code>

### \<footer>

---

## 重学 HTML | HTML 语法

合法元素：

- Element
- Text
- Comment
- DocumentType: \<!Doctype html>
- ProcessingInstruction: \<?a 1?>
- CDATA: \<![CDATA[]]> 文本的另一种表达，不用担心转义问题

字符引用：

- \&#163;
- \&amp;
- \&lt;
- \&quot;

---

## 浏览器 API | DOM API

### DOM

1. traveral API 不推荐
2. 节点部分
3. 事件部分
4. Range API 精确操作 DOM 树

### Node

- Node
  - Element
    - HTMLElement
      - ...
    - SVGElement
      - ...
  - Document
  - CharacterData：字符数据
    - Text
      - CDATASection：CDATA 节点
    - Comment
    - ProcessingInstruction 处理信息 - 不应该出现 DOM 树
  - DocumentFragment：文档片段
  - DocumentType: 文档类型

### 导航类操作

Node：

- parentNode childNodes
- firstChild lastChild
- nextSibling previousSibling
  - 会找到文本节点

Element：

- parentElement children
- firstElementChild lastElementChild
- nextElementSibling previousElementSibling

### 修改操作

- appendChild
- insertBefore
- removeChild
- replaceChild

### 高级操作

- compareDocumentPosition: 用于比较两个节点中关系的函数
- **contains**: 检查一个节点是否包含另一个节点
- **isEqualNode**：检查两个节点是否完全相同，DOM 树结构是否相同
- isSameNode：检查两个节点是否是同一个节点，在 JS 中可以用'==='
- **cloneNode**: 复制一个节点，如果传入参数 true，则会连同子元素做**深拷贝**

---

## 浏览器 API | 事件 API

addEventListener 的第三个参数：

- useCapture
- options
  - capture
  - once: 事件只响应一次
  - passive: 单纯监听，onScroll 提升性能，preventDefault 需要设置 true；移动端浏览器默认设置 false，需要单独设置

先冒泡再捕获

---

## 浏览器 API | Range API

操作半个节点，批量操作节点

### 一个问题

把一个元素所有的子元素逆序

```html
<div id="a">
  <span>1</span>
  <p>2</p>
  <p>3</p>
  <div>4</div>
</div>
```

答案 1：不使用 DOM 的特性，转换为 array 来做

```js
let element = document.getElementById('a')

function reverseChildren(element) {
  let children = Array.from(element.childNodes)

  for (let child of children) {
    element.removeChild(child)
  }

  children.reverse()

  for (let child of children) {
    element.appendChild(child)
  }
}

reverseChildren(element)
```

答案 2：Node 节点操作 4 次

1. DOM collection 是一个 living collection：操作时候取出来的 childNode 会跟着变化
2. insert 的时候不需要先 remove

```js
let element = document.getElementById('a)

function reverseChildren(element) {
  let i = element.childNodes.length

  while (i-- > 0) {
    element.appendChild(element.childNodes[i])
  }
}

reverseChildren(element)
```

答案 3：Range API

### Range API

- HTML 文档流里面有起始点和有终止点的范围，可以多个范围，但每个范围都连续，起始点位于终止点之前
- Range 不需要管层级关系
- 对于 Element 偏移是 children，对于 Text Node 节点偏移是文字个数
- Range 不一定要包含完整节点，可以包含任意范围，不需要顾及节点之间的边界
