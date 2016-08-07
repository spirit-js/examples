/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import spirit from 'spirit'
import express from 'spirit-express'
import http from 'http'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import { fetchCounter } from '../common/api/counter'

const port = 3000


// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)

const middleware = [
  express(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath })),
  express(webpackHotMiddleware(compiler))
]

// This is fired every time the server side receives a request
function handleRender(req) {
  // Query our mock API asynchronously
  return new Promise((resolve, reject) => {
    fetchCounter(apiResult => {
      // Read the counter from the request, if provided
      const params = qs.parse(req.query)
      const counter = parseInt(params.counter, 10) || apiResult || 0

      // Compile an initial state
      const preloadedState = { counter }

      // Create a new Redux store instance
      const store = configureStore(preloadedState)

      // Render the component to a string
      const html = renderToString(
          <Provider store={store}>
          <App />
          </Provider>
      )

      // Grab the initial state from our Redux store
      const finalState = store.getState()

      // Send the rendered page back to the client
      resolve(spirit.node.response(renderFullPage(html, finalState)))
    })
  })
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

const server = http.createServer(spirit.node.adapter(handleRender, middleware))
server.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
