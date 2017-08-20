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
// import Card, { CardActions, CardHeader, CardContent, CardMedia } from 'material-ui/Card'
// import List, {
//   ListItem,
//   ListItemAvatar,
//   ListItemIcon,
//   ListItemSecondaryAction,
//   ListItemText,
// } from 'material-ui/List'
// import Button from 'material-ui/Button'
// import Grid from 'material-ui/Grid'
// import logo from './logo.svg'
import './App.css'

type State = {
  openSideBar: boolean
}

class App extends PureComponent<void, void, State> {
  state: State = {
    openSideBar: false
  }

  handleOpenSideBar = () => {
    this.setState({ openSideBar: true })
  }
  handleCloseSideBar = () => {
    this.setState({ openSideBar: false })
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

          <Route exact path='/' component={OnBoarding} />
          <Route path='/session/:part' component={Session} />
          <Route path='/q/:year/:category/:animal/:field' component={Question} />
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
