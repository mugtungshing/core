import * as uuid_ from 'uuid'
import random from 'random'
import seedrandom from 'seedrandom'
import ow from 'ow'

/**
 * 为识别码添加分隔符。
 * @param id - 要分割的识别码。
 * @param delimiter - 分隔符。也可以是 `·` 等。
 * @returns - 分割后的识别码。
 * @privateRemarks
 */
function pad (id: string[], delimiter = '-'): string[] {
  const id_ = [...id] // deep clone
  id_.splice(/* 8 + !4 + !4 + !4 + !12 + (0) = */ 8, 0, delimiter)
  id_.splice(/* 8 +  4 + !4 + !4 + !12 + (1) = */ 13, 0, delimiter)
  id_.splice(/* 8 +  4 +  4 +  4 + !12 + (2) = */ 18, 0, delimiter)
  id_.splice(/* 8 +  4 +  4 +  4 +  12 + (3) = */ 23, 0, delimiter)
  return id_
}

const baguaMap = ['天', '地', '水', '火', '雷', '风', '山', '泽', '乾', '坤', '坎', '离', '震', '巽', '艮', '兑'] as const
type BaguaId = Array<typeof baguaMap[number]>

type UUID = ArrayLike<number>

/**
 * 将**内部**八卦识别码 转换为**内部** UUID 识别码。
 * 一般用户请见 {@link Identifier.toString}
 * @param bagua - 八卦识别码。
 * @returns UUID 识别码。
 * @privateRemarks
 */
function baguaToUUID (bagua: BaguaId): UUID {
  return uuid_.parse(pad(bagua.map(x => baguaMap.indexOf(x).toString(16))).join(''))
}

/**
 * 将**内部** UUID 识别码 转换为**内部**八卦识别码。
 * 一般用户请见 {@link Identifier.toString}
 * @param id - UUID 识别码。
 * @returns 八卦识别码。
 * @privateRemarks
 */
function uuidToBagua (id: UUID): BaguaId {
  // eslint-disable-next-line unicorn/prefer-spread
  return Array.from(id)
    .flatMap(v => v
      .toString(16)
      .padStart(2, '0')
      .split('')
    )
    .map(x => baguaMap[Number.parseInt(x, 16)])
}

/**
 * 创建黄历统一标识码。
 * 避免了随机数种子与用户直接交互。
 * @param str - 已有 UUID / 黄历码 / 或从伪随机数种子生成一个统一标识码。
 * 当作为伪随机数种子时需要大于 5 位字符。
 * **需要对每个用户独立唯一，且无法通过用户 ID 推出。**
 * Telegram 示例:
 * ```ts
 * new Identifier(`${id}$${BOT_TOKEN}`)
 * ```
 * @returns 黄历统一标识码。
 */
export class Identifier {
  readonly bagua: BaguaId
  readonly uuid: UUID

  constructor (string_: string) {
    // eslint-disable-next-line unicorn/better-regex
    const baguaRegExp = /^[乾兑地坎坤天山巽水泽火离艮雷震风]{8}·[乾兑地坎坤天山巽水泽火离艮雷震风]{4}·[乾兑地坎坤天山巽水泽火离艮雷震风]{4}·[乾兑地坎坤天山巽水泽火离艮雷震风]{4}·[乾兑地坎坤天山巽水泽火离艮雷震风]{12}$/

    if (uuid_.validate(string_)) { // valid UUID?
      this.uuid = uuid_.parse(string_)
      this.bagua = uuidToBagua(this.uuid)
    } else if (baguaRegExp.test(string_)) { // valid baguaId?
      this.bagua =
        string_
          .replace(/·/g, '')
          .split('') as BaguaId
      this.uuid = baguaToUUID(this.bagua)
    } else {
      ow(string_, ow.string.minLength(5))
      const rng = random.clone(seedrandom.alea(string_))
      this.uuid = uuid_.parse(
        uuid_.v4({
          random: Array.from({ length: 32 }).fill('').map(
            () => rng.int(0, 15)
          )
        })
      )
      this.bagua = uuidToBagua(this.uuid)
    }
  }

  toString (style: 'uuid' | 'bagua' = 'uuid'): string {
    return style === 'uuid' ? uuid_.stringify(this.uuid) : pad(uuidToBagua(this.uuid), '·').join('')
  }
}
