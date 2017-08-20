// @flow

import type { Context } from 'almin'
import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
  AppHeader,
  SideBar,
} from './components'
import {
  OnBoarding,
  Session,
  Question,
} from './scenes'
import './App.css'

type Props = {
  appContext: Context,
}

type State = {
  openSideBar: boolean
}

class App extends PureComponent<void, void, State> {
  unSubscribe: Function

  constructor (props: Props) {
    super(props)
    this.state = Object.assign(props.appContext.getState(), {
      openSideBar: false
    })
  }

  componentWillMount () {
    const context = this.props.appContext
    const handleChange = () => {
      this.setState(context.getState())
    }
    this.unSubscribe = context.onChange(handleChange)
  }

  componentWillUnmount () {
    if (typeof this.unSubscribe === "function") {
      this.unSubscribe()
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
          <AppHeader
            onRequestSideBar={this.handleOpenSideBar}
          />
          <SideBar
            open={this.state.openSideBar}
            onRequestClose={this.handleCloseSideBar}
          />

          <div className="container">
            <Route
              exact
              path='/'
              render={this.wrap(OnBoarding)}
            />
            <Route
              path='/session'
              render={this.wrap(Session)}
            />
            <Route
              path='/q/:year/:category/:animal/:field'
              render={this.wrap(Question)}
            />
          </div>
        </div>
      </Router>
    )
  }
}

// <Grid container justify='center' className="App">
//   <Grid item xs={12} sm={6}>
//     <Card style={{ width: '100%' }}>
//       <CardHeader
//         subheader='平成29年度 > 判別'
//         style={{ paddingTop: 5, paddingBottom: 5 }}
//       />
//       <img src="http://www.chusankan.net/blog/jimu/archives/assets_c/2009/10/middle_1239343266[1]-thumb-300x264-1840.jpg" alt=""/>
//       <CardContent>
//         これは何
//       </CardContent>
//       <List>
//         <ListItem button dense>
//           <ListItemText primary="コジュケイ" />
//         </ListItem>
//         <ListItem button dense>
//           <ListItemText primary="ムクドリ" />
//         </ListItem>
//         <ListItem button dense>
//           <ListItemText primary="ヨシガモ" />
//         </ListItem>
//         <ListItem button dense>
//           <ListItemText primary="ヒクイナ" />
//         </ListItem>
//       </List>
//     </Card>
//   </Grid>
// </Grid>

export default App
