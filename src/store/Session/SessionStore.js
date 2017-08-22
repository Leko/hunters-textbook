// @flow

import { Store } from 'almin'
// import { Question } from '../../domain'
import SessionState from './SessionState'

export default class QuestionStore extends Store {
  constructor() {
    super()
    this.state = new SessionState({ questions: [] })
  }

  receivePayload(payload) {
    this.setState(this.state.reduce(payload))
  }

  getState() {
    return this.state
  }
}
