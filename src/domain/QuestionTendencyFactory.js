// @flow

import QuestionTendency from './QuestionTendency'
import URLSearchParams from 'url-search-params'

export default class QuestionTendencyFactory {
  static fromQueryString (queryString) : QuestionTendency {
    const searchParams = new URLSearchParams(queryString)
    const parsed = Array.from(searchParams.entries())
      .reduce((acc, [key, value]) => Object.assign(acc, { [key]: value }), {})

    return new QuestionTendency({
      coverIdentify: parsed.coverIdentify ? !!parseInt(parsed.coverIdentify, 10) : undefined,
      coverALaCarte: parsed.coverALaCarte ? !!parseInt(parsed.coverALaCarte, 10) : undefined,
      onlyIllust: parsed.onlyIllust ? !!parseInt(parsed.onlyIllust, 10) : undefined,
      onlyBeasts: parsed.onlyBeasts ? !!parseInt(parsed.onlyBeasts, 10) : undefined,
      onlyBirds: parsed.onlyBirds ? !!parseInt(parsed.onlyBirds, 10) : undefined,
      count: parsed.count ? parseInt(parsed.count, 10) : undefined,
    })
  }
}
