// @flow

import { Record } from 'immutable'

export default class Cell extends Record({
  row: -1,
  col: -1,
  value: '',
}) {
  isNA () : boolean {
    return this.getValue() === 'N/A'
  }
  isYes () : boolean {
    return this.getValue() === 'YES'
  }
  isNo () : boolean {
    return this.getValue() === 'NO'
  }

  getValue () : string {
    return this.value
  }
}
