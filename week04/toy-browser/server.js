const http = require('http')

http
  .createServer((request, response) => {
    let body = []
    request
      .on('error', (err) => {
        console.error(err)
      })
      .on('data', (chunk) => {
        console.log('onData', chunk)
        body.push(chunk)
      })
      .on('end', () => {
        console.log('onEnd')
        body = Buffer.concat(body).toString()
        console.log('body:', body)
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(`<html lang="en">
  <head>
    <style>
      body {
        padding: 0;
      }
    </style>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
      <div class="container">
        <p>First Paragraph</p>
        <p>Second ParaGraph <span>In Span</span></p>
      </div>
    </body>
</html>
      `)
      })
  })
  .listen(8088)

console.log('server started')
