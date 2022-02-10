const Mock = require('mockjs')
const Random = Mock.Random

const listData = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        '_id|+1': 1,
        'winTime|1': ['2021/06/15 18:00', '2021/06/16 05:00'],
        'isWinnig|1': [0, 1], //从属性值 array 中顺序选取 1 个元素，作为最终值。
        'prizes|1-2': [
          {
            title: '端午节礼物',
            count: 1,
          }
        ], // 通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。
        'title': '钉钉开放平台开发者抽奖'
    }]
})

const lotteryDetailData = Mock.mock({
  lottery: [
    {
      'title': '钉钉开放平台抽奖',
      'end_time|1': ['2021/06/15 18:00', '2021/06/16 05:00'],
      'start_time|1': ['2021/06/15 18:00', '2021/06/16 05:00'],
      'lot_times|1': [1, 2, 3, 4, 5],
      'winning_once|1': [0, 1],
      'rule_desc|1-3': '钉钉开放平台开发者均可参与。'
    }
  ],
  'prizes|1-2': [
    {
      'title': '端午节礼物',
      'count': 1,
      'totalCount': 100,
      'probability': 0.1,
    }
  ],
})

const LotteryResultData = Mock.mock({
  'records|2-5': [
    {
      'name|1': ['钉三多', '小河马', '大蚂蚁'],
      'time|1': ['2021/06/15 18:00', '2021/06/16 05:00'],
      'isWinnig|1': [false, true],
      'department|1': ['人事', '财务', 'IT', '行政'],
      'prizes': [{
        'title': '礼盒',
        'count': Random.integer(1, 10),
      }]
    }
  ],
  'userCount': Random.integer(1, 5),
  'lotteryCount': Random.integer(1, 5),
  'winningUserCount': Random.integer(1, 5),
  'winnignCount': ['钉三多', '小河马', '大蚂蚁']
})

const draw = Mock.mock({
  'prizes': [{
    'title': '礼盒',
    'count': Random.integer(1, 10),
  }],
  'leftDrawCount': Random.integer(1, 10),
})

const luckLottery = Mock.mock({
  'lotteryInfo': {
    'lottery': [
      {
        'title': '钉钉开放平台抽奖',
        'end_time|1': ['2021/06/15 18:00', '2021/06/16 05:00'],
        'start_time|1': ['2021/06/15 18:00', '2021/06/16 05:00'],
        'lot_times|1': [1, 2, 3, 4, 5],
        'winning_once|1': [0, 1],
        'rule_desc|1-3': '钉钉开放平台开发者均可参与。'
      }
    ]
  },
  'prizes': [{
    'title': '礼盒',
    'count': Random.integer(1, 10),
  }],
})

export const prizeSchema = {
  lotteryId: '1',
  title: '端午节钉钉全员抽奖活动',
  probability: '1', // 抽奖概率
  totalCount: '30',
  leftCount: '20', // 剩余奖品数
  created_at: Date.now(),
  update_at: Date.now()
}

export const lotterySchema = {
  title: '蛋黄味粽子',
  start_time: Date.now(),
  end_time: Date.now() + 10000,
  lot_times: 3, // 抽奖机会
  winning_once: 1, // 是否只中一次奖，1为是，0为中多次
  rule_desc: '钉钉开放平台',
  creator: '1',
  creatorName: 'xing',
  agent_id: '1', // 不同小程序的agentId
  created_at: Date.now(),
  update_at: Date.now(),
}

export const userLotterySchema = {
  lotteryId: '123',
  userId: '123',
  time : Date.now(),
  drawTimes: 3, // 抽奖的次数
  isWinnig: 1, // 0未中奖 1中奖 >1为中奖次数
  prizeId :  {
    type: ['1','2'],
    default: []
  }, // 可中多种奖品
  leftTime: 1, // 剩余抽奖次数
  created_at : Date.now(),
  update_at : Date.now(),
}

const joinLotteryRes = {
  status: 200,
  data: listData,
}

const ownLotteryRes = {
  status: 200,
  data: listData,
}
const lotteryDetailRes = {
  status: 200,
  data: lotteryDetailData,
}

const getLotteryResultRes = {
  status: 200,
  data: LotteryResultData,
}

const getLuckLottery = {
  status: 200,
  data: luckLottery,
}

const getDraw = {
  status: 200,
  data: draw
}

export const getMockData = (url, params) => {
  switch(url) {
    case 'api/user/joinLottery':
      // 我参与的抽奖
      return joinLotteryRes
    case 'api/user/ownLottery':
      // 我发起的抽奖
      return ownLotteryRes
    case 'api/lottery':
      return lotteryDetailRes
    case 'api/user/getLotteryResult':
      return getLotteryResultRes
    case 'api/lottery/edit':
      // 编辑
    case 'api/user/lottery':
      return getLuckLottery
    case 'api/user/draw':
      return getDraw
    default: 
      throw 'no match url'
  }
}
