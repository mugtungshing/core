import { Tungshing, Identifier } from '.'
import { Dict } from './dict'

const dict: Dict = { // 固定词典
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

test('固定种子结果不变化', () => {
  const identifier = new Identifier('testseed')
  expect(new Tungshing(
    identifier,
    new Date(0),
    'UTC',
    dict
  ))
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    .toEqual({
      identifier,
      direction: '北',
      slot: 'P1',
      activity: [
        { action: '收歌', reason: '手感爆棚，曲曲理论值。' },
        { action: '肝爆', reason: '醒醒，限时活动没了。' }
      ],
      daily: 'Cytus II'
    } as Tungshing)
})

test('时区判断正常', () => {
  const identifier = new Identifier('testseed')
  expect(new Tungshing(
    identifier,
    new Date(1_627_564_586_994),
    'Asia/Shanghai',
    dict
  ))
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    .toEqual({
      identifier,
      direction: '西北',
      slot: 'P1',
      activity: [
        { action: '收歌', reason: '手感爆棚，曲曲理论值。' },
        { action: '炫耀成绩', reason: '容易被群友拉黑或报复。' }
      ],
      daily: 'VOEZ'
    } as Tungshing)
})

test('预设设定正常', () => {
  const identifier = new Identifier('testseed')
  expect(new Tungshing(
    identifier
  ))
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    .toBeInstanceOf(Tungshing)
})

test('能够抽取幸运小朋友', () => {
  const identifier = new Identifier('06060f05-0c01-4800-820d-0207000b0d04')
  expect(function () {
    const x = new Tungshing(
      identifier,
      new Date(1_627_564_586_994),
      undefined,
      dict
    )
    return x.activity[0].action === x.activity[1].action
  }())
    .toBe(true)
})
