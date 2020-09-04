# Week10 学习笔记

- [Week10 学习笔记](#week10-%e5%ad%a6%e4%b9%a0%e7%ac%94%e8%ae%b0)
  - [使用 LL 算法构建 AST | 四则运算](#%e4%bd%bf%e7%94%a8-ll-%e7%ae%97%e6%b3%95%e6%9e%84%e5%bb%ba-ast--%e5%9b%9b%e5%88%99%e8%bf%90%e7%ae%97)
    - [四则运算](#%e5%9b%9b%e5%88%99%e8%bf%90%e7%ae%97)
  - [使用 LL 算法构建 AST | 正则表达式](#%e4%bd%bf%e7%94%a8-ll-%e7%ae%97%e6%b3%95%e6%9e%84%e5%bb%ba-ast--%e6%ad%a3%e5%88%99%e8%a1%a8%e8%be%be%e5%bc%8f)
  - [使用 LL 算法构建 AST | LL 词法分析](#%e4%bd%bf%e7%94%a8-ll-%e7%ae%97%e6%b3%95%e6%9e%84%e5%bb%ba-ast--ll-%e8%af%8d%e6%b3%95%e5%88%86%e6%9e%90)
  - [使用 LL 算法构建 AST | LL 语法分析](#%e4%bd%bf%e7%94%a8-ll-%e7%ae%97%e6%b3%95%e6%9e%84%e5%bb%ba-ast--ll-%e8%af%ad%e6%b3%95%e5%88%86%e6%9e%90)
  - [字符串分析算法 | 总论](#%e5%ad%97%e7%ac%a6%e4%b8%b2%e5%88%86%e6%9e%90%e7%ae%97%e6%b3%95--%e6%80%bb%e8%ae%ba)
  - [字符串分析算法 | 字典树](#%e5%ad%97%e7%ac%a6%e4%b8%b2%e5%88%86%e6%9e%90%e7%ae%97%e6%b3%95--%e5%ad%97%e5%85%b8%e6%a0%91)
  - [字符串分析算法 | KMP 字符串模式匹配算法](#%e5%ad%97%e7%ac%a6%e4%b8%b2%e5%88%86%e6%9e%90%e7%ae%97%e6%b3%95--kmp-%e5%ad%97%e7%ac%a6%e4%b8%b2%e6%a8%a1%e5%bc%8f%e5%8c%b9%e9%85%8d%e7%ae%97%e6%b3%95)
  - [字符串分析算法 | Wildcard](#%e5%ad%97%e7%ac%a6%e4%b8%b2%e5%88%86%e6%9e%90%e7%ae%97%e6%b3%95--wildcard)

---

## 使用 LL 算法构建 AST | 四则运算

语法分析：构建 AST 抽象语法树的过程

语法分析算法： LL 算法，LR 算法

LL：从左到右扫描，从左到右规约

### 四则运算

- TokenNumber: 0-9 的组合
- Operator：+，-，\*，/
- Whitespace: \<SP>
- LineTerminator: \<LF> \<CR>

产生式定义语法

LL 语法分析

---

## 使用 LL 算法构建 AST | 正则表达式

```javascript
const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|([\*])|(\/)|(\+)|(\-)/g

const dict = ['Number', 'Whitespace', 'LineTerminator', '*', '/', '+', '-']

function tokenize(source) {
  let result = null

  whlle(true) {
    result = regexp.exec(source)

    if (!result) break

    for (let i = 1; i <= dict.length; i++) {
      if (result[i])
        console.log(dict[i-1])
    }
    console.log(result)
  }
}

tokenize('1024 + 10 * 25')
```

---

## 使用 LL 算法构建 AST | LL 词法分析

```javascript
const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|([\*])|(\/)|(\+)|(\-)/g

const dict = ['Number', 'Whitespace', 'LineTerminator', '*', '/', '+', '-']

function* tokenize(source) {
  let result = null
  let lastIndex = 0

  whlle(true) {
    lastIndex = regexp.lastIndex
    result = regexp.exec(source)

    if (!result) break
    if (regexp.lastIndex - lastIndex > result[0].length)
      break

    let token = {
      type: null,
      value: null
    }

    for (let i = 1; i <= dict.length; i++) {
      if (result[i])
        token.type = dict[i - 1]
    }
    token.value = result[0]
    yield token
  }

  yield {
    type: 'EOF'
  }
}

for (let token of tokenize('1024 + 10 * 25')) {
  console.log(token)
}
```

---

## 使用 LL 算法构建 AST | LL 语法分析

```javascript
const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|([\*])|(\/)|(\+)|(\-)/g

const dict = ['Number', 'Whitespace', 'LineTerminator', '*', '/', '+', '-']

function* tokenize(source) {
  let result = null
  let lastIndex = 0

  whlle(true) {
    lastIndex = regexp.lastIndex
    result = regexp.exec(source)

    if (!result) break
    if (regexp.lastIndex - lastIndex > result[0].length)
      break

    let token = {
      type: null,
      value: null
    }

    for (let i = 1; i <= dict.length; i++) {
      if (result[i])
        token.type = dict[i - 1]
    }
    token.value = result[0]
    yield token
  }

  yield {
    type: 'EOF'
  }
}

let source = []

for (let token of tokenize('1 + 2 * 5 + 3')) {
  if (token.type !== 'Whitespace' ** token.type !== 'LineTerminator') {
    source.push(token)
  }
}

function Expression(tokens) {
  if (source[0].type === 'AdditiveExpression)' && source[1] && source[1].type === 'EOF') {
    let node = {
      type: 'Expression',
      children: [source.shift(), source.shift()]
    }
    source.unshift(node)
    return node
  }
  AdditiveExpression(source)
  return Expression(source)
}

function AdditiveExpression(source) {
  if (source[0].type === 'MultiplicativeExpression') {
    // new non-terminal symbol
    let node = {
      type: 'AdditiveExpression',
      children: [source[0]]
    }
    source[0] = node
    return AdditiveExpression(source)
  }

  if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '+') {
    let node = {
      type: 'AdditiveExpression',
      operator: '+',
      chidlren: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  }

  if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '-') {
    let node = {
      type: 'AdditiveExpression',
      operator: '-',
      chidlren: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  }

  if (source[0].type === 'AdditiveExpression') {
    return source[0]
  }

  MultiplicativeExpression(source)
  return AdditiveExpression(source)
}

function MultiplicativeExpression(source) {
  if (source[0].type === 'Number') {
    // new non-terminal symbol
    let node = {
      type: 'MultiplicativeExpression',
      children: [source[0]]
    }
    source[0] = node
    return MultiplicativeExpression(source)
  }

  if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '*') {
    let node = {
      type: 'MultiplicativeExpression',
      operator: '*',
      chidlren: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())
    source.unshift(node)
    return MultiplicativeExpression(source)
  }

  if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '/') {
    let node = {
      type: 'MultiplicativeExpression',
      operator: '/',
      chidlren: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())
    source.unshift(node)
    return MultiplicativeExpression(source)
  }

  if (source[0].type === 'MultiplicativeExpression') {
    return source[0]
  }

  return MultiplicativeExpression(source)
}

Expression(source)
```

---

## 字符串分析算法 | 总论

- 字典树
  - 大量高重复字符串的存储与分析
- KMP
  - 在长字符串里找模式
- Wildcard
  - 带通配符的字符串模式
- 正则
  - 字符串通用模式匹配
- 状态机
  - 通用的字符串分析
- LL / LR
  - 字符串多层级结构分析

---

## 字符串分析算法 | 字典树

```javascript
class Trie {
  let $ = Symbol('$')
  constructor() {
    this.root = Object.create(null)
  }

  insert(word) {
    let node = this.root
    for (let c of word) {
      if (!node[c]) {
        node[c] = Object.create(null)
      }
      node = node[c]
    }
    if (!($ in node)) {
      node[$] = 0
    }
    node[$]++
  }

  most() {
    let max = 0
    let maxWord = null
    let visit = (node, word) => {
      if (node.[$] && node.[$] > max) {
        max = node.[$]
        maxWord = word
      }
      for (let p in node) {
        visit(node[p], word + p)
      }
    }
    visit(this.root, '')
    console.log(maxWord, max)
  }
}

function randomWord(length) {
  let s = ""
  for (let i = 0; i < length; i++) {
    s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0))
  }
  return s
}

let trie = new Trie()

for (let i = 0; i < 100000; i++) {
  trie.insert(randomWord(4))
}

console.log(trie.most())
```

---

## 字符串分析算法 | KMP 字符串模式匹配算法

问题：查一个字符串中是否包含另一个字符串

1. Brute Force

从长串的每个点开始去匹配 pattern 串，O(m \* n)

2. KMP

abcdabce
abcdabcdabc

重点在于找最长自重复部分：把 pattern 串的第一位依次去掉

KMP 匹配回退表格

**步骤：**

1. 根据 pattern 算出跳转表格
2. 根据跳转表格，拿 source 和 pattern 对比

```javascript
function kmp(source, pattern) {
  // compute table
  let table = new Array(pattern.length).fill(0)

  // 检查自重复
  {
    let i = 1,
      j = 0
    while (i < pattern.length) {
      if (pattern[i] === pattern[j]) {
        ++i
        ++j
        table[i] = j
      } else {
        if (j > 0) j = table[j]
        else ++i
      }
    }
  }

  // compare
  {
    let i = 0,
      j = 0
    while (i < source.length) {
      if (pattern[j] === source[i]) {
        i++
        j++
      } else {
        if (j > 0) j = table[j]
        else ++i
      }
      if (j === pattern.length) {
        return true
      }
    }
    return false
  }
}
```

---

## 字符串分析算法 | Wildcard

wildcar: ab\*c?d\*abc\*a?d

- 只有\*
- 只有？

除了最后一个\*，所有前面的\*都尽量少匹配，最后一个\*尽量多匹配

特别的两个段：ab 和 a?d，开头和结尾的段

其他中间的都是(\*+字符)作为一组，以 kmp 来匹配

```javascript
function find(source, pattern) {
  // 1. count the number of *
  let starCount = 0
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '*') {
      starCount++
    }
  }
  // special case: star count = 0
  if (starCount === 0) {
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] !== source[i] && pattern[i] !== '?') {
        return false
      }
    }
    return true
  }

  // 2. deal with the part before the first *
  let i = 0,
    lastIndex = 0
  for (i = 0; pattern[i] !== '*'; i++) {
    if (pattern[i] !== source[i] && pattern[i] !== '?') {
      return false
    }
  }
  lastIndex = i

  // 3. center parts before the last *
  //    each part is in format of (*abc)
  for (let p = 0; p < starCount - 1; p++) {
    i++
    let subPattern = ''
    while (pattern[i] !== '*') {
      subPattern += pattern[i]
      i++
    }

    // use RegExp
    let reg = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'), 'g')
    reg.lastIndex = lastIndex

    if (!reg.exec(source)) return false

    lastIndex = reg.lastIndex
  }

  // 4. deal with the last part after the last *
  for (
    let j = 0;
    j <= source.length - lastIndex && pattern[pattern.length - 1] !== '*';
    j++
  ) {
    if (
      pattern[pattern.length - j] !== source[source.length - j] &&
      pattern[pattern.length - j] !== '?'
    ) {
      return false
    }
  }

  return true
}
```
