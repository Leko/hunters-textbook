// @flow

import { UseCase } from 'almin'
import { EXIT_FEEDBACK } from '../const/actions'

export class ExitFeedbackUseCaseFactory {
  static create () : ExitFeedbackUseCase {
    return new ExitFeedbackUseCase()
  }
}

export default class ExitFeedbackUseCase extends UseCase {
  execute () {
    this.dispatch({ type: EXIT_FEEDBACK })
  }
}
