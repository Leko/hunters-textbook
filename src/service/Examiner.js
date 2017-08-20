// @flow

import type { SpreadSheet, Question, QuestionTendency } from '../domain'
import { Set } from 'immutable'

export default class Examiner {
  // getTendencies () {
  //   return {
  //     onlyIdentify: '判別のみ出題する',
  //     onlyIllust: '読本のイラストのみ出題する',
  //   }
  // }

  static createQuestions (spreadSheet: SpreadSheet, tendency: QuestionTendency) : Set<Question> {

  }
}
