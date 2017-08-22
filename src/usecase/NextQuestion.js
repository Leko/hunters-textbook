// @flow

import type { Question } from '../domain/Question'
import { UseCase } from 'almin'

export class NextQuestionUseCaseFactory {
  static create () : NextQuestionUseCase {
    return new NextQuestionUseCase()
  }
}

export default class NextQuestionUseCase extends UseCase {
  execute () {
    this.dispatch({ type: NextQuestionUseCase.name })
  }
}
