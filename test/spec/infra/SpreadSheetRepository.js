// @flow

import assert from 'assert'
import { spreadsheets } from '../../../src/config'
import { SpreadSheet } from '../../../src/domain'
import { SpreadSheetRepository } from '../../../src/infra/SpreadSheetRepository'
import SpreadSheetAdapter from '../../../src/infra/adapter/SpreadSheet'

describe(SpreadSheetRepository.name, () => {
  let repository
  beforeEach(() => {
    const adapter = new SpreadSheetAdapter(spreadsheets)
    repository = new SpreadSheetRepository(adapter)
  })

  describe('getByYear()', () => {
    context('If it\'s in the list:', () => {
      it('can fetch spreadsheet')
      // , async () => {
      //   const spreadSheet = await repository.getByYear('2017')
      //   assert.strictEqual(spreadSheet.constructor, SpreadSheet)
      // }
    })
    context('If it\'s not in the list:', () => {
      it('throw error', (done) => {
        repository.getByYear('20XX')
          .then(
            () => assert.fail('Missing expected exception'),
            () => assert.ok(true)
          )
          .then(done)
      })
    })
  })
})
