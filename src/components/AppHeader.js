// @flow

import React, { PureComponent } from 'react'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import '../styles/AppHeader.css'

export default class AppHeader extends PureComponent {
  render () {
    return (
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton color='contrast' aria-label='Menu' onClick={this.props.onRequestSideBar}>
            <MenuIcon />
          </IconButton>
          <Typography type='title' color='inherit' className='AppHeader__title'>
            ポケット狩猟読本
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}
