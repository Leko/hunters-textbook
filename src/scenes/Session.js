// @flow

import React, { PureComponent } from 'react'
import { LinearProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import { RestoreSessionFromQueryUseCaseFactory } from '../usecase/RestoreSessionFromQuery'
import { AnswerUseCaseFactory } from '../usecase/Answer'
import { NextQuestionUseCaseFactory } from '../usecase/NextQuestion'
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

  handleRequestClose = () => {
    const context = this.props.appContext
    const useCase = NextQuestionUseCaseFactory.create()
    context.useCase(useCase).execute()
  }

  componentWillMount () {
    const context = this.props.appContext
    const useCase = RestoreSessionFromQueryUseCaseFactory.create()
    context.useCase(useCase).execute(this.props.match.params.year, this.props.location.search)
  }

  render () {
    console.log(this.props.sessionState)
    const { part, questions, needFeedback, finished } = this.props.sessionState
    const question = this.currentQuestion
    if (!question) {
      return null
    }

    return (
      <div>
        <LinearProgress
          mode='determinate'
          value={part / questions.length * 100}
        />
        <Question
          question={question}
          onAnswer={this.handleClickAnswer}
        />
        <Dialog open={needFeedback} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{question.correct ? '正解' : '不正解'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
