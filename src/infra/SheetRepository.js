// @flow

import fetch from 'isomorphic-fetch'
import Repository from '../lib/Repository'
import type { SheetMeta, Sheet } from '../domain'
import { SpreadSheetFactory } from '../domain'

export default class SheetRepository extends Repository {
  async getByMeta(meta: SheetMeta) : Sheet {
    return this.database.get(id)
  }
}
