// @flow

import Base from './Base'

export default class SpreadSheet extends Base {
  async get (path: string) {
    const [ spreadSheetId, sheetId ] = path.split('.')
    const url = `https://spreadsheets.google.com/feeds/cells/${spreadSheetId}/${sheetId}/public/values?alt=json`
    const response = await fetch(url)
    return response.json()
  }
}
