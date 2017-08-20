// @flow

import Base from './Base'

export default class MemoryDB extends Base {
  constructor (map: { [string]: { [string]: any } }) {
    super()
    this.map = map
  }

  get (id: string): { [string]: any } {
    return this.map[id]
  }
}
