// @flow

import type { SpreadSheet, Sheet, QuestionTendency } from '../domain'
import { Set } from 'immutable'
import sampleSize from 'lodash/sampleSize'
import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'
import shuffle from 'lodash/shuffle'
import findIndex from 'lodash/findIndex'
import { Question, Choice } from '../domain'

type Wildlife = {};

export default class Examiner {
  // FIXME: 汎用化
  static parseWildlifeSheetCells (wildlifeSheet: Sheet) : Set<Wildlife> {
    const parseOrNot = (cell, parser) => cell.isNA() ? null : parser(cell)
    const valueOrNot = (cell) => parseOrNot(cell, c => c.getValue())
    const intOrNot = (cell) => parseOrNot(cell, c => parseInt(c.getValue(), 10))
    const boolOrNot = (cell) => parseOrNot(cell, c => c.isYes())
    const listOrNot = (cell) => parseOrNot(cell, c => c.getValue().split('\n').filter(t => !!t.trim()))
    const listPipedOrNot = (cell) => parseOrNot(cell, c => c.getValue().split('\n').filter(t => !!t.trim()).map(t => t.split('|')))

    const toAnimal = (row) : Wildlife => {
      const [
        id,
        name,
        illustUrls,
        photoUrls,
        canHunt,
        isBeast,
        isBird,
        allowHuntPerDay,
        isTrogloxene,
        overallLength,
        migrate,
        seaOrLand,
        feedingHabit,
        habitatEnvironment,
        distribution,
        nesting,
        natureOfTime,
        marriageStyle,
        isHibernate,
        footprint,
        prohibites,
        eclipse,
        similarIds,
      ] = row

      return {
        id:                 valueOrNot(id),                 // ID
        name:               valueOrNot(name),               // 名前
        illustUrls:         listPipedOrNot(illustUrls),     // イラストURL
        photoUrls:          listPipedOrNot(photoUrls),      // 画像URL
        canHunt:            boolOrNot(canHunt),             // 狩猟鳥獣?
        isBeast:            boolOrNot(isBeast),             // 獣？
        isBird:             boolOrNot(isBird),              // 鳥？
        allowHuntPerDay:    valueOrNot(allowHuntPerDay),    // 捕獲数制限
        isTrogloxene:       boolOrNot(isTrogloxene),        // 外来生物?
        overallLength:      intOrNot(overallLength),        // 全長
        migrate:            valueOrNot(migrate),            // 渡りの習性
        seaOrLand:          valueOrNot(seaOrLand),          // 海/陸
        feedingHabit:       valueOrNot(feedingHabit),       // 食性
        habitatEnvironment: valueOrNot(habitatEnvironment), // 生息環境
        distribution:       valueOrNot(distribution),       // 分布
        nesting:            valueOrNot(nesting),            // 営巣場所
        natureOfTime:       valueOrNot(natureOfTime),       // 時間帯
        marriageStyle:      valueOrNot(marriageStyle),      // 配偶様式
        isHibernate:        boolOrNot(isHibernate),         // 冬眠?
        footprint:          listOrNot(footprint),           // 足跡URL
        prohibites:         valueOrNot(prohibites),         // 禁止猟法
        eclipse:            boolOrNot(eclipse),             // エクリプス?
        similarIds:         listOrNot(similarIds),          // 似ている鳥獣ID
      }
    }

    return wildlifeSheet.rows.map(toAnimal).slice(1)
  }

  static getChoices (wildlifes, choiceField, answer) {
    const answerTargets = wildlifes
      .filter(wildlife => {
        if (wildlife[choiceField] === null) {
          return false
        }
        if (wildlife.id === answer.id) {
          return false
        }
        // 答えと同じ値を持つものは除外する
        if (wildlife[choiceField] === answer[choiceField]) {
          return false
        }
        return true
      })
      .map(wildlife => wildlife[choiceField])
      .filter(choice => !!choice)

    const choices = sampleSize(uniq(answerTargets), 2)
      .concat([answer[choiceField]])
      .map(text => new Choice({ text }))

    return shuffle(choices)
  }

  static getChoicesAndAnswer (wildlifes, choiceField, answer) : Array<Set<Choice>, number> {
    const choices = this.getChoices(wildlifes, choiceField, answer)
    return [choices, findIndex(choices, c => c.text === answer[choiceField])]
  }

  static toQuestion (sentence: string, wildlifes: Array<Wildlife>, choiceField: string, answer: Wildlife) {
    const [choices, answerIndex] = this.getChoicesAndAnswer(wildlifes, choiceField, answer)
    return new Question({ sentence, choices, answer: answerIndex })
  }

  static async createQuestions (spreadSheet: SpreadSheet, tendency: QuestionTendency) : Set<Question> {
    const wildlifes = this.parseWildlifeSheetCells(spreadSheet.wildlife)
      .filter((wildlife: Wildlife) => {
        if (tendency.onlyBeasts && !wildlife.isBeast) {
          return false
        }
        if (tendency.onlyBirds && !wildlife.isBird) {
          return false
        }
        return true
      })

    const illustFields = ['illustUrls']
    const identifyFields = illustFields.concat(['photoUrls'])
    const questionSeeds = wildlifes
      .map((wildlife: Wildlife, i: number, wildlifes: Array<Wildlife>) => {
        // 問題の種一覧へ変化させる
        return Object.entries(wildlife)
          .filter(([field, value]) => {
            if (!value
              || (tendency.onlyIllust && !illustFields.includes(field))
              || (!tendency.coverIdentify && identifyFields.includes(field))
              || (!tendency.coverALaCarte && !identifyFields.includes(field))
            ) {
              return false
            }

            return true
          })
          .map(([field, value]) => ({ wildlife, field, value }))
      })

    const questions = sampleSize(flatten(questionSeeds), tendency.count)
      .map(({ wildlife, field, value }: { wildlife: Wildlife, field: string, value: any }) => {
        switch (field) {
          case 'illustUrls': // イラストURL
          case 'photoUrls': // 画像URL
            return value.map(url => {
              const [choices, answer] = this.getChoicesAndAnswer(wildlifes, 'name', wildlife)
              return new Question({
                choices, answer, image: url, sentence: 'この動物の名前は？',
              })
            })
          case 'canHunt': // 狩猟鳥獣?
            return [
              this.toQuestion(
                `これらのうち${value ? '' : '非'}狩猟鳥獣なのは？`,
                wildlifes.filter(w => w.canHunt !== wildlife.canHunt),
                'name',
                wildlife),
            ]
          case 'allowHuntPerDay': // 捕獲数制限
            return [
              this.toQuestion(
                `${wildlife.name}の一日あたりの捕獲数の制限は？`,
                wildlifes.filter(w => w.allowHuntPerDay !== wildlife.allowHuntPerDay),
                'allowHuntPerDay',
                wildlife),
            ]
          case 'isTrogloxene': // 外来生物?
            return [
              this.toQuestion(
                `これらのうち特定外来生物なのは？`,
                wildlifes.filter(w => w.isTrogloxene !== wildlife.isTrogloxene),
                'isTrogloxene',
                wildlife),
            ]
          case 'overallLength': // 全長
            return []
          case 'migrate': // 渡りの習性
            return [
              this.toQuestion(
                `これらのうち${value}なのは？`,
                wildlifes.filter(w => w.migrate !== wildlife.migrate),
                'name',
                wildlife),
            ]
          case 'seaOrLand': // 海/陸
            return [
              this.toQuestion(
                `これらのうち${value}なのは？`,
                wildlifes.filter(w => w.seaOrLand !== wildlife.seaOrLand),
                'name',
                wildlife),
            ]
          case 'feedingHabit': // 食性
            return [
              this.toQuestion(
                `${wildlife.name}はどれ？`,
                wildlifes.filter(w => w.feedingHabit !== wildlife.feedingHabit),
                'feedingHabit',
                wildlife),
            ]
          case 'habitatEnvironment': // 生息環境
            return [
              this.toQuestion(
                `${wildlife.name}の主な生息環境は？`,
                wildlifes.filter(w => w.habitatEnvironment !== wildlife.habitatEnvironment),
                'habitatEnvironment',
                wildlife),
            ]
          case 'distribution': // 分布
            return [
              this.toQuestion(
                `${wildlife.name}の主な分布は？`,
                wildlifes.filter(w => w.distribution !== wildlife.distribution),
                'distribution',
                wildlife),
            ]
          case 'nesting': // 営巣場所
            return [
              this.toQuestion(
                `${wildlife.name}の主な営巣場所は？`,
                wildlifes.filter(w => w.nesting !== wildlife.nesting),
                'nesting',
                wildlife),
            ]
          case 'natureOfTime': // 時間帯
            return [
              this.toQuestion(
                `${wildlife.name}はどれ？`,
                wildlifes.filter(w => w.natureOfTime !== wildlife.natureOfTime),
                'natureOfTime',
                wildlife),
            ]
          case 'marriageStyle': // 配偶様式
            return [
              this.toQuestion(
                `${wildlife.name}はどれ？`,
                wildlifes.filter(w => w.marriageStyle !== wildlife.marriageStyle),
                'marriageStyle',
                wildlife),
            ]
          case 'isHibernate': // 冬眠?
            return []
          case 'footprint': // 足跡URL
            return []
          case 'prohibites': // 禁止猟法
            return []
          case 'eclipse': // エクリプス?
            return []
          case 'id':
          case 'name':
          case 'isBeast':
          case 'isBird':
          case 'similarIds':
            return []
          default:
            throw new Error(`Unknown field: ${field}`)
        }
      })
      .reduce((acc, innerQuestions) => acc.concat(innerQuestions), [])

    return sampleSize(questions, tendency.count)
  }
}
