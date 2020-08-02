const net = require('net')
const images = require('images')
const parser = require('./parser')
const render = require('./render.js')

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

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers)
  .map((key) => `${key}: ${this.headers[key]}`)
  .join('\r\n')}\r
\r
${this.bodyText}`
  }
}

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

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished
  }

  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
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
        // header结束 - 创建bodyParser
        this.current = this.WAITING_HEADER_BLOCK_END
        // Node默认为chunked，此处为了简化只考虑这一种情况
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new ChunkedBodyParser()
        }
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
      this.bodyParser.receiveChar(ch)
    }
  }
}

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

  // 实际中是接收body过程中逐段异步parse的
  let dom = parser.parseHTML(response.body)

  let viewport = images(800, 600)

  render(viewport, dom)

  viewport.save('viewport.jpg')
})()
