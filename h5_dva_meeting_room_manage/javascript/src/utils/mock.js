const Mock = require('mockjs');
const Random = Mock.Random;

const listRoom = Mock.mock({
  'meetings|2-5': [{
    'id|+1': 1,
    'num': Random.integer(1, 10),
    'address|1': ['未来park 3号楼', '未来park 5号楼', '未来park 10号楼'],
    'name|1': ['1号会议室', '2号会议室', '3号会议室', '4号会议室', '5号会议室']
  }],
});

const userRoom = Mock.mock({
  'meetings|2-5': [{
    'room': {
      'id|+1': 1,
      'num': Random.integer(1, 10),
      'address|1': ['未来park 3号楼', '未来park 5号楼', '未来park 10号楼'],
      'name|1': ['1号会议室', '2号会议室', '3号会议室', '4号会议室', '5号会议室'],
      'range|1': ['2026.07.01 14:00-15:00', '2026.08.01 16:00-17:00', '2026.10.01 05:00-06:00'],
    },
  }],
});

const listFullRoom = Mock.mock({
  'meetings|2-5': [{
    'id|+1': 1,
    'num': Random.integer(1, 10),
    'address|1': ['未来park 3号楼', '未来park 5号楼', '未来park 10号楼'],
    'name|1': ['1号会议室', '2号会议室', '3号会议室', '4号会议室', '5号会议室'],
    'timeRanges': [
      {
        startTime: new Date(...["2022","00","25","19","00","00"]).getTime(),
        endTime: new Date(...["2022","00","25","22","00","00"]).getTime(),
      },
    ],
  }],
});

const listOneRoom = Mock.mock({
  'room': {
    'id|+1': 1,
    'num': Random.integer(1, 10),
    'address|1': ['未来park 3号楼', '未来park 5号楼', '未来park 10号楼'],
    'name|1': ['1号会议室', '2号会议室', '3号会议室', '4号会议室', '5号会议室'],
    'timeRanges': [
      {
        startTime: new Date(...["2022","00","25","13","00","00"]).getTime(),
        endTime: new Date(...["2022","00","25","18","00","00"]).getTime()
      },
    ],
  },
});

const getListRoom = {
  success: true,
  result: listRoom,
};

const getUserRooms = {
  success: true,
  result: userRoom,
};

const getListFullRoom = {
  success: true,
  result: listFullRoom,
};

const getListOneRoom = {
  success: true,
  result: listOneRoom,
};

const getSuccessResult = {
  success: true,
};

export const getMockData = (url) => {
  switch(url) {
    case 'room/list_room':
      // 会议室列表
      return getListRoom;
    case 'room/get_user_order_rooms':
      // 我的预定
      return getUserRooms;
    case 'room/list_full_room':
      // 所有会议室
      return getListFullRoom;
    case 'room/list_one_room':
      return getListOneRoom;
    case 'room/order_room':
    case 'room/cancel_order':
    case 'room/delete_room':
    case 'room/update_room':
      return getSuccessResult;
    default: 
      throw 'no match url';
  }
};
