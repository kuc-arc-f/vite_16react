//let pegeItems: any[] = [];
//
export default function Page(pegeItems) {
//console.log(pegeItems);
  //
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
      <h1>HtmxTodo.tsx</h1>
      <hr />
      <form
      hx-post="/api/turso_todo/create"
      hx-trigger="submit"
      hx-target="#h2"
      hx-on="htmx:afterRequest: location.reload()"
      >
        <label>title:</label>
        <input type="text" name="title" /><br />
        <label>Content:</label>
        <input type="text" name="content" /><br />
        <button type="submit">Add</button>
      </form>
      <hr />
      <h3 id="h2">ここに表示</h3>
      <hr />
      {/* List */}
      {pegeItems.map((item: any ,index: number) => {
      return (
      <div key={index}>
          <h3 className="text-3xl font-bold">{item.title}</h3>
          <span>ID: {item.id}, {item.createdAt}</span>
          <a href={`/tursotodoshow?id=${item.id}`}>
          </a>
          <hr />
      </div>
      )
      })}      
    </body>
  </html>
  </>
  )
}
/*
<button className="btn-outline-purple ms-2">Show</button>
*/
