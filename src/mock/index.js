import Mock from 'mockjs'

import userMock from './userMock'

Mock.mock(/\/user\/list/, 'get', userMock.getList);