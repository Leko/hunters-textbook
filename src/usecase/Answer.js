// @flow

import type { Question } from '../domain/Question'
import ReactGA from 'react-ga'
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

    ReactGA.event({
      category: 'Question',
      action: question.isAccepted(answerIndex) ? 'Correct' : 'Wrong',
      label: `${question.sentence}__${question.getAnswer()}`,
    })

    this.dispatch({ question, answerIndex, type })
  }
}
