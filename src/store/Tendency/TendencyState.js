// @flow

import type { QuestionTendency } from '../../domain'
import ConfigureTendencyUseCase from '../../usecase/ConfigureTendency'

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
      case ConfigureTendencyUseCase.name:
        return new TendencyState({
          tendency: this.tendency.merge(payload.changes)
        })
      default:
        return this
    }
  }
}
