// @flow

import { Record } from 'immutable'

export default class Cell extends Record({
  value: '',
}) {
  isNA () : boolean {
    return this.getValue() === 'N/A'
  }

  getValue () : string {
    return this.value
  }
}
