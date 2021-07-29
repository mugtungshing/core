/**
 * 黄历词典。
 * @public
 *
 * @example
 * ```json
 * {
 *   "directions": ["东", "东南", "南", "西南", "西", "西北", "北", "东北"],
 *   "slots": ["P1", "P2"],
 *   "activities": [
 *     {
 *       "action": "收歌",
 *       "positive": [
 *         "又有资本可以炫耀了。",
 *         "排行榜第一就在下一次！",
 *         "攻克卡住多时的难点。",
 *         "手感爆棚，曲曲理论值。"
 *       ],
 *       "negative": [
 *         "快要收歌的时候会来一通无关紧要的电话。",
 *         "会在最后关头卡帧掉 note。",
 *         "延迟漂移个个 Good，曲曲延迟各不同。",
 *         "看见这个 note 了吗？你 接 不 住。"
 *       ]
 *     },
 *     {
 *       "action": "炫耀成绩",
 *       "positive": [
 *         "获得万众敬仰，收割万人膝盖。",
 *         "一曲成名，万人膜拜。",
 *         "本群都是你的小弟啦！"
 *       ],
 *       "negative": ["警察叔叔，对，就是这个杀人犯。", "容易被群友拉黑或报复。"]
 *     },
 *     {
 *       "action": "复读",
 *       "positive": ["有时候，人云亦云也是一种生存方式。"],
 *       "negative": ["你的对手是鸽子。"]
 *     },
 *     {
 *       "action": "肝爆",
 *       "positive": [
 *         "说不定下一盘就创纪录了呢。",
 *         "大力出奇迹。",
 *         "努力使人进步，肝爆让人快乐。",
 *         "限时梯子爬完了吗？"
 *       ],
 *       "negative": [
 *         "会因为腱鞘炎而进医院。",
 *         "屏幕会碎掉的。",
 *         "醒醒，限时活动没了。"
 *       ]
 *     }
 *   ],
 *   "daily": ["Cytus", "Cytus II", "Deemo", "VOEZ", "喵赛克", "Arcaea", "maimai"]
 * }
 * ```
 */
export interface IDict {
  /**
   * 移动端音游朝向
   * @example ['东', '东南', '南', '西南', '西', '西北', '北', '东北']
   * @example ['头朝下']
   */
  directions: string[]
  /**
   * 街机音游黄金位
   * @example ['1P', '2P']
   * @example ['维修位']
   */
  slots: string[]
  /**
   * 今日运势
   * @example
   * ```json
   * [
   *   {
   *     "action": "收歌",
   *     "positive": [
   *       "又有资本可以炫耀了。",
   *       "排行榜第一就在下一次！",
   *       "攻克卡住多时的难点。",
   *       "手感爆棚，曲曲理论值。"
   *     ],
   *     "negative": [
   *       "快要收歌的时候会来一通无关紧要的电话。",
   *       "会在最后关头卡帧掉 note。",
   *       "延迟漂移个个 Good，曲曲延迟各不同。",
   *       "看见这个 note 了吗？你 接 不 住。"
   *     ]
   *   },
   *   {
   *     "action": "炫耀成绩",
   *     "positive": [
   *       "获得万众敬仰，收割万人膝盖。",
   *       "一曲成名，万人膜拜。",
   *       "本群都是你的小弟啦！"
   *     ],
   *     "negative": ["警察叔叔，对，就是这个杀人犯。", "容易被群友拉黑或报复。"]
   *   }
   * ]
   * ```
   */
  activities: Array<{
    /**
     * 动作。
     * @example "收歌"
     */
    action: string
    /**
     * 宜
     * @example
     * ```json
     * [
     *   "又有资本可以炫耀了。",
     *   "排行榜第一就在下一次！",
     *   "攻克卡住多时的难点。",
     *   "手感爆棚，曲曲理论值。"
     * ]
     * ```
     */
    positive: string[]
    /**
     * 忌
     * @example
     * ```json
     * [
     *   '快要收歌的时候会来一通无关紧要的电话。',
     *   '会在最后关头卡帧掉 note。',
     *   '延迟漂移个个 Good，曲曲延迟各不同。',
     *   '看见这个 note 了吗？你 接 不 住。'
     * ]
     * ```
     */
    negative: string[]
  }>
  /**
   * 今日音游
   *
   * @example
   * ```json
   * ["Cytus", "Cytus II", "Deemo", "VOEZ", "喵赛克", "Arcaea", "maimai"]
   * ```
   */
  daily: string[]
}

export { directions, slots, activities, daily } from './dict.json'
