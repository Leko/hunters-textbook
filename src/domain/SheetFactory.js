// @flow

import max from 'lodash/max'
import Sheet from './Sheet'
import Cell from './Cell'

type SpreadSheetEntityData = {
  type?: 'text',
  $t: string,
}
type SpreadSheetEntityLink = {
  rel: string,
  type: string,
  href: string,
}
type SpreadSheetEntityCategory = {
  scheme: string,
  term: string,
}
type SpreadSheetCellsEntityCell = {
  row: string,
  col: string,
  $t: string,
}
type SpreadSheetCellsEntity = {
  id: SpreadSheetEntityData,
  updated: SpreadSheetEntityData,
  category: Array<SpreadSheetEntityCategory>,
  title: SpreadSheetEntityData,
  content: SpreadSheetEntityData,
  link: Array<SpreadSheetEntityLink>,
  gs$cell: SpreadSheetCellsEntityCell,
  gs$colCount: SpreadSheetEntityData,
  gs$rowCount: SpreadSheetEntityData
}
type SpreadSheetAuthor = {
  name: SpreadSheetEntityData,
  email: SpreadSheetEntityData,
}
type SpreadSheetCellsFeed = {
  xmlns: 'http://www.w3.org/2005/Atom',
  xmlns$openSearch: 'http://a9.com/-/spec/opensearchrss/1.0/',
  xmlns$gs: 'http://schemas.google.com/spreadsheets/2006',
  id: SpreadSheetEntityData,
  updated: SpreadSheetEntityData,
  category: Array<SpreadSheetEntityCategory>,
  title: SpreadSheetEntityData,
  link: Array<SpreadSheetEntityLink>,
  author: Array<SpreadSheetAuthor>,
  openSearch$totalResults: SpreadSheetEntityData,
  openSearch$startIndex: SpreadSheetEntityData,
  entry: Array<SpreadSheetCellsEntity>,
}
type SpreadSheetCells = {
  version: string,
  encoding: 'UTF-8',
  feed: SpreadSheetCellsFeed,
}

export default class SheetFactory {
  static fromObject (obj) {
    return new Sheet(obj)
  }

  static fromCells (spreadsheetCells: SpreadSheetCells) : SpreadSheet {
    const entries = Array.isArray(spreadsheetCells.feed.entry)
      ? spreadsheetCells.feed.entry
      : [spreadsheetCells.feed.entry]

    const rows = entries
      .reduce((acc, entry) => {
        // 1はじまり
        const row = parseInt(entry.gs$cell.row, 10) - 1
        const col = parseInt(entry.gs$cell.col, 10) - 1

        acc[row] = acc[row] || []
        acc[row][col] = new Cell({ row, col, value: entry.content.$t })
        return acc
      }, [])
      // .map((row, i) => row.map((cell, j) => {console.log(i, j, cell); return cell || new Cell({ row: i, col: j, text: 'N/A' })}))

    const length = max(rows.map(r => r.length))
    rows.map((row, i) => {
      for (let j = 0; j < length; j++) {
        row[j] = row[j] || new Cell({ row: i, col: j, text: 'N/A' })
      }
      return row
    })

    return new Sheet({
      rows,
      id: spreadsheetCells.feed.id.$t,
      title: spreadsheetCells.feed.title.$t,
    })
  }
}
