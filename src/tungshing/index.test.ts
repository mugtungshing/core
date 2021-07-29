import { Tungshing, ITungshing } from '.'
import { IDict } from './dict'

const dict: IDict = { // 固定词典
  directions: ['东', '东南', '南', '西南', '西', '西北', '北', '东北'],
  slots: ['P1', 'P2'],
  activities: [
    {
      action: '收歌',
      positive: [
        '又有资本可以炫耀了。',
        '排行榜第一就在下一次！',
        '攻克卡住多时的难点。',
        '手感爆棚，曲曲理论值。'
      ],
      negative: [
        '快要收歌的时候会来一通无关紧要的电话。',
        '会在最后关头卡帧掉 note。',
        '延迟漂移个个 Good，曲曲延迟各不同。',
        '看见这个 note 了吗？你 接 不 住。'
      ]
    },
    {
      action: '炫耀成绩',
      positive: [
        '获得万众敬仰，收割万人膝盖。',
        '一曲成名，万人膜拜。',
        '本群都是你的小弟啦！'
      ],
      negative: ['警察叔叔，对，就是这个杀人犯。', '容易被群友拉黑或报复。']
    },
    {
      action: '复读',
      positive: ['有时候，人云亦云也是一种生存方式。'],
      negative: ['你的对手是鸽子。']
    },
    {
      action: '肝爆',
      positive: [
        '说不定下一盘就创纪录了呢。',
        '大力出奇迹。',
        '努力使人进步，肝爆让人快乐。',
        '限时梯子爬完了吗？'
      ],
      negative: [
        '会因为腱鞘炎而进医院。',
        '屏幕会碎掉的。',
        '醒醒，限时活动没了。'
      ]
    }
  ],
  daily: [
    'Cytus',
    'Cytus II',
    'Deemo',
    'VOEZ',
    '喵赛克',
    'Arcaea',
    'maimai'
  ]
}

test('固定种子随机发生器不变化', () => {
  expect(new Tungshing(
    'testseed',
    new Date(0),
    'UTC',
    dict
  ))
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    .toEqual({
      direction: '东南',
      slot: 'P1',
      activity: [
        { action: '收歌', reason: '排行榜第一就在下一次！' },
        { action: '复读', reason: '你的对手是鸽子。' }
      ],
      daily: 'Arcaea'
    } as ITungshing)
})

test('时区判断正常', () => {
  expect(new Tungshing(
    'testseed',
    new Date(1_627_564_586_994),
    'Asia/Shanghai',
    dict
  ))
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    .toEqual({
      direction: '北',
      slot: 'P2',
      activity: [
        { action: '炫耀成绩', reason: '获得万众敬仰，收割万人膝盖。' },
        { action: '收歌', reason: '看见这个 note 了吗？你 接 不 住。' }
      ],
      daily: 'Cytus II'
    } as ITungshing)
})

test('种子小于 5 位字符时报错', () => {
  expect(Tungshing).toThrow()
  expect(() => { return new Tungshing('') }).toThrow()
  expect(() => { return new Tungshing('seed') }).toThrow()
})
