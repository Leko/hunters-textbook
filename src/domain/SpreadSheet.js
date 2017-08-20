// @flow

import { Record, Set } from 'immutable'
import { Sheet, SheetMeta } from './'

export default class SpreadSheet extends Record({
  id: '',
  title: '',
  sheetMetas: new Set([]),
  updated: new Date(),
}) {
  getSheetMetaList () : Set<SheetMeta> {
    return this.sheetMetas
  }
}
