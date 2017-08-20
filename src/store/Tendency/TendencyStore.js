// @flow

import { Store } from 'almin'
import { QuestionTendency } from '../../domain'
import TendencyState, { COUNT_STEPS } from './TendencyState'

export default class TodoStore extends Store {
  constructor({ tendencyRepository }) {
    super()
    this.state = new TendencyState({
      tendency: new QuestionTendency({ count: COUNT_STEPS[0] }),
    })
    this.tendencyRepository = tendencyRepository
  }

  receivePayload(payload) {
    this.setState(this.state.reduce(payload))
  }

  getState() {
    return this.state
  }
}
