// @flow

import React, { PureComponent } from 'react'
import { LinearProgress } from 'material-ui/Progress'
import { RestoreSessionFromQueryUseCaseFactory } from '../usecase/RestoreSessionFromQuery'
import { AnswerUseCaseFactory } from '../usecase/Answer'
import Question from './Question'

type Props = {
  part: number,
};

export default class Session extends PureComponent<void, Props> {
  get currentQuestion () {
    const { questions, part } = this.props.sessionState
    return questions[part]
  }

  handleClickAnswer = (index) => {
    const context = this.props.appContext
    const useCase = AnswerUseCaseFactory.create()
    context.useCase(useCase).execute(this.currentQuestion, index)
  }

  componentWillMount () {
    const context = this.props.appContext
    const useCase = RestoreSessionFromQueryUseCaseFactory.create()
    context.useCase(useCase).execute(this.props.match.params.year, this.props.location.search)
  }

  render () {
    const { part, questions, finished } = this.props.sessionState
    if (!this.currentQuestion) {
      return null
    }

    return (
      <div>
        <LinearProgress
          mode='determinate'
          value={part / questions.length * 100}
        />
        <Question question={this.currentQuestion} onAnswer={this.handleClickAnswer} />
      </div>
    )
  }
}
