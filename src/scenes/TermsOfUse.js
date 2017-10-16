// @flow

import React, { PureComponent } from 'react'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'

export default class TermsOfUse extends PureComponent {
  render () {
    return (
      <Card>
        <CardContent>
          <Typography type='subheading'>
            利用規約
          </Typography>
        </CardContent>
      </Card>
    )
  }
}
