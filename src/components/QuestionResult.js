// @flow

import React, { PureComponent } from 'react'
import IconClose from 'material-ui-icons/Close'
import IconCheck from 'material-ui-icons/Check'
import List, { ListItem, ListItemIcon, ListItemAvatar, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'

export default class QuestionResult extends PureComponent {
  render () {
    const { question } = this.props
    const IconComponent = question.correct ? IconCheck : IconClose

    return (
      <List className='Session__score__question'>
        <ListItem button>
          <ListItemIcon>
            <IconComponent
              className={`${question.correct ? 'Session__feedback__icon--correct' : 'Session__feedback__icon--wrong'}`}
            />
          </ListItemIcon>
          <ListItemText
            primary={question.sentence}
            secondary={`正解：${question.getAnswer()}`}
          />
          {question.image
            ? (
              <ListItemAvatar>
                <Avatar src={question.image[1]} classes={{ img: 'Session__score__avatar' }} />
              </ListItemAvatar>
            )
            : null}
        </ListItem>
        <Divider />
      </List>
    )
  }
}
