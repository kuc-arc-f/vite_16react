
export default function Page() {
  return (
  <html>
    <head>
        <title>welcome</title>
        <script src="https://unpkg.com/htmx.org@2.0.0"></script>
    </head>
    <body>
      <h1>Htmx1.tsx</h1>
      <hr />
      <button hx-get="https://jsonplaceholder.typicode.com/users/1"
      >Click</button>
      
    </body>
  </html>
  )
}
/*
  </html>
<div id="root"></div>
<script type="module" src="/static/about.js"></script>
*/
