// @flow

import {StoreGroup} from 'almin'
import TendencyStore from './Tendency/TendencyStore'
import tendencyRepository from '../infra/TendencyRepository'

export default class AppStoreGroup {
  static create() {
    return new StoreGroup({
      tendencyState: new TendencyStore({ tendencyRepository }),
    })
  }
}
