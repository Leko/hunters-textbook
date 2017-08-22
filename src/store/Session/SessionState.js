// @flow

import type { QuestionTendency } from '../../domain'
import RestoreSessionFromQueryUseCase from '../../usecase/RestoreSessionFromQuery'
import NextQuestionUseCase from '../../usecase/NextQuestion'
import AnswerUseCase from '../../usecase/Answer'

const COUNT_STEPS = [10, 20, 30, 50]

export {
  COUNT_STEPS,
}

export default class SessionState {
  constructor({ questions, part = 0, finished = false, needFeedback = false }: {
    questions: Array<Question>,
    part: number,
    finished: boolean,
    needFeedback: boolean,
  } = {}) {
    if (part > 0 && questions.length > 0 && part >= questions.length) {
      throw new Error(`part(${part}) must be less than questions.length(${questions.length})`)
    }
    this.questions = questions
    this.part = part
    this.finished = finished
    this.needFeedback = needFeedback
  }

  merge (payload) {
    return new SessionState(Object.assign({}, this, payload))
  }

  reduce(payload) {
    switch (payload.type) {
      case RestoreSessionFromQueryUseCase.name:
        return this.merge({
          questions: payload.questions,
        })
      case NextQuestionUseCase.name:
        return this.merge({
          part: Math.min(this.part + 1, this.questions.length - 1),
          finished: this.part === this.questions.length - 1,
          needFeedback: false,
        })
      case AnswerUseCase.name:
        const questions = this.questions.slice()
        const question = questions[this.part]
        questions[this.part] = question.set('correct', payload.correct)
        return this.merge({
          questions,
          needFeedback: true,
        })
      default:
        return this
    }
  }
}
