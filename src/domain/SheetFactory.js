// @flow

import Sheet from './Sheet'

export default class SheetFactory {
  static fromObject (obj) {
    return new Sheet(obj)
  }
}
