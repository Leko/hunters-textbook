// @flow

import type { Context } from 'almin'
import React, { PureComponent } from 'react'
import Spinner from 'react-spinkit'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {
  Analytics,
  AppHeader,
  SideBar,
} from './components'
import {
  OnBoarding,
  Session,
  Question,
  TermsOfUse,
} from './scenes'
import './App.css'

type Props = {
  appContext: Context,
}

type State = {
  openSideBar: boolean
}

class App extends PureComponent<void, void, State> {
  unSubscribeHistory: Function
  unSubscribeAlmin: Function

  constructor (props: Props) {
    super(props)
    this.state = Object.assign(props.appContext.getState(), {
      openSideBar: false
    })
  }

  componentDidCatch (error, info) {
    console.log(error, info)
  }

  componentWillMount () {
    const context = this.props.appContext
    const handleChange = () => {
      this.setState(context.getState())
    }
    this.unSubscribeAlmin = context.onChange(handleChange)
  }

  componentWillUnmount () {
    if (typeof this.unSubscribeAlmin === 'function') {
      this.unSubscribeAlmin()
    }
  }

  handleOpenSideBar = () => {
    this.setState({ openSideBar: true })
  }

  handleCloseSideBar = () => {
    this.setState({ openSideBar: false })
  }

  wrap = (ComponentClass) => (props) => {
    return (
      <ComponentClass
        appContext={this.props.appContext}
        {...props}
        {...this.state}
      />
    )
  }

  render() {
    return (
      <Router>
        <div className='root'>
          {this.state.uiState.busy
            ? (
              <div className='loading loading__overlay loading--loading'>
                <Spinner name='line-scale-pulse-out-rapid' />
              </div>
            )
            : null}
          <Route path='/' component={Analytics} />
          <AppHeader
            onRequestSideBar={this.handleOpenSideBar}
          />
          <SideBar
            open={this.state.openSideBar}
            onRequestClose={this.handleCloseSideBar}
          />

          <div className='container'>
            <Switch>
              <Route
                exact
                path='/terms-of-use'
                render={this.wrap(TermsOfUse)}
              />
              <Route
                exact
                path='/:year'
                render={this.wrap(OnBoarding)}
              />
              <Route
                exact
                path='/:year/session'
                render={this.wrap(Session)}
              />
              <Route
                exact
                path='/:year/q/:category/:animal/:field'
                render={this.wrap(Question)}
              />
              <Route render={() => (
                <Redirect exact to={`/${new Date().getFullYear()}`}/>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
