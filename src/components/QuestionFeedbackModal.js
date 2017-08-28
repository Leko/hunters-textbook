// @flow

import React, { PureComponent } from 'react'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import IconClose from 'material-ui-icons/Close'
import IconCheck from 'material-ui-icons/Check'
import Snackbar from 'material-ui/Snackbar'
import Slide from 'material-ui/transitions/Slide'
import IconButton from 'material-ui/IconButton'

export default class QuestionFeedbackModal extends PureComponent {
  state = {
    moreFeedback: false,
  }

  handleMoreFeedback = () => {
    this.setState({ moreFeedback: true })
  }

  handleHideMoreFeedback = () => {
    this.setState({ moreFeedback: false })
    this.props.onRequestClose()
  }

  render () {
    if (!this.props.question) {
      return null
    }

    const IconComponent = this.props.question.correct ? IconCheck : IconClose

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transition={<Slide direction='up' />}
          open={this.props.open}
          autoHideDuration={this.state.moreFeedback ? null : 3000}
          onRequestClose={this.handleHideMoreFeedback}
          onExited={this.props.onHide}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={(
            <div>
              <IconComponent
                className={[
                  'Session__feedback__icon',
                  this.props.question.correct ? 'Session__feedback__icon--correct' : 'Session__feedback__icon--wrong',
                ].join(' ')}
              />
              <span id='message-id' className='Session__feedback__summary'>
                {this.props.question.correct ? '正解' : '不正解'}
              </span>
            </div>
          )}
          action={[
            this.props.question.correct
              ? null
              : (
                <Button key='undo' color='accent' dense onClick={this.handleMoreFeedback}>
                  詳しく見る
                </Button>
              ),
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.props.onRequestClose}
            >
              <IconClose />
            </IconButton>,
          ]}
        />
        <Dialog
          ignoreBackdropClick
          ignoreEscapeKeyUp
          maxWidth='xs'
          open={this.state.moreFeedback}
          onBackdropClick={this.handleHideMoreFeedback}
          onRequestClose={this.handleHideMoreFeedback}
          classes={{
            paper: 'Session__modal',
          }}
        >
          <DialogTitle classes={{ root: 'Session__modal__title' }}>
            <IconComponent
              className={[
                'Session__feedback__icon',
                'Session__modal__icon',
                this.props.question.correct ? 'Session__feedback__icon--correct' : 'Session__feedback__icon--wrong',
              ].join(' ')}
            />
            <br/>
            {this.props.question.correct ? '正解' : '不正解'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              正解：{this.props.question.getAnswer()}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onBackdropClick} color='primary'>
              次の問題へ
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
