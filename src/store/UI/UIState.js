// @flow

import type { QuestionTendency } from '../../domain'
import { LOADING, LOADED } from '../../const/actions'

export default class UIState {
  constructor({ busy = false }: { busy: boolean } = {}) {
    this.busy = busy
  }

  merge(payload) {
    return new UIState(Object.assign({}, this, payload))
  }

  reduce(payload) {
    switch (payload.type) {
      case LOADING:
        return this.merge({ busy: true })
      case LOADED:
        return this.merge({ busy: false })
      default:
        return this
    }
  }
}
