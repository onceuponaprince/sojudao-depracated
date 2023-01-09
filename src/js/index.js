import _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// Arrange values.
const reactWebApp = (
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={App} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
)
const d = document
const body = d.body
const root = d.getElementById('root')
/**
 * Returns a Promise resolved with the rendering of reactWebApp.
 *
 * @return {Promise} Rendered reactWebApp.
 */
function resolveRender() {
  return Promise.resolve(ReactDOM.render(reactWebApp, root))
}
/**
 * Replaces loading status with rendered reactWebApp.
 */
function displayRender() {
  const preloadContainer = d.getElementById('preloadContainer')
  const hiddenSelector = 'hidden'
  const hiddenSelectorRe = new RegExp(hiddenSelector, 'g')
  /* Explicitly typing HTML elements throws errors as this is
    null without the rendered page. The type guard below replaces
    any explicit type. */
  if (!preloadContainer || !root) {
    console.log('Something went wrong!')
  } else {
    body.removeChild(preloadContainer)
    if (_.includes(root.className, hiddenSelector)) {
      root.className = _.replace(root.className, hiddenSelectorRe, '')
    }
  }
}
// Display reactWebApp after it is rendered.
resolveRender().then(() => {
  displayRender()
})
// Re-render reactWebApp when changes are made during development.
if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./App', () => {
    require('./App').default
    ReactDOM.render(reactWebApp, root)
  })
}
