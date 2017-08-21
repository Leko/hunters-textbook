// @flow

import { Record } from 'immutable'

export default class Question extends Record({
  image: null,
  sentence: '',
  choices: [],
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
