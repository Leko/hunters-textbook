// @flow

import SheetMeta from './SheetMeta'

export default class SheetMetaFactory {
  static fromObject (obj) {
    return new SheetMeta(obj)
  }
}
