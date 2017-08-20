// @flow

import { createLocalStorage } from 'localstorage-ponyfill'
import Base from './Base'

export default class LocalStorage extends Base {
  constructor (localStorage = createLocalStorage({ mode: 'browser' })) {
    super()
    this.database = localStorage
  }

  async get(key) {
    return JSON.parse(this.database.getItem(key))
  }

  async setInBatch(attr: { [string]: any }) {
    for (let key in attr) {
      this.database.setItem(key, JSON.stringify(attr[key]))
    }
  }
}
