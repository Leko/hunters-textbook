// @flow

import type { Question } from '../domain/Question'
import { UseCase } from 'almin'

export class AnswerUseCaseFactory {
  static create () : AnswerUseCase {
    return new AnswerUseCase()
  }
}

export default class AnswerUseCase extends UseCase {
  // constructor ({ tendencyRepository }: { tendencyRepository: TendencyRepository }) {
  //   super()
  //   this.tendencyRepository = tendencyRepository
  // }

  async execute (question: Question, answerIndex: number) {
    const type = AnswerUseCase.name
    const correct = answerIndex === question.answer
    console.log(correct ? '正解！' : 'ぶぶー')

    // TODO: アナリティクス

    this.dispatch({ type, correct })
  }
}
