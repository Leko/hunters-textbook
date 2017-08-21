// @flow

import type { Cell } from './'
import { Record, Set } from 'immutable'

export default class Sheet extends Record({
  id: '',
  title: '',
  rows: Set(),
}) {
  getRowHeaders () : Set<Cell> {}
  getColumnHeaders () : Set<Cell> {}
  getRowByHeader (rowHeader: string) {}
  getColumnByHeader (columnHeader: string) {}
}
