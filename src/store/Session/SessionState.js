// @flow

import type { QuestionTendency } from '../../domain'
import RestoreSessionFromQueryUseCase from '../../usecase/RestoreSessionFromQuery'
import AnswerUseCase from '../../usecase/Answer'

const COUNT_STEPS = [10, 20, 30, 50]

export {
  COUNT_STEPS,
}

export default class SessionState {
  constructor({ questions, part = 0, finished = false }: {
    questions: Array<Question>,
    part: number,
    finished: boolean,
  } = {}) {
    if (part > 0 && questions.length > 0 && part >= questions.length) {
      throw new Error(`part(${part}) must be less than questions.length(${questions.length})`)
    }
    this.questions = questions
    this.part = part
    this.finished = finished
  }

  reduce(payload) {
    switch (payload.type) {
      case RestoreSessionFromQueryUseCase.name:
        return new SessionState({
          questions: payload.questions,
        })
      case AnswerUseCase.name:
        const questions = this.questions.slice()
        const question = questions[this.part]
        questions[this.part] = question.set('correct', payload.correct)
        return new SessionState({
          questions,
          part: Math.min(this.part + 1, this.questions.length - 1),
          finished: this.part === this.questions.length - 1,
        })
      default:
        return this
    }
  }
}
