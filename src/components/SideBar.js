// @flow

import React, { PureComponent } from 'react'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import HistoryIcon from 'material-ui-icons/History'
import FormatListNumberedIcon from 'material-ui-icons/FormatListNumbered'
import FeedbackIcon from 'material-ui-icons/Feedback'
import CopyrightIcon from 'material-ui-icons/Copyright'

export default class SideBar extends PureComponent {
  render () {
    return (
      <Drawer
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <List disablePadding>
          <ListItem button>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Missed" />
          </ListItem>
        </List>
        <Divider />
        <List disablePadding>
          <ListItem button>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Terms of service" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CopyrightIcon />
            </ListItemIcon>
            <ListItemText primary="Credit" />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}
