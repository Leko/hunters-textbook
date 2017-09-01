// @flow

import {StoreGroup} from 'almin'
import UIStore from './UI/UIStore'
import TendencyStore from './Tendency/TendencyStore'
import tendencyRepository from '../infra/TendencyRepository'
import SessionStore from './Session/SessionStore'

export default class AppStoreGroup {
  static create() {
    return new StoreGroup({
      uiState: new UIStore(),
      tendencyState: new TendencyStore({ tendencyRepository }),
      sessionState: new SessionStore(),
    })
  }
}
