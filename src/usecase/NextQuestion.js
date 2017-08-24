// @flow

import type { Question } from '../domain/Question'
import { UseCase } from 'almin'
import { NEXT_QUESTION } from '../const/actions'

export class NextQuestionUseCaseFactory {
  static create () : NextQuestionUseCase {
    return new NextQuestionUseCase()
  }
}

export default class NextQuestionUseCase extends UseCase {
  execute () {
    this.dispatch({ type: NEXT_QUESTION })
  }
}
