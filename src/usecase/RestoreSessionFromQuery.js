// @flow

import type { QuestionRepository } from '../infra/QuestionRepository'
import { UseCase } from 'almin'
import { QuestionTendencyFactory } from '../domain'
import Examiner from '../service/Examiner'
import questionRepository from '../infra/QuestionRepository'
import spreadSheetRepository from '../infra/SpreadSheetRepository'
import { RESTORE_SESSION_FROM_QUERY } from '../const/actions'

export class RestoreSessionFromQueryUseCaseFactory {
  static create () : RestoreSessionFromQueryUseCase {
    return new RestoreSessionFromQueryUseCase({
      questionRepository,
      spreadSheetRepository,
    })
  }
}

export default class RestoreSessionFromQueryUseCase extends UseCase {
  constructor ({ questionRepository, spreadSheetRepository }: {
    questionRepository: QuestionRepository,
    spreadSheetRepository: SpreadSheetRepository,
  }) {
    super()
    this.questionRepository = questionRepository
    this.spreadSheetRepository = spreadSheetRepository
  }

  async execute (year, queryString) {
    const type = RESTORE_SESSION_FROM_QUERY
    const tendency = QuestionTendencyFactory.fromQueryString(queryString)
    const spreadSheet = await this.spreadSheetRepository.getByYear(year)
    const questions = await Examiner.createQuestions(spreadSheet, tendency)
    this.dispatch({ type, questions })
  }
}
