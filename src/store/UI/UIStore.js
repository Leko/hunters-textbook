// @flow

import { Store } from 'almin'
import UIState from './UIState'

export default class UIStore extends Store {
  constructor() {
    super()
    this.state = new UIState({
      busy: false,
    })
  }

  receivePayload(payload) {
    this.setState(this.state.reduce(payload))
  }

  getState() {
    return this.state
  }
}
