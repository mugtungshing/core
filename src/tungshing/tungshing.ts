import random from 'random'
import seedrandom from 'seedrandom'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Identifier } from './identifier'
import { dict as dict_ } from './dict'

dayjs.extend(utc)
dayjs.extend(timezone)

interface FixedLengthArray<T extends any, L extends number> extends Array<T> {
  0: T
  length: L
}

/**
 * 生成今日音游黄历数据。
 * @public
 * @param identifer - 黄历统一标识码。{@link Identifier}
 * @param date - 今日日期。
 * @param tz - 用于计算每日开始时间的时区。
 * @param dict - 黄历字典。{@link Dict}
 * @returns 每日黄历的数据。
 *
 * @example
 * ```ts
 * const date = new Date()
 * const result = new Tungshing(new Identifier(`${id}$${BOT_TOKEN}`), date)
 * console.log(`
 * 今天是${date.toLocaleDateString('zh-CN', { dateStyle: 'full', timeZone: 'Asia/Shanghai' })}
 * 农历${date.toLocaleDateString('ja-JP-u-ca-chinese-nu-hanidec', { timeZone: 'Asia/Shanghai' })}
 *
 *
 * 黄历姬掐指一算，您今天：
 * 宜 ${result.activity[0].action}：${result.activity[0].reason}
 * 忌 ${result.activity[1].action}：${result.activity[1].reason}
 *
 * 黄历姬为您推荐：
 * 今日音游：${result.daily}
 * 打手机或平板音游最佳朝向：${result.direction}
 * 街机音游黄金位：${result.slot}
 *
 * 黄历 ID：${result.identifier.toString('bagua')}
 * `)
 * ```
 */
export class Tungshing {
  public readonly identifier: Identifier
  /**
   * 移动端音游朝向
   * @example
   * ```ts
   * '东'
   * ```
   * @example
   * ```ts
   * '头朝下'
   * ```
   */
  public readonly direction: string

  /**
   * 街机音游黄金位
   * @example
   * ```ts
   * 'P1'
   * ```
   * @example
   * ```ts
   * '维修位'
   * ```
   */
  public readonly slot: string

  /**
   * 今日运势
   * @example
   * ```ts
   * [
   *   {
   *     action: '收歌',
   *     reason: '又有资本可以炫耀了。'
   *   },
   *   {
   *     action: '炫耀成绩',
   *     reason: '容易被群友拉黑或报复。'
   *   },
   * ]
   * ```
   */
  public readonly activity: FixedLengthArray<{ action: string, reason: string }, 2>

  /**
   * 今日音游
   * @example
   * ```ts
   * 'maimai'
   * ```
   */
  public readonly daily: string
  constructor (
    identifier: Identifier,
    date = new Date(),
    tz = 'Asia/Shanghai',
    dict = dict_
  ) {
    this.identifier = identifier
    const id = identifier.toString('uuid')

    const day = dayjs(date).diff(dayjs.tz('1970-01-01', tz), 'day')
    const rng = random.clone(seedrandom.alea(`${id}$${day}`))

    const actions: number[] = []
    actions[0] = rng.int(0, dict.activities.length - 1)

    if (rng.float() <= 0.000_000_1) { // 随机抽取一位幸运小朋友使宜忌相同
      actions[1] = actions[0]
    } else {
      const dedup = [...dict.activities]
      dedup.splice(actions[0], 1)

      actions[1] = dict.activities.indexOf(dedup[rng.int(0, dedup.length - 1)])
    }

    const reasons: number[] = []
    reasons[0] = rng.int(0, dict.activities[actions[0]].positive.length - 1)
    reasons[1] = rng.int(0, dict.activities[actions[1]].negative.length - 1)

    this.direction = dict.directions[rng.int(0, dict.directions.length - 1)]
    this.slot = dict.slots[rng.int(0, dict.slots.length - 1)]
    this.activity = [
      {
        action: dict.activities[actions[0]].action,
        reason: dict.activities[actions[0]].positive[reasons[0]]
      },
      {
        action: dict.activities[actions[1]].action,
        reason: dict.activities[actions[1]].negative[reasons[1]]
      }
    ]
    this.daily = dict.daily[rng.int(0, dict.daily.length - 1)]
  }
}
