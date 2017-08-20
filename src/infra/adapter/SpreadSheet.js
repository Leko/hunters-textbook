// @flow

import Base from './Base'

export default class SpreadSheet extends Base {
  constructor (map: { [string]: { url: string } }) {
    super()
    this.map = map
  }

  get (id: string): { url: string } {
    return this.map[id]
  }
}
