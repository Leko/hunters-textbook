// @flow

import type Base from '../infra/adapter/Base'
import EventEmitter from 'events'

export default class Repository extends EventEmitter {
  database: Base

  constructor (datastore) {
    super()
    this.database = datastore
  }
}
