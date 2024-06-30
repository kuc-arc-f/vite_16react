// GET-send, Test

export default function Page() {
  return (
  <>
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <script
        src="https://unpkg.com/htmx.org@1.9.10"
        integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
        crossorigin="anonymous"
      ></script>
    </head>
    <body>
      <a href="/">[ Top ]</a>
      <hr />
      <h1>HTMX</h1>
      <button
        hx-get="https://jsonplaceholder.typicode.com/users/1"
        hx-target="#h2"
      >
        Click
      </button>
      <h3 id="h2">ここに表示</h3>
    </body>
  </html>
  </>
  )
}
/*
*/
