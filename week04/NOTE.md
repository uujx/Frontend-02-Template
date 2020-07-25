# Week4 学习笔记

- [Week4 学习笔记](#week4-%e5%ad%a6%e4%b9%a0%e7%ac%94%e8%ae%b0)
  - [有限状态机](#%e6%9c%89%e9%99%90%e7%8a%b6%e6%80%81%e6%9c%ba)
    - [JS 中的 Mealy 状态机](#js-%e4%b8%ad%e7%9a%84-mealy-%e7%8a%b6%e6%80%81%e6%9c%ba)
  - [不使用状态机处理字符串（一）](#%e4%b8%8d%e4%bd%bf%e7%94%a8%e7%8a%b6%e6%80%81%e6%9c%ba%e5%a4%84%e7%90%86%e5%ad%97%e7%ac%a6%e4%b8%b2%e4%b8%80)
    - [在一个字符串中，找到字符'a'](#%e5%9c%a8%e4%b8%80%e4%b8%aa%e5%ad%97%e7%ac%a6%e4%b8%b2%e4%b8%ad%e6%89%be%e5%88%b0%e5%ad%97%e7%ac%a6a)
  - [不使用状态机处理字符串（二）](#%e4%b8%8d%e4%bd%bf%e7%94%a8%e7%8a%b6%e6%80%81%e6%9c%ba%e5%a4%84%e7%90%86%e5%ad%97%e7%ac%a6%e4%b8%b2%e4%ba%8c)
    - [在一个字符串中，找到字符'ab'](#%e5%9c%a8%e4%b8%80%e4%b8%aa%e5%ad%97%e7%ac%a6%e4%b8%b2%e4%b8%ad%e6%89%be%e5%88%b0%e5%ad%97%e7%ac%a6ab)
  - [不使用状态机处理字符串（三）](#%e4%b8%8d%e4%bd%bf%e7%94%a8%e7%8a%b6%e6%80%81%e6%9c%ba%e5%a4%84%e7%90%86%e5%ad%97%e7%ac%a6%e4%b8%b2%e4%b8%89)
    - [在一个字符串中，找到字符'abcdef'](#%e5%9c%a8%e4%b8%80%e4%b8%aa%e5%ad%97%e7%ac%a6%e4%b8%b2%e4%b8%ad%e6%89%be%e5%88%b0%e5%ad%97%e7%ac%a6abcdef)
  - [使用状态机处理字符串（一）](#%e4%bd%bf%e7%94%a8%e7%8a%b6%e6%80%81%e6%9c%ba%e5%a4%84%e7%90%86%e5%ad%97%e7%ac%a6%e4%b8%b2%e4%b8%80)
    - [使用状态机，在一个字符串中查找‘abcdef’](#%e4%bd%bf%e7%94%a8%e7%8a%b6%e6%80%81%e6%9c%ba%e5%9c%a8%e4%b8%80%e4%b8%aa%e5%ad%97%e7%ac%a6%e4%b8%b2%e4%b8%ad%e6%9f%a5%e6%89%beabcdef)
  - [使用状态机处理字符串（二）](#%e4%bd%bf%e7%94%a8%e7%8a%b6%e6%80%81%e6%9c%ba%e5%a4%84%e7%90%86%e5%ad%97%e7%ac%a6%e4%b8%b2%e4%ba%8c)
    - [使用状态机，在字符串中查找‘abcabx’](#%e4%bd%bf%e7%94%a8%e7%8a%b6%e6%80%81%e6%9c%ba%e5%9c%a8%e5%ad%97%e7%ac%a6%e4%b8%b2%e4%b8%ad%e6%9f%a5%e6%89%beabcabx)
    - [使用状态机，在字符串中查找'abababx'](#%e4%bd%bf%e7%94%a8%e7%8a%b6%e6%80%81%e6%9c%ba%e5%9c%a8%e5%ad%97%e7%ac%a6%e4%b8%b2%e4%b8%ad%e6%9f%a5%e6%89%beabababx)
    - [如何使用状态机处理完全位置的 pattern](#%e5%a6%82%e4%bd%95%e4%bd%bf%e7%94%a8%e7%8a%b6%e6%80%81%e6%9c%ba%e5%a4%84%e7%90%86%e5%ae%8c%e5%85%a8%e4%bd%8d%e7%bd%ae%e7%9a%84-pattern)
      - [KMP 算法](#kmp-%e7%ae%97%e6%b3%95)
  - [HTTP 请求 | HTTP 协议解析](#http-%e8%af%b7%e6%b1%82--http-%e5%8d%8f%e8%ae%ae%e8%a7%a3%e6%9e%90)
    - [ISO-OSI 七层网络模型](#iso-osi-%e4%b8%83%e5%b1%82%e7%bd%91%e7%bb%9c%e6%a8%a1%e5%9e%8b)
    - [TCP / IP](#tcp--ip)
    - [HTTP](#http)
  - [HTTP 请求 | 服务端环境准备](#http-%e8%af%b7%e6%b1%82--%e6%9c%8d%e5%8a%a1%e7%ab%af%e7%8e%af%e5%a2%83%e5%87%86%e5%a4%87)
    - [服务端代码](#%e6%9c%8d%e5%8a%a1%e7%ab%af%e4%bb%a3%e7%a0%81)
    - [HTTP 协议](#http-%e5%8d%8f%e8%ae%ae)
  - [HTTP 请求 | 实现一个 HTTP 请求](#http-%e8%af%b7%e6%b1%82--%e5%ae%9e%e7%8e%b0%e4%b8%80%e4%b8%aa-http-%e8%af%b7%e6%b1%82)
    - [HTTP 请求构建](#http-%e8%af%b7%e6%b1%82%e6%9e%84%e5%bb%ba)
    - [HTTP 请求总结](#http-%e8%af%b7%e6%b1%82%e6%80%bb%e7%bb%93)
  - [HTTP 请求 | send 函数的编写，response 格式](#http-%e8%af%b7%e6%b1%82--send-%e5%87%bd%e6%95%b0%e7%9a%84%e7%bc%96%e5%86%99response-%e6%a0%bc%e5%bc%8f)
    - [ResponseParser](#responseparser)
    - [send 函数总结](#send-%e5%87%bd%e6%95%b0%e6%80%bb%e7%bb%93)
    - [Response 格式](#response-%e6%a0%bc%e5%bc%8f)
  - [HTTP 请求 | 发送请求](#http-%e8%af%b7%e6%b1%82--%e5%8f%91%e9%80%81%e8%af%b7%e6%b1%82)
    - [发送请求总结](#%e5%8f%91%e9%80%81%e8%af%b7%e6%b1%82%e6%80%bb%e7%bb%93)
  - [HTTP 请求 | Response 解析](#http-%e8%af%b7%e6%b1%82--response-%e8%a7%a3%e6%9e%90)
    - [ResponseParser 总结](#responseparser-%e6%80%bb%e7%bb%93)
    - [ResponseParser 主体结构](#responseparser-%e4%b8%bb%e4%bd%93%e7%bb%93%e6%9e%84)
  - [HTTP 请求 | Response Body 解析](#http-%e8%af%b7%e6%b1%82--response-body-%e8%a7%a3%e6%9e%90)
  - [HTML 解析 | parse 模块的文件拆分](#html-%e8%a7%a3%e6%9e%90--parse-%e6%a8%a1%e5%9d%97%e7%9a%84%e6%96%87%e4%bb%b6%e6%8b%86%e5%88%86)
    - [拆分文件](#%e6%8b%86%e5%88%86%e6%96%87%e4%bb%b6)
  - [HTML 解析 | 用 FSM 实现 HTML 解析](#html-%e8%a7%a3%e6%9e%90--%e7%94%a8-fsm-%e5%ae%9e%e7%8e%b0-html-%e8%a7%a3%e6%9e%90)
  - [HTML 解析 | 解析标签](#html-%e8%a7%a3%e6%9e%90--%e8%a7%a3%e6%9e%90%e6%a0%87%e7%ad%be)
  - [HTML 解析 | 创建元素](#html-%e8%a7%a3%e6%9e%90--%e5%88%9b%e5%bb%ba%e5%85%83%e7%b4%a0)
  - [HTML 解析 | 处理属性](#html-%e8%a7%a3%e6%9e%90--%e5%a4%84%e7%90%86%e5%b1%9e%e6%80%a7)
  - [HTML 解析 | 用 Token 构建 DOM 树](#html-%e8%a7%a3%e6%9e%90--%e7%94%a8-token-%e6%9e%84%e5%bb%ba-dom-%e6%a0%91)
  - [HTML 解析 | 将文本节点加到 DOM 树](#html-%e8%a7%a3%e6%9e%90--%e5%b0%86%e6%96%87%e6%9c%ac%e8%8a%82%e7%82%b9%e5%8a%a0%e5%88%b0-dom-%e6%a0%91)

## 有限状态机

- 每一个状态都是一个机器
  - 每一个机器里，可以做计算、存储、输入...
  - 所有的这些机器接受的输入是一致的
  - 状态机的每一个机器本身没有状态，如果用函数表示，应该是纯函数（无副作用）
- 每一个机器知道下一个状态
  - 每个机器都有确定的下一个状态（Moore）
  - 每一个机器根据输入决定下一个状态（Mealy），更实用，更强大的表达能力

### JS 中的 Mealy 状态机

```javascript
// 每一个函数是一个状态
function state(input) {
  // 函数参数是输入

  // 在函数中可以自由编写代码，处理每一个状态的逻辑

  return next // 返回值作为下一个状态，即返回值是一个状态函数，Mealy状态机的下一个状态和input相关
}
```

```javascript
// 调用过程
while (input) {
  // 获取输入
  state = state(input) // 把状态机的返回值作为下一个状态
}
```

---

## 不使用状态机处理字符串（一）

### 在一个字符串中，找到字符'a'

```javascript
/**
 * This function takes in a string and try to find character 'a' in it.
 * @param {String} string The string to be evaluated
 * @return {Boolean} True if there is 'a' in this string
 */
function findA(string) {
  for (let ch of string) {
    if (ch === 'a') return true
  }
  return false
}
```

---

## 不使用状态机处理字符串（二）

### 在一个字符串中，找到字符'ab'

```javascript
/**
 * This function takes in a string and try to find 'ab' in it.
 * @param {String} string The string to be evaluated
 * @return {Boolean} True if there is 'ab' in this string
 */
function findAB(string) {
  for (let i = 0; i < string.length - 1; i++) {
    if (string[i] === 'a' && string[i + 1] === 'b') {
      return true
    }
  }
  return false
}

function findAB1(string) {
  let foundA = false
  for (let ch of string) {
    if (ch === 'a') {
      foundA = true
    } else if (foundA && ch === 'b') {
      return true
    } else {
      foundA = false
    }
  }
  return false
}
```

---

## 不使用状态机处理字符串（三）

### 在一个字符串中，找到字符'abcdef'

```javascript
/**
 * This function takes in a string and try to find 'abcdef' in it.
 * @param {String} string The string to be evaluated
 * @return {Boolean} True if there is 'abcdef' in this string
 */
function findABCDEF(string) {
  let foundA = false,
    foundB = false,
    foundC = false,
    foundD = false,
    foundE = false

  for (let ch of string) {
    if (ch === 'a') {
      foundA = true
      foundB = false
      foundC = false
      foundD = false
      foundE = false
    } else if (foundA && !foundB && ch === 'b') {
      foundB = true
      foundC = false
      foundD = false
      foundE = false
    } else if (foundB && !foundC && ch === 'c') {
      foundC = true
      foundD = false
      foundE = false
    } else if (foundC && !foundD && ch === 'd') {
      foundD = true
      foundE = false
    } else if (foundD && !foundE && ch === 'e') {
      foundE = true
    } else if (foundE && ch === 'f') {
      return true
    } else {
      foundA = false
      foundB = false
      foundC = false
      foundD = false
      foundE = false
    }
  }

  return false
}
```

---

## 使用状态机处理字符串（一）

### 使用状态机，在一个字符串中查找‘abcdef’

```javascript
/**
 * A finite state machine method of checking whether 'abcdef' is in a given string.
 * @param {String} string A String to be evaluated
 * @return {Boolean} true if 'abcdef' is found
 */
function stateMachineFindABCDEF(string) {
  let state = start
  for (let ch of string) {
    state = state(ch)
  }

  return state === end
}

function start(c) {
  if (c === 'a') {
    return foundA
  } else {
    return start
  }
}

// If found 'abcdef', it would reach this end function and stuck in here, meaning the state would not change ever since
function end(c) {
  return end
}

// For each foundX function, if the given char is not the one expected, don't skip it and try to check from start
function foundA(c) {
  if (c === 'b') {
    return foundB
  } else {
    return start(c)
  }
}

function foundB(c) {
  if (c === 'c') {
    return foundC
  } else {
    return start(c)
  }
}

function foundC(c) {
  if (c === 'd') {
    return foundD
  } else {
    return start(c)
  }
}

function foundD(c) {
  if (c === 'e') {
    return foundE
  } else {
    return start(c)
  }
}

function foundE(c) {
  if (c === 'f') {
    return end
  } else {
    return start(c)
  }
}
```

---

## 使用状态机处理字符串（二）

### 使用状态机，在字符串中查找‘abcabx’

```javascript
function stateMachineFindABCABX(string) {
  let state = start
  for (let ch of string) {
    state = state(ch)
  }
  return state === end
}

function start(c) {
  if (c === 'a') {
    return foundA
  } else {
    return start
  }
}

function end(c) {
  return end
}

function foundA(c) {
  if (c === 'b') {
    return foundB
  } else {
    return start(c)
  }
}

function foundB(c) {
  if (c === 'c') {
    return foundC
  } else {
    return start(c)
  }
}

function foundC(c) {
  if (c === 'a') {
    return foundA2
  } else {
    return start(c)
  }
}

function foundA2(c) {
  if (c === 'b') {
    return foundB2
  } else {
    return start(c)
  }
}

// If the last one is c, then we found the match; if it is not, we need to consider the cases when it is 'c' or 'a', so we change the state to foundB and let foundB to handle the case of 'c'; if it is still not c, foundB will handle it to start to check if it is 'a'.
function foundB2(c) {
  if (c === 'x') {
    return end
  } else {
    return foundB(c)
  }
}
```

### 使用状态机，在字符串中查找'abababx'

```javascript
function stateMachineFindABABABX(string) {
  let state = start
  for (let ch of string) {
    state = state(ch)
  }
  return state === end
}

function start(c) {
  if (c === 'a') {
    return foundA
  } else {
    return start
  }
}

function end(c) {
  return end
}

function foundA(c) {
  if (c === 'b') {
    return foundB
  } else {
    return start(a)
  }
}

function foundB(c) {
  if (c === 'a') {
    return foundA1
  } else {
    return start
  }
}

function foundA1(c) {
  if (c === 'b') {
    return foundB1
  } else {
    return start(c)
  }
}

function foundB1(c) {
  if (c === 'a') {
    return foundA2
  } else {
    return start
  }
}

function foundA2(c) {
  if (c === 'b') {
    return foundB2
  } else {
    return start(a)
  }
}

// If it is not 'x', consider it is 'a' or 'b'
// If it is 'a', we should return to state foundB1
// If it is 'b' or anything else, foundB1 will change the state to start
function foundB2(c) {
  if (c === 'x') {
    return end
  } else {
    return foundB1(c)
  }
}
```

### 如何使用状态机处理完全位置的 pattern

#### KMP 算法

---

## HTTP 请求 | HTTP 协议解析

### ISO-OSI 七层网络模型

### TCP / IP

TCP：

- 流
- 端口
- require('net')

IP:

- 包
- IP 地址
- libnet: C++负责构造 IP 包并发送
- libpcap：C++负责从网卡抓取 IP 包

### HTTP

Request/Response 模型

---

## HTTP 请求 | 服务端环境准备

### 服务端代码

```javascript
// server.js
const http = require('http')

http
  .createServer((request, response) => {
    let body = []
    request
      .on('error', (err) => {
        console.error(err)
      })
      .on('data', (chunk) => {
        body.push(chunk.toString())
      })
      .on('end', () => {
        body = Buffer.concat(body).toString()
        console.log('body:', body)
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(' Hello World\n')
      })
  })
  .listen(8088)

console.log('server started')
```

### HTTP 协议

文本型协议：都是字符

1. 请求行
   - Post / HTTP/1.1
2. Headers
   - Host: 127.0.0.1
   - Content-Type: application/x-www-form-urlencoded
3. body
   - 换行：/r/n

---

## HTTP 请求 | 实现一个 HTTP 请求

### HTTP 请求构建

```javascript
class Request {
  constructor(options) {
    this.method = options.method || 'Get'
    this.port = options.port || 80
    this.path = options.path || '/'
    this.host = options.host
    this.body = options.body || {}
    this.headers = options.headers || {}

    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (
      this.headers['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      this.bodyText = Object.keys(this.body)
        .map((key) => {
          return `${key}=${encodeURIComponent(this.body[key])}`
        })
        .join('&')
    }

    this.headers['Content-Length'] = this.bodyText.length
  }

  send() {
    return new Promise((resolve, reject) => {
      // TODO:
    })
  }
}

void (async function () {
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8088',
    path: '/',
    headers: {
      ['X-Foo2']: 'customed'
    },
    body: {
      name: 'J'
    }
  })

  let response = await request.send()

  console.log(response)
})()
```

### HTTP 请求总结

1. 设计一个 HTTP 请求的类
2. Content-Type 是一个必要的字段，要有默认值
3. body 是 KV 格式
4. 不同的 Content-Type 影响 body 的格式
5. Content-Length 是必须的

---

## HTTP 请求 | send 函数的编写，response 格式

> 会**逐步**得到 response，直到把 response 构造好之后，再调用 resolve

### ResponseParser

逐步接受 response 文本并进行分析来构造 response 对象

```javascript
class ResponseParser {
  constructor() {}

  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string[i])
    }
  }

  receiveChar(ch) {}
}
```

### send 函数总结

1. 在 Request 的构造器中收集必要信息
2. 设计一个 send 函数，把请求真实发送到服务器
3. send 函数应该是**异步**的，所以返回 Promise

```javascript
send(connection) {
    return new Promise((resolve, reject) => {
      // Response是逐步到达的，所以需要Response Parser
      const parser = new ResponseParser()

      if (!connection) {
        connection = net.createConnection(
          {
            host: this.host,
            port: this.port
          },
          () => {
            connection.write(this.toString())
          }
        )
      } else {
        connection.write(this.toString())
      }

      connection.on('data', (data) => {
        console.log(data.toString())
        parser.receive(data.toString())
        if (parser.isFinished) {
          resolve(parser.response)
          connection.end()
        }
      })

      connection.on('error', (err) => {
        reject(err)
        connection.end()
      })
    })
  }
```

### Response 格式

1. status line
   - HTTP/1.1 200 OK
2. headers
   - 最后空行
3. body
   - **chunked body**
     - 16 进制数字
     - 内容
     - 最后 16 进制的 0 表示结束

---

## HTTP 请求 | 发送请求

### 发送请求总结

1. 设计支持已有的 connection 或者自己新建 connection
2. 收到数据传给 parser
3. 根据 parser 的状态 resolve Promise

```javascript
toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
  .map((key) => `${key}: ${this.headers[key]}`)
  .join('\r\n')}\r
\r
${this.bodyText}`
}
```

---

## HTTP 请求 | Response 解析

### ResponseParser 总结

1. Response 必须分段构造，所以要用一个 ResponseParser 来装配
2. ResponseParser 分段处理 ResponseText，用状态机来分析文本的结构

### ResponseParser 主体结构

```javascript
class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6
    this.WAITING_BODY = 7

    this.current = this.WAITING_STATUS_LINE
    this.statusLine = ''
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
    this.bodyParser = null
  }

  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string[i])
    }
  }

  receiveChar(ch) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (ch === '\r') {
        this.current = this.WAITING_STATUS_LINE_END
      } else {
        this.statusLine += ch
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (ch === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (ch === ':') {
        this.current = this.WAITING_HEADER_SPACE
      } else if (ch === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
      } else {
        this.headerName += ch
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (ch === ' ') {
        this.current = this.WAITING_HEADER_VALUE
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (ch === '\r') {
        this.current = this.WAITING_HEADER_LINE_END
        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += ch
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (ch === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (ch === '\n') {
        this.current = this.WAITING_BODY
      }
    } else if (this.current === this.WAITING_BODY) {
      // TODO:
      console.log(ch)
    }
  }
}
```

---

## HTTP 请求 | Response Body 解析

- body 解析和 header 的 Transfer-Encoding 相关，根据 header 选择 body parser，node 默认是 chunked  
- TrunkedBodyParser 中，首先是一个标志 chunk 长度的 16 进制字符，之后是 chunk 内容；最后是一个 chunk 是一个长度为 0 的 chunk；  
- 因为每一个 chunk 中可以包含任意字符，所以没办法通过当前字符决定状态转换，所以只能通过 length 判断是否读取够了当前 chunk 的字符来决定状态转换；  
- 严格意义上来讲，这已经不是 Merly 状态机了

```javascript
class ChunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0
    this.WAITING_LENGTH_END = 1
    this.READING_CHUNK = 2
    this.WAITING_NEW_LINE = 3
    this.WAITING_NEW_LINE_END = 4
    this.END = 5

    this.current = this.WAITING_LENGTH
    this.length = 0
    this.content = []
    this.isFinished = false
  }

  receiveChar(ch) {
    if (this.current === this.WAITING_LENGTH) {
      if (ch === '\r') {
        if (this.length === 0) {
          this.isFinished = true
          this.current = this.END
        } else {
          this.current = this.WAITING_LENGTH_END
        }
      } else {
        this.length *= 16
        this.length += parseInt(ch, 16)
      }
    } else if (this.current === this.WAITING_LENGTH_END) {
      if (ch === '\n') {
        this.current = this.READING_CHUNK
      }
    } else if (this.current === this.READING_CHUNK) {
      this.content.push(ch)
      this.length--
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (ch === '\r') {
        this.current = this.WAITING_NEW_LINE_END
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (ch === '\n') {
        this.current = this.WAITING_LENGTH
      }
    } else if (this.current === this.END) {
      return
    }
  }
}
```

---

## HTML 解析 | parse 模块的文件拆分

HTML -> DOM -> DOM with CSS -> DOM with Position -> Bitmap

### 拆分文件

- 把 parser 单独拆分
- parser 接受 HTML 文本作为参数，返回 DOM 树

---

## HTML 解析 | 用 FSM 实现 HTML 解析

- 使用 FSM 实现对 HTML 的解析
- HTML 标准已经规定了 HTML 的状态
- 只挑选一部分状态实现最简化 browser

---

## HTML 解析 | 解析标签

- 主要标签：开始标签，结束标签和自封闭标签
- 暂时忽略标签属性

---

## HTML 解析 | 创建元素

- 在状态机中，除了状态迁移，还要加入业务逻辑
- 在标签结束提交标签 token

---

## HTML 解析 | 处理属性

- 属性分为单引号、双引号、无引号三种，因此需要较多状态处理
- 处理属性的方式跟标签类似
- 属性结束时，把属性加到标签 Token 上

---

## HTML 解析 | 用 Token 构建 DOM 树

- HTML 语法分析
- 从标签构建 DOM 树使用栈实现
- 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
- 自封闭标签不入栈
- 任何元素的父元素是它入栈前的栈顶元素

---

## HTML 解析 | 将文本节点加到 DOM 树

- 文本节点与自封闭标签处理类似
- 多个文本节点需要合并

---
