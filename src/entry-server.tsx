import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './ServerApp'

export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  return { html }
}
