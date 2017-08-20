// @flow

import assert from 'assert'
import { SpreadSheet, SpreadSheetFactory, SheetMeta } from '../../../src/domain'

describe(SpreadSheet.name, () => {
  describe('getSheetMetaList', () => {
    it('must return array of SheetMeta', async () => {
      const spreadSheet = SpreadSheetFactory.fromBasic({
        feed: {
          'id': {
            '$t': 'https://spreadsheets.google.com/feeds/worksheets/1LGKFHV6vMEizFGWUr2Zi0qFZCO4QQyOcz2nkrySp7kM/public/basic/ok7h3mi'
          },
          'title': {
            '$t': 'Shotgun'
          },
          'updated': {
            '$t': '2017-08-20T08:06:42.167Z'
          },
          entry: [
            {
              'id': {
                '$t': 'https://spreadsheets.google.com/feeds/worksheets/1LGKFHV6vMEizFGWUr2Zi0qFZCO4QQyOcz2nkrySp7kM/public/basic/ok7h3mi'
              },
              'updated': {
                '$t': '2017-08-20T08:06:42.167Z'
              },
              'category': [
                {
                  'scheme': 'http://schemas.google.com/spreadsheets/2006',
                  'term': 'http://schemas.google.com/spreadsheets/2006#worksheet'
                }
              ],
              'title': {
                '$t': 'Shotgun'
              },
              'content': {
                '$t': 'Shotgun'
              },
              'link': [
                {
                  'rel': 'http://schemas.google.com/spreadsheets/2006#cellsfeed',
                  'type': 'application/atom+xml',
                  'href': 'https://spreadsheets.google.com/feeds/cells/1LGKFHV6vMEizFGWUr2Zi0qFZCO4QQyOcz2nkrySp7kM/ok7h3mi/public/basic'
                },
              ],
            },
            {
              'id': {
                '$t': 'https://spreadsheets.google.com/feeds/worksheets/1LGKFHV6vMEizFGWUr2Zi0qFZCO4QQyOcz2nkrySp7kM/public/basic/of23ah5'
              },
              'updated': {
                '$t': '2017-08-20T08:06:42.167Z'
              },
              'category': [
                {
                  'scheme': 'http://schemas.google.com/spreadsheets/2006',
                  'term': 'http://schemas.google.com/spreadsheets/2006#worksheet'
                }
              ],
              'title': {
                '$t': 'Wildlife'
              },
              'content': {
                '$t': 'Wildlife'
              },
              'link': [
                {
                  'rel': 'http://schemas.google.com/spreadsheets/2006#cellsfeed',
                  'type': 'application/atom+xml',
                  'href': 'https://spreadsheets.google.com/feeds/cells/1LGKFHV6vMEizFGWUr2Zi0qFZCO4QQyOcz2nkrySp7kM/of23ah5/public/basic'
                },
              ],
            },
          ],
        },
      })

      const sheetMetaList = await spreadSheet.getSheetMetaList()
      assert.notEqual(sheetMetaList.length, 0)
      sheetMetaList.forEach(sheetMeta => assert.strictEqual(sheetMeta.constructor, SheetMeta))
    })
  })
})
