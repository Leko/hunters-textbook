// @flow

import fetch from 'isomorphic-fetch'
import Repository from '../lib/Repository'
import { SpreadSheetFactory } from '../domain'

export default class SpreadSheetRepository extends Repository {
  async getByYear(year: number) : SpreadSheet {
    const id = String(year)
    if (!this.database.get(id)) {
      throw new Error(`Unknown year: ${year}`)
    }

    const { url } = this.database.get(id)
    // FIXME: HTTP依存
    const response = await fetch(url)
    return SpreadSheetFactory.fromBasic(await response.json())
  }
}
