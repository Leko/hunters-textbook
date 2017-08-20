// @flow

import { Record, Set } from 'immutable'
import { Choice } from './'

export default class Question extends Record({
  sentence: '',
  choices: Set(),
  answer: -1,
}) {
  isAccepted (idx: number) : boolean {
    return idx === this.answer
  }

  getAppendix () : string {

  }

  getCorrection () : string {

  }
}
