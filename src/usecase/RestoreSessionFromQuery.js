// @flow

import type { QuestionRepository } from '../infra/QuestionRepository'
import ReactGA from 'react-ga'
import { UseCase } from 'almin'
import { QuestionTendencyFactory } from '../domain'
import Examiner from '../service/Examiner'
import questionRepository from '../infra/QuestionRepository'
import spreadSheetRepository from '../infra/SpreadSheetRepository'
import { LOADING, LOADED, RESTORE_SESSION_FROM_QUERY } from '../const/actions'

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
    try {
      this.dispatch({ type: LOADING })
      const start = new Date()
      const type = RESTORE_SESSION_FROM_QUERY
      const tendency = QuestionTendencyFactory.fromQueryString(queryString)

      ReactGA.set(tendency.toJSON())

      const spreadSheet = await this.spreadSheetRepository.getByYear(year)
      const questions = await Examiner.createQuestions(spreadSheet, tendency)
      const spent = new Date() - start

      ReactGA.timing({
        category: RESTORE_SESSION_FROM_QUERY,
        variable: 'load',
        value: spent,
      })

      this.dispatch({ type, questions })
    } catch (e) {
      throw e
    } finally {
      this.dispatch({ type: LOADED })
    }
  }
}
