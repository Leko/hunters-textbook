// @flow

import React, { PureComponent } from 'react'
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
          <div className='AppHeader__title'>
            Title
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}
