// @flow

import type { Question } from '../../domain'
import ReactGA from 'react-ga'
import {
  RESET_ALL,
  RESTORE_SESSION_FROM_QUERY,
  EXIT_FEEDBACK,
  NEXT_QUESTION,
  ANSWER,
} from '../../const/actions'

const COUNT_STEPS = [10, 20, 30, 50]

export {
  COUNT_STEPS,
}

export default class SessionState {
  constructor({ questions = [], part = 0, finished = false, feedbackQuestion = null }: {
    questions: Array<Question>,
    part: number,
    finished: boolean,
    feedbackQuestion: Question,
  } = {}) {
    if (part > 0 && questions.length > 0 && part >= questions.length) {
      throw new Error(`part(${part}) must be less than questions.length(${questions.length})`)
    }
    this.questions = questions
    this.part = part
    this.finished = finished
    this.feedbackQuestion = feedbackQuestion
  }

  merge (payload) {
    return new SessionState(Object.assign({}, this, payload))
  }

  reduce(payload) {
    switch (payload.type) {
      case RESET_ALL:
        return new SessionState()
      case RESTORE_SESSION_FROM_QUERY:
        return this.merge({
          questions: payload.questions,
        })
      case EXIT_FEEDBACK:
        return this.merge({
          feedbackQuestion: null,
        })
      case NEXT_QUESTION:
        const finished = this.part === this.questions.length - 1
        if (finished) {
          ReactGA.event({
            category: 'Session',
            action: 'Finished',
            value: this.questions.length,
          })
          ReactGA.event({
            category: 'Session',
            action: 'Accept ratio',
            value: parseFloat((this.questions.filter(q => q.correct).length / this.questions.length).toFixed(2)) * 100,
          })
        }
        return this.merge({
          part: Math.min(this.part + 1, this.questions.length - 1),
          finished: finished,
        })
      case ANSWER:
        const { question, answerIndex } = payload
        const tmpQuestions = this.questions.slice()
        const newQuestion = question.merge({
          correct: question.isAccepted(answerIndex)
        })
        tmpQuestions[this.part] = newQuestion
        return this.merge({
          questions: tmpQuestions,
          feedbackQuestion: newQuestion,
        })
      default:
        return this
    }
  }
}
