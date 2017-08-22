// @flow

import type { Question } from '../domain/Question'
import { UseCase } from 'almin'

export class AnswerUseCaseFactory {
  static create () : AnswerUseCase {
    return new AnswerUseCase()
  }
}

export default class AnswerUseCase extends UseCase {
  execute (question: Question, answerIndex: number) {
    const type = AnswerUseCase.name
    const correct = answerIndex === question.answer

    // TODO: アナリティクス

    this.dispatch({ type, correct })
  }
}
