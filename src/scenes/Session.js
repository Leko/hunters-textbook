// @flow

import React, { PureComponent } from 'react'
import { RestoreSessionFromQueryUseCaseFactory } from '../usecase/RestoreSessionFromQuery'

export default class Session extends PureComponent {
  componentWillMount () {
    const context = this.props.appContext
    const useCase = RestoreSessionFromQueryUseCaseFactory.create()
    context.useCase(useCase).execute(this.props.match.params.year, this.props.location.search)
  }

  // part変わったときに反応してしまう
  // componentDidUpdate (prevProps) {
  //   console.log('componentDidUpdate:', this.props, prevProps)
  // }

  render () {
    return <div></div>
  }
}
