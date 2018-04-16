import Mock from 'mockjs'

import userMock from './userMock'

Mock.mock(/\/user\/list/, 'get', userMock.getList);

Mock.mock(/\/api\/login/, 'post', userMock.getList);