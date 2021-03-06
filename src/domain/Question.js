// @flow

import { Record } from 'immutable'

export default class Question extends Record({
  image: null,
  sentence: '',
  choices: [],
  answer: -1,
  correct: null, // null = 未回答、bool = 回答済み
}) {
  isAccepted (idx: number) : boolean {
    return idx === this.answer
  }

  getAnswer () : string {
    return this.choices[this.answer].text
  }

  getAppendix () : string {

  }

  getCorrection () : string {

  }
}
