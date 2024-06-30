import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { renderToString } from 'react-dom/server';
import 'dotenv/config'
//
import testRouter from './api/test';
import commonRouter from './api/commonRouter';
import tursoTodoRouter from './api/tursoTodoRouter';
//
import Htmx1 from './pages/Htmx1';
import Htmx2 from './pages/Htmx2';
import Htmx3 from './pages/Htmx3';
//
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isTest = process.env.VITEST

process.env.MY_CUSTOM_SECRET = 'API_KEY_qwertyuiop'
//
console.log("env.NODE_ENV =", process.env.NODE_ENV);
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//API
app.use('/api/test', testRouter);
app.use('/api/common', commonRouter);
app.use('/api/turso_todo', tursoTodoRouter);
//routes
//app.get('/htmx1', (req: any, res: any) => {
//  try {res.send(renderToString(Htmx1()));} catch (error) { res.sendStatus(500);}
//});
app.get('/htmx2', (req: any, res: any) => {
  try {res.send(renderToString(Htmx2()));} catch (error) { res.sendStatus(500);}
});
app.get('/htmx3', (req: any, res: any) => {
  try {res.send(renderToString(Htmx3()));} catch (error) { res.sendStatus(500);}
});
//
export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort,
) {
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('./client/index.html'), 'utf-8')
    : ''; 

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: 'custom',
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use((await import('compression')).default())
    app.use(
      (await import('serve-static')).default(resolve('client'), {
        index: false,
      }),
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('../index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        template = indexProd
        // @ts-ignore
        render = (await import('./server/entry-server.js')).render
      }

      const appHtml = render(url)

      const html = template.replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(5173, () => {
      console.log('http://localhost:5173')
    }),
  )
}
