<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.title">
            </el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">增加</el-button>
            <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出</el-button>
        </div>

        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                  style="width: 100%">
            <!--
                id: '@increment',
                username: '@word(6,8)',
                nickName: '@cname',
                loginCount: '@integer(5, 400)',
                lastLoginTime: '@datetime()',
                email: '@email',
                endTime : '@datetime()'
            -->
            <el-table-column align="center" label="id" width="55">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="用户名" width="95px">
                <template slot-scope="scope">
                    <span>{{scope.row.username}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="nickName" min-width="125">
                <template slot-scope="scope">
                    <span>{{scope.row.nickName}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="登录次数" width="65">
                <template slot-scope="scope">
                    <span>{{scope.row.loginCount}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="最后登录时间" min-width="125">
                <template slot-scope="scope">
                    <span>{{scope.row.lastLoginTime}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="邮箱" min-width="125">
                <template slot-scope="scope">
                    <span>{{scope.row.email}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="有效时间" min-width="125">
                <template slot-scope="scope">
                    <span>{{scope.row.endTime}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" >编辑</el-button>
                    <el-button v-if="scope.row.status!='published'" size="mini" type="success" >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {fetchUser} from '@/api/user'
    import waves from '@/directive/waves'
    export default{
        name: 'User',
        directives: {
            waves
        },
        data(){
            return {
                total: 0,
                tableKey: 0,
                listLoading: true,
                list: null,
                downloadLoading: false,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },
            }
        },
        created(){
            this.getList();
        },
        methods: {
            handleFilter(){},
            handleCreate(){},
            handleDownload(){},
            getList(){
                this.listLoading = true
                fetchUser(this.listQuery).then(response=>{
                    console.log(response);
                    this.list = response.data.rows
                    this.total = response.data.total
                    this.listLoading = false
                });
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
        }
    }
</script>