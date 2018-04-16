import Mock from 'mockjs'

import { param2Obj } from '@/utils'

const List = [];
const count = 100;
for(let i=0;i<count;i++){
    List.push(Mock.mock({
        id: '@increment',
        username: '@word(6,8)',
        nickName: '@cname',
        loginCount: '@integer(5, 400)',
        lastLoginTime: '@datetime()',
        email: '@email',
        endTime : '@datetime()'
    }));
}

export default {
    getList : config => {
        //page, rows,
        const {page = 1, limit = 20} = param2Obj(config.url);

        return {

            rows: List.filter((item, index)=>{
                    return index>=(page-1)*limit && index < page*limit
                }
            ),
            total: count
        };
    },
    userLogin: ()=>{
        return {};
    }
}