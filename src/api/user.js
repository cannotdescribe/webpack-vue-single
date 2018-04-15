import request from '@/utils/request'

export function fetchUser(query) {
    return request({
        url: '/user/list',
        method: 'get',
        params: query
    })
}