// @flow

import type { QuestionTendency } from '../../domain'
import { RESET_ALL, CONFIGURE_TENDENCY } from '../../const/actions'

const COUNT_STEPS = [10, 20, 30, 50]

export {
  COUNT_STEPS,
}

export default class TendencyState {
  constructor({ tendency }: { tendency: QuestionTendency } = {}) {
    this.tendency = tendency
  }

  merge(tendency: QuestionTendency) {
    return new TendencyState(Object.assign(this, {
      tendency: this.tendency.merge(tendency),
    }))
  }

  reduce(payload) {
    switch (payload.type) {
      case RESET_ALL:
        return this.merge({})
      case CONFIGURE_TENDENCY:
        return this.merge({
          tendency: this.tendency.merge(payload.changes)
        })
      default:
        return this
    }
  }
}
