// @flow

import React, { PureComponent } from 'react'
import ReactGA, { OutboundLink } from 'react-ga'
import Drawer from 'material-ui/Drawer'
import Avatar from 'material-ui/Avatar'
import { Link } from 'react-router-dom'
import List, { ListItem, ListItemIcon, ListItemAvatar, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import FeedbackIcon from 'material-ui-icons/Feedback'
import InfoOutlineIcon from 'material-ui-icons/InfoOutline'

export default class SideBar extends PureComponent {
  componentWillReceiveProps (nextProps) {
    if (nextProps.open && !this.props.open) {
      ReactGA.modalview('/sidebar')
    }
  }

  render () {
    return (
      <Drawer
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <List disablePadding>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={'/icons/ios.png'} />
            </ListItemAvatar>
            <ListItemText
              primary={'ポケット狩猟読本'}
            />
          </ListItem>
          <Divider />
          <ListItem button onClick={this.props.onRequestClose} component={Link} to="/2017">
            <ListItemText primary="2017(平成29)年度" />
          </ListItem>
        </List>
        <Divider />
        <List disablePadding>
          <ListItem
            button
            component={OutboundLink}
            to="https://hoge"
            eventLabel="feedback"
            target="_blank"
          >
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="フィードバック" />
          </ListItem>
          <ListItem button onClick={this.props.onRequestClose} component={Link} to="/terms-of-use">
            <ListItemIcon>
              <InfoOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="利用規約" />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}
