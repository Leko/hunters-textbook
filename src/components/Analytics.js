// @flow

import React, { PureComponent } from 'react'
import ReactGA from 'react-ga'

export default class Analytics extends PureComponent {
  trackPage (location) {
    const url = location.pathname + location.search
    ReactGA.set({ page: url })
    ReactGA.pageview(url)
  }

  componentWillMount () {
    this.trackPage(this.props.location)
  }

  componentWillReceiveProps (nextProps) {
    const nextLocation = nextProps.location
    const location = this.props.location

    if (nextLocation.pathname !== location.pathname) {
      this.trackPage(nextLocation)
    }
  }

  render () {
    return null
  }
}
