// @flow

import { UseCase } from 'almin'
import { RESET_ALL } from '../const/actions'

export class ResetUseCaseFactory {
  static create () : ResetUseCase {
    return new ResetUseCase()
  }
}

export default class ResetUseCase extends UseCase {
  execute () {
    this.dispatch({ type: RESET_ALL })
  }
}
