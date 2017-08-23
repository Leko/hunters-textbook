// @flow

import React, { PureComponent } from 'react'
import Grid from 'material-ui/Grid'
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card'
import List, { ListItem, ListItemText } from 'material-ui/List'
import '../styles/Question.css'

const prefixes = 'アイウ'.split('')

export default class Question extends PureComponent {
  handleClickAnswer = (index) => () => {
    this.props.onAnswer(index)
  }

  render () {
    const { image, sentence, choices } = this.props.question
    return (
      <Grid container justify='center'>
        <Grid item xs={12} sm={6}>
          <Card style={{ width: '100%' }}>
            {image
              ? (
                <div className='Question__header'>
                  <CardMedia image={image[1]} className='Question__header__media' />
                  <CardContent className='Question__header__media__copyright'>
                    <a href={image[0]}>{image[2] || new URL(image[0]).host}</a>
                  </CardContent>
                </div>
              )
              : null}
            <CardContent>{sentence}</CardContent>
            <List>
              {choices.map((choice, i) => (
                <ListItem key={choice.text} button dense onClick={this.handleClickAnswer(i)}>
                  <ListItemText primary={`${prefixes[i]}. ${choice.text}`} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    )
  }
}
