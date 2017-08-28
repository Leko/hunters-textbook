// @flow

import React, { PureComponent } from 'react'
import ReactGA from 'react-ga'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import List, { ListItem, ListItemText } from 'material-ui/List'
import '../styles/Question.css'

const prefixes = 'アイウ'.split('')

export default class Question extends PureComponent {
  handleClickAnswer = (index) => () => {
    this.props.onAnswer(index)
  }

  handleClickCopyright = (url) => () => {
    ReactGA.outboundLink({
      label: url,
    }, () => {
      window.open(url, '_blank')
    })
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
                    <Button
                      dense
                      color='inherit'
                      onClick={this.handleClickCopyright(image[0])}
                    >
                      <Typography type='caption'>
                        Photo {image[2] || new URL(image[0]).host}
                      </Typography>
                    </Button>
                  </CardContent>
                </div>
              )
              : null}
            <CardContent>
              <Typography>
                {sentence}
              </Typography>
            </CardContent>
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
