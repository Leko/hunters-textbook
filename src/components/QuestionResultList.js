// @flow

import React, { PureComponent } from 'react'
import QuestionResult from './QuestionResult'

export default class QuestionResultList extends PureComponent {
  render () {
    const { questions } = this.props
    return (
      <div>
        {questions.map((question, i) => (
          <QuestionResult key={i} question={question} />
        ))}
      </div>
    )
  }
}
