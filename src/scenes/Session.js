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
import IconClose from 'material-ui-icons/Close'
import IconCheck from 'material-ui-icons/Check'
import { RestoreSessionFromQueryUseCaseFactory } from '../usecase/RestoreSessionFromQuery'
import { AnswerUseCaseFactory } from '../usecase/Answer'
import { NextQuestionUseCaseFactory } from '../usecase/NextQuestion'
import Question from './Question'
import '../styles/Session.css'

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

  renderQuestion () {
    const { part, questions, needFeedback, finished } = this.props.sessionState
    const question = this.currentQuestion
    if (!question) {
      return null
    }
    const IconComponent = question.correct ? IconCheck : IconClose

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
        <Dialog
          ignoreBackdropClick
          ignoreEscapeKeyUp
          maxWidth='xs'
          open={needFeedback}
          onRequestClose={this.handleRequestClose}
          classes={{
            paper: 'Session__modal',
          }}
        >
          <DialogTitle classes={{ root: 'Session__modal__title' }}>
            <IconComponent
              className={`Session__modal__icon ${question.correct ? 'Session__modal__icon--correct' : 'Session__modal__icon--wrong'}`}
            />
            <br/>
            {question.correct ? '正解' : '不正解'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              正解：{question.getAnswer()}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              次の問題へ
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  renderScore () {
    const { part, questions, needFeedback, finished } = this.props.sessionState
    return (
      <div>
        {questions.length}問中{questions.filter(q => q.correct).length}問正解
        {questions.map(q => {
          return (
            <span>{q.sentence}</span>
          )
        })}
      </div>
    )
  }

  render () {
    const { finished } = this.props.sessionState
    if (finished) {
      return this.renderScore()
    } else {
      return this.renderQuestion()
    }
  }
}
