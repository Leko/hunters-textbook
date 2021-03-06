// @flow

import type { TendencyRepository } from '../infra/TendencyRepository'
import { UseCase } from 'almin'
import { QuestionTendency } from '../domain'
import tendencyRepository from '../infra/TendencyRepository'
import { CONFIGURE_TENDENCY } from '../const/actions'

type Fields = coverIdentify | coverALaCarte | onlyIllust | onlyBeasts | onlyBirds;

export class ConfigureTendencyUseCaseFactory {
  static create () : ConfigureTendencyUseCase {
    return new ConfigureTendencyUseCase({ tendencyRepository })
  }
}

export default class ConfigureTendencyUseCase extends UseCase {
  constructor ({ tendencyRepository }: { tendencyRepository: TendencyRepository }) {
    super()
    this.tendencyRepository = tendencyRepository
  }

  async execute (field: Fields, value: any) {
    const type = CONFIGURE_TENDENCY
    const changes = { [field]: value }
    const newTendency = new QuestionTendency(changes)

    await this.tendencyRepository.save(newTendency)
    this.dispatch({ type, changes })
  }
}
