// @flow

import React, { PureComponent } from 'react'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Radio from 'material-ui/Radio'
import { FormLabel, FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import { COUNT_STEPS } from '../store/Tendency/TendencyState'
import { ConfigureTendencyUseCaseFactory } from '../usecase/ConfigureTendency'

export default class OnBoarding extends PureComponent {
  handleChangeCount = (count) => () => {
    this.handleChanges('count', count)
  }

  handleChangeField = (field) => () => {
    const currentTendency = this.props.tendencyState.tendency
    this.handleChanges(field, !currentTendency[field])
  }

  async handleChanges (key, value) {
    const context = this.props.appContext
    const useCase = ConfigureTendencyUseCaseFactory.create()
    context.useCase(useCase).execute(key, value)
  }

  handleComplete = () => {
    const tendency = this.props.tendencyState.tendency.toJSON()
    const searchParams = new URLSearchParams()
    for (let prop in tendency) {
      let value = tendency[prop]
      if (typeof tendency[prop] === 'boolean') {
        value = tendency[prop] ? 1 : 0
      }
      searchParams.append(prop, value)
    }

    this.props.history.push({
      pathname: `/session`,
      search: `?${searchParams.toString()}`,
    })
  }

  render () {
    const tendency = this.props.tendencyState.tendency

    return (
      <Card>
        <CardContent>
          <Typography type='subheading'>
            平成29年度 問題集
          </Typography>
          <Typography>
            狩猟免許試験の勉強にもよし、免許を取った後狩猟に備えて知識を付けるもよし。規律を守って正しい狩猟を。
          </Typography>

          <FormLabel component='legend'>出題する範囲</FormLabel>
          <FormControlLabel
            label='鳥獣の判別'
            onChange={this.handleChangeField('coverIdentify')}
            control={<Switch checked={tendency.coverIdentify} />}
          /><br/>
          <FormControlLabel
            label='鳥獣のアラカルト（生息環境、食性など）'
            onChange={this.handleChangeField('coverALaCarte')}
            control={<Switch checked={tendency.coverALaCarte} />}
          /><br/>

          <FormLabel component='legend'>出題オプション</FormLabel>
          <FormControlLabel
            label='獣類のみ出題する'
            onChange={this.handleChangeField('onlyIllust')}
            control={<Switch checked={tendency.onlyIllust} />}
          /><br/>
          <FormControlLabel
            label='鳥類のみ出題する'
            onChange={this.handleChangeField('onlyBeasts')}
            control={<Switch checked={tendency.onlyBeasts} />}
          /><br/>
          <FormControlLabel
            label='イラストのみ出題する'
            onChange={this.handleChangeField('onlyBirds')}
            control={<Switch checked={tendency.onlyBirds} />}
          /><br/>

          <FormLabel component='legend'>出題数</FormLabel>
          {COUNT_STEPS.map(count => (
            <FormControlLabel
              key={count}
              label={`${count}問`}
              onChange={this.handleChangeCount(count)}
              control={
                <Radio
                  checked={count === tendency.count}
                  value={String(count)}
                  aria-label={count}
                />
              }
            />
          ))}
        </CardContent>
        <CardActions>
          <Button onClick={this.handleComplete} raised color='primary'>GO!!!</Button>
        </CardActions>
      </Card>
    )
  }
}
