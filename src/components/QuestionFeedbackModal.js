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

export default class QuestionFeedbackModal extends PureComponent {
  render () {
    const IconComponent = this.props.question.correct ? IconCheck : IconClose

    return (
      <Dialog
        ignoreBackdropClick
        ignoreEscapeKeyUp
        maxWidth='xs'
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        onExited={this.props.onHide}
        classes={{
          paper: 'Session__modal',
        }}
      >
        <DialogTitle classes={{ root: 'Session__modal__title' }}>
          <IconComponent
            className={`Session__modal__icon ${this.props.question.correct ? 'Session__modal__icon--correct' : 'Session__modal__icon--wrong'}`}
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
          <Button onClick={this.props.onRequestClose} color='primary'>
            次の問題へ
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
