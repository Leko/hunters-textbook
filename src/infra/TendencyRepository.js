// @flow

import Repository from '../lib/Repository'
import LocalStorageAdapter from './adapter/LocalStorage'
import { QuestionTendency } from '../domain'

const REPOSITORY_CHANGE = 'REPOSITORY_CHANGE'
const storePrefix = QuestionTendency.name

export class TendencyRepository extends Repository {
  async fetch () {
    this.database.get(storePrefix)
  }

  async save (tendency) {
    this.database.set(storePrefix, tendency)
    this.emit(REPOSITORY_CHANGE, tendency)
  }
}

export default new TendencyRepository(new LocalStorageAdapter())
