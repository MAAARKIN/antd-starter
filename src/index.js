import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import rootReducer from './reducers'

import { LocaleProvider } from 'antd'
import en_US from 'antd/lib/locale-provider/en_US'
import App from './containers/App'

import './theme.less'

const history = createBrowserHistory()

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      ...middleware
    ),
  ),
)

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
          <LocaleProvider locale={en_US}><App history={history} /></LocaleProvider>
        </Provider>,
        document.getElementById('root')
    )
}
  
render()