// @flow

import type { Cell } from './'
import { Record, Set } from 'immutable'
import SheetMeta from './SheetMeta'

export default class Sheet extends Record({
  title: '',
  rows: Set(),
  meta: new SheetMeta(),
}) {
  getRowHeaders () : Set<Cell> {}
  getColumnHeaders () : Set<Cell> {}
  getRowByHeader (rowHeader: string) {}
  getColumnByHeader (columnHeader: string) {}
}
