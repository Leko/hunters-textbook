import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { Context, Dispatcher } from 'almin'
import { AlminLogger } from 'almin-logger'
import AppStoreGroup from './store/AppStoreGroup'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const __DEV__ = process.env.NODE_ENV !== 'production'

const appContext = new Context({
  dispatcher: new Dispatcher(),
  store: AppStoreGroup.create(),
  options: { strict: true },
})

if (__DEV__) {
  new AlminLogger().startLogging(appContext)
}

ReactGA.initialize('UA-105406156-1', { debug: __DEV__ })

ReactDOM.render(<App appContext={appContext} />, document.getElementById('root'))
registerServiceWorker()
