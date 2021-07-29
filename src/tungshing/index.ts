import random from 'random'
import seedrandom from 'seedrandom'
import ow from 'ow'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import * as dict from './dict'
import { IDict } from './dict'

dayjs.extend(utc)
dayjs.extend(timezone)

interface FixedLengthArray<T extends any, L extends number> extends Array<T> {
  0: T
  length: L
}

export interface ITungshing {
  direction: string
  slot: string
  activity: FixedLengthArray<{ action: string, reason: string }, 2>
  daily: string
}

/**
 * 生成今日音游黄历数据。
 * @public
 * @param seed - 伪随机数种子。
 * **需要对每个用户独立唯一，且无法通过用户 ID 推出。**
 *
 * Telegram 示例:
 * ```ts
 * const seed = `${id}$${BOT_TOKEN}`
 * ```
 * @param date - 今日日期。
 * @param tz - 用于计算每日开始时间的时区。
 * @param dic - 黄历字典。{@link IDict}
 * @returns 每日黄历的数据。
 *
 * @example
 * ```ts
 * const date = new Date()
 * const result = tungshing(`${id}$${BOT_TOKEN}`, date)
 * console.log(`
 * 今天是${date.toLocaleDateString('zh-CN', { dateStyle: 'full', timeZone: 'Asia/Shanghai' })}
 * 农历${date.toLocaleDateString('ja-JP-u-ca-chinese-nu-hanidec', { timeZone: 'Asia/Shanghai' })}
 *
 *
 * 黄历姬掐指一算，您今天：
 * 宜${result.activity[0].action}：${result.activity[0].reason}
 * 忌${result.activity[1].action}：${result.activity[1].reason}
 *
 * 黄历姬为您推荐：
 * 今日音游：${result.daily}
 * 打手机或平板音游最佳朝向：${result.direction}
 * 街机音游黄金位：${result.slot}
 * `)
 * ```
 */
export function tungshing (
  seed: string,
  date: Date = new Date(),
  tz: string = 'Asia/Shanghai',
  dic: IDict = dict
): ITungshing {
  ow(seed, ow.string)

  const day = dayjs(date).diff(dayjs('1970-01-01', tz), 'day')
  const rng = random.clone(seedrandom(`${seed}$${day}`))

  const actions: number[] = []
  actions[0] = rng.int(0, dic.activities.length - 1)

  if (rng.float() <= 0.000_000_1) { // 随机抽取一位幸运小朋友使宜忌相同
    actions[1] = actions[0]
  } else {
    const dedup = [...dic.activities]
    dedup.splice(actions[0], 1)

    actions[1] = dic.activities.indexOf(dedup[rng.int(0, dedup.length - 1)])
  }

  const reasons: number[] = []
  reasons[0] = rng.int(0, dic.activities[actions[0]].positive.length - 1)
  reasons[1] = rng.int(0, dic.activities[actions[1]].negative.length - 1)

  return {
    direction: dic.directions[rng.int(0, dic.directions.length - 1)],
    slot: dic.slots[rng.int(0, dic.slots.length - 1)],
    activity: [
      {
        action: dic.activities[actions[0]].action,
        reason: dic.activities[actions[0]].positive[reasons[0]]
      },
      {
        action: dic.activities[actions[1]].action,
        reason: dic.activities[actions[1]].negative[reasons[1]]
      }
    ],
    daily: dic.daily[rng.int(0, dic.daily.length - 1)]
  }
}