// @flow

import { Set } from 'immutable'
import SpreadSheet from './SpreadSheet'
import SheetMetaFactory from './SheetMetaFactory'

type SpreadSheetBasicEntityData = {
  type?: 'text',
  $t: string,
}
type SpreadSheetBasicEntityLink = {
  rel: string,
  type: string,
  href: string,
}
type SpreadSheetBasicEntityCategory = {
  scheme: string,
  term: string,
}
type SpreadSheetBasicEntity = {
  id: SpreadSheetBasicEntityData,
  updated: SpreadSheetBasicEntityData,
  category: Array<SpreadSheetBasicEntityCategory>,
  title: SpreadSheetBasicEntityData,
  content: SpreadSheetBasicEntityData,
  link: Array<SpreadSheetBasicEntityLink>,
  gs$colCount: SpreadSheetBasicEntityData,
  gs$rowCount: SpreadSheetBasicEntityData
}
type SpreadSheetCellsEntityCell = {
  row: string,
  col: string,
  $t: string,
}
type SpreadSheetCellsEntity = {
  id: SpreadSheetBasicEntityData,
  updated: SpreadSheetBasicEntityData,
  category: Array<SpreadSheetBasicEntityCategory>,
  title: SpreadSheetBasicEntityData,
  content: SpreadSheetBasicEntityData,
  link: Array<SpreadSheetBasicEntityLink>,
  gs$cell: SpreadSheetCellsEntityCell,
  gs$colCount: SpreadSheetBasicEntityData,
  gs$rowCount: SpreadSheetBasicEntityData
}
type SpreadSheetBasicAuthor = {
  name: SpreadSheetBasicEntityData,
  email: SpreadSheetBasicEntityData,
}
type SpreadSheetBasicFeed = {
  xmlns: 'http://www.w3.org/2005/Atom',
  xmlns$openSearch: 'http://a9.com/-/spec/opensearchrss/1.0/',
  xmlns$gs: 'http://schemas.google.com/spreadsheets/2006',
  id: SpreadSheetBasicEntityData,
  updated: SpreadSheetBasicEntityData,
  category: Array<SpreadSheetBasicEntityCategory>,
  title: SpreadSheetBasicEntityData,
  link: Array<SpreadSheetBasicEntityLink>,
  author: Array<SpreadSheetBasicAuthor>,
  openSearch$totalResults: SpreadSheetBasicEntityData,
  openSearch$startIndex: SpreadSheetBasicEntityData,
  entry: SpreadSheetBasicEntity | Array<SpreadSheetBasicEntity>,
}
type SpreadSheetCellsFeed = {
  xmlns: 'http://www.w3.org/2005/Atom',
  xmlns$openSearch: 'http://a9.com/-/spec/opensearchrss/1.0/',
  xmlns$gs: 'http://schemas.google.com/spreadsheets/2006',
  id: SpreadSheetBasicEntityData,
  updated: SpreadSheetBasicEntityData,
  category: Array<SpreadSheetBasicEntityCategory>,
  title: SpreadSheetBasicEntityData,
  link: Array<SpreadSheetBasicEntityLink>,
  author: Array<SpreadSheetBasicAuthor>,
  openSearch$totalResults: SpreadSheetBasicEntityData,
  openSearch$startIndex: SpreadSheetBasicEntityData,
  entry: Array<SpreadSheetCellsEntity>,
}
type SpreadSheetBasic = {
  version: string,
  encoding: 'UTF-8',
  feed: SpreadSheetBasicFeed,
}
type SpreadSheetCells = {
  version: string,
  encoding: 'UTF-8',
  feed: SpreadSheetCellsFeed,
}

export default class SpreadSheetFactory {
  static fromBasic (spreadsheetBasic: SpreadSheetBasic) : SpreadSheet {
    const entries = Array.isArray(spreadsheetBasic.feed.entry)
      ? spreadsheetBasic.feed.entry
      : [spreadsheetBasic.feed.entry]
    const metas = entries.map(entry => {
      const sheetLinks = entry.link.filter(l => l.rel.includes('#cellsfeed'))
      if (sheetLinks.length <= 0) {
        throw new Error('link #cellsfeed not found')
      }

      return SheetMetaFactory.fromObject({
        id: entry.id.$t,
        updated: new Date(entry.updated.$t),
        title: entry.title.$t,
        link: sheetLinks[0].href + '?alt=json',
      })
    })

    return new SpreadSheet({
      id: spreadsheetBasic.feed.id.$t,
      title: spreadsheetBasic.feed.title.$t,
      updated: new Date(spreadsheetBasic.feed.updated.$t),
      sheetMetas: new Set(metas)
    })
  }
}
