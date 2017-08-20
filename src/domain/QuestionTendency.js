// @flow

import { Record } from 'immutable'

export default class QuestionTendency extends Record({
  coverIdentify: true, // 同定（判別）を出題する
  coverALaCarte: true, // アラカルトを出題する

  onlyIllust: false,   // イラストのみ出題する
  onlyBeasts: false,   // 獣類のみ出題する
  onlyBirds: false,    // 鳥類のみ出題する

  count: -1,            // 出題数
}) {
}
