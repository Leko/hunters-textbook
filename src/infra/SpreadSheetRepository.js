// @flow

import fetch from 'isomorphic-fetch'
import { spreadsheets } from '../config'
import Repository from '../lib/Repository'
import SpreadSheetAdapter from './adapter/SpreadSheet'
import { SpreadSheet, SheetFactory } from '../domain'

export class SpreadSheetRepository extends Repository {
  async getByYear(year: number) : SpreadSheet {
    if (!spreadsheets[year]) {
      throw new Error(`Unknown year: ${year}`)
    }

    const sheets = {}
    for (let name in spreadsheets[year].sheets) {
      const sheetId = spreadsheets[year].sheets[name]
      const sheet = await this.get(`${spreadsheets[year].id}.${sheetId}`)
      sheets[name] = sheet
    }

    return new SpreadSheet({ ...sheets, id: spreadsheets[year].id })
  }

  async get(key) {
    const spreadSheet = await this.database.get(key)
    if (!spreadSheet) {
      throw new Error(`Unknown key: ${key}`)
    }

    const res = await this.database.get(key)
    return SheetFactory.fromCells(res)
  }
}

export default new SpreadSheetRepository(new SpreadSheetAdapter())
