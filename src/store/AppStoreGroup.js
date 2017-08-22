// @flow

import {StoreGroup} from 'almin'
import TendencyStore from './Tendency/TendencyStore'
import tendencyRepository from '../infra/TendencyRepository'
import SessionStore from './Session/SessionStore'

export default class AppStoreGroup {
  static create() {
    return new StoreGroup({
      tendencyState: new TendencyStore({ tendencyRepository }),
      sessionState: new SessionStore(),
    })
  }
}
