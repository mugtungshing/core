import { Identifier } from '.'

test('固定种子随机发生器不变化', () => {
  expect(new Identifier('testseed'))
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    .toEqual({
      uuid: new Uint8Array([
        11, 12, 6, 3, 1, 9,
        68, 2, 137, 10, 4, 11,
        7, 0, 4, 1
      ]),
      bagua: [
        '天', '离', '天', '震', '天',
        '山', '天', '火', '天', '地',
        '天', '坤', '雷', '雷', '天',
        '水', '乾', '坤', '天', '坎',
        '天', '雷', '天', '离', '天',
        '泽', '天', '天', '天', '雷',
        '天', '地'
      ]
    } as Identifier)
})

describe('解析器', () => {
  test('正常解析 UUID', () => {
    expect(new Identifier('ee45884a-4499-49a4-abd4-3bdb5d675bf5'))
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .toEqual({
        uuid: new Uint8Array([
          238, 69, 136, 74, 68,
          153, 73, 164, 171, 212,
          59, 219, 93, 103, 91,
          245
        ]),
        bagua: [
          '艮', '艮', '雷', '风', '乾',
          '乾', '雷', '坎', '雷', '雷',
          '坤', '坤', '雷', '坤', '坎',
          '雷', '坎', '离', '巽', '雷',
          '火', '离', '巽', '离', '风',
          '巽', '山', '泽', '风', '离',
          '兑', '风'
        ]
      } as Identifier)
  })

  test('正常解析黄历码', () => {
    expect(new Identifier('艮艮雷风乾乾雷坎·雷雷坤坤·雷坤坎雷·坎离巽雷·火离巽离风巽山泽风离兑风'))
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .toEqual({
        uuid: new Uint8Array([
          238, 69, 136, 74, 68,
          153, 73, 164, 171, 212,
          59, 219, 93, 103, 91,
          245
        ]),
        bagua: [
          '艮', '艮', '雷', '风', '乾',
          '乾', '雷', '坎', '雷', '雷',
          '坤', '坤', '雷', '坤', '坎',
          '雷', '坎', '离', '巽', '雷',
          '火', '离', '巽', '离', '风',
          '巽', '山', '泽', '风', '离',
          '兑', '风'
        ]
      } as Identifier)
  })
})

describe('转换器', () => {
  test('正常转换 UUID 到黄历码', () => {
    expect(new Identifier('ee45884a-4499-49a4-abd4-3bdb5d675bf5').toString('bagua'))
      .toEqual('艮艮雷风乾乾雷坎·雷雷坤坤·雷坤坎雷·坎离巽雷·火离巽离风巽山泽风离兑风')
  })

  test('正常转换黄历码到 UUID', () => {
    expect(new Identifier('艮艮雷风乾乾雷坎·雷雷坤坤·雷坤坎雷·坎离巽雷·火离巽离风巽山泽风离兑风').toString('uuid'))
      .toEqual('ee45884a-4499-49a4-abd4-3bdb5d675bf5')
    expect(new Identifier('艮艮雷风乾乾雷坎·雷雷坤坤·雷坤坎雷·坎离巽雷·火离巽离风巽山泽风离兑风').toString())
      .toEqual('ee45884a-4499-49a4-abd4-3bdb5d675bf5')
  })
})
