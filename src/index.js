import React from 'react'
import ReactDOM from 'react-dom'
import { Context, Dispatcher } from 'almin'
import { AlminLogger } from 'almin-logger'
import AppStoreGroup from './store/AppStoreGroup'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const appContext = new Context({
  dispatcher: new Dispatcher(),
  store: AppStoreGroup.create(),
  options: { strict: true },
})

new AlminLogger().startLogging(appContext)

ReactDOM.render(<App appContext={appContext} />, document.getElementById('root'))
registerServiceWorker()
