<template>
    <div class="monitor-menu">
        <div class="monitor-menu-left">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="monitor-menu-right">
            <el-dropdown :hide-on-click="false">
                <el-button type="primary" size="small" :plain="true">
                    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <label>
                            <input type="checkbox"/>
                            <span>黄金糕</span>
                        </label>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <label>
                            <input type="checkbox"/>
                            <span>狮子头</span>
                        </label>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <label>
                            <input type="checkbox"/>
                            <span>螺蛳粉</span>
                        </label>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <label>
                            <input type="checkbox"/>
                            <span>双皮奶</span>
                        </label>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
                <el-button type="primary" size="small" :plain="true">
                    更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item>双皮奶</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script type="application/javascript">

</script>
<style>
    .monitor-menu{
        height: 40px;
        background: rgb(26,30,33);
    }
    .monitor-menu-left{
        float: left;
    }
    .monitor-menu-right{
        float: right;
    }
    .el-dropdown .el-button{
        border: 0;
        background: rgb(26,30,33);
        color: #fff;
        font-size: 14px;
        padding:13px 10px;
    }
    .el-dropdown .el-button:hover{
        background: rgb(26,30,33);
    }
    .el-dropdown .el-button:active{
        background: rgb(26,30,33);
    }
    .el-dropdown .el-button:visited{
        background: rgb(26,30,33);
    }
    .el-button--primary.is-plain:focus{
        background: rgb(26,30,33);
    }
    .el-breadcrumb__inner{
        line-height: 40px;
    }
    .el-breadcrumb{
        margin-left: 15px;
    }
</style>