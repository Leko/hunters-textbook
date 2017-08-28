// @flow

import type { Question } from '../domain/Question'
import { UseCase } from 'almin'
import { ANSWER } from '../const/actions'

export class AnswerUseCaseFactory {
  static create () : AnswerUseCase {
    return new AnswerUseCase()
  }
}

export default class AnswerUseCase extends UseCase {
  execute (question: Question, answerIndex: number) {
    const type = ANSWER

    // TODO: アナリティクス

    this.dispatch({ question, answerIndex, type })
  }
}
