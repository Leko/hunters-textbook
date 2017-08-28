// @flow

import React, { PureComponent } from 'react'
import { LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Card, { CardContent } from 'material-ui/Card'
import { RestoreSessionFromQueryUseCaseFactory } from '../usecase/RestoreSessionFromQuery'
import { AnswerUseCaseFactory } from '../usecase/Answer'
import { NextQuestionUseCaseFactory } from '../usecase/NextQuestion'
import { ExitFeedbackUseCaseFactory } from '../usecase/ExitFeedback'
import Question from './Question'
import {
  QuestionFeedbackModal,
  QuestionResultList,
} from '../components'
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
    const useCase = ExitFeedbackUseCaseFactory.create()
    context.useCase(useCase).execute()
  }

  handleExit = () => {
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
    const { part, questions, needFeedback } = this.props.sessionState
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
        <QuestionFeedbackModal
          open={needFeedback}
          question={question}
          onRequestClose={this.handleRequestClose}
          onHide={this.handleExit}
        />
      </div>
    )
  }

  renderScore () {
    const { questions } = this.props.sessionState
    return (
      <Grid container justify='center'>
        <Grid item xs={12} sm={6}>
          <Card style={{ width: '100%' }}>
            <CardContent>
              <Typography>
                {questions.length}問中{questions.filter(q => q.correct).length}問正解
              </Typography>
            </CardContent>
            <QuestionResultList questions={questions} />
          </Card>
        </Grid>
      </Grid>
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
