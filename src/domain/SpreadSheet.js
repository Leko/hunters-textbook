// @flow

import { Record, Set } from 'immutable'
import { Sheet } from './'

export default class SpreadSheet extends Record({
  id: '',
  wildlife: new Sheet(),
  effectiveRange: new Sheet(),
}) {
}
