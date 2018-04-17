<template>
    <div>
        <el-tree
                :data="data"
                :props="defaultProps"
                @node-click="handleNodeClick"
                :expand-on-click-node="false"
                :render-content="renderContent">
        </el-tree>

    </div>
</template>

<script type="text/jsx">
    export default {
        data() {
            return {
                data: [{
                    label: '中心',
                    nodeType: 'center',
                    children: [{
                        label: '子站一',
                        nodeType: 'station',
                        children: [{
                            label: '房间一',
                            nodeType:'room',
                            children: [{
                                label: '空调',
                                nodeType: 'device',
                            },
                            {
                                nodeType: 'device',
                                label: 'IO'
                            }]
                        }]
                    }, {
                        label: '子站二',
                        nodeType:"station",
                        children: [{
                            label: '二级 2-1',
                            nodeType:'room',
                            children: [{
                                label: '三级 2-1-1',
                                nodeType:'device'
                            }]
                        }, {
                            label: '二级 2-2',
                            nodeType:'room',
                            children: [{
                                label: '三级 2-2-1',
                                nodeType:'device'
                            }]
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                this.$emit("handleNodeClick", data);
            },
            renderContent(h, { node, data, store }) {
                let baseUrl = this.$route.matched[1].path;
                if(data.nodeType==='device'){
                    return (
                        <router-link class="custom-tree-node" to={baseUrl + data.nodeType}>
                            <span>{node.label}</span>
                            <span>
                              <el-button size="mini" type="text" >告警</el-button>
                            </span>
                        </router-link>
                    );

                }else{
                    return (
                        <router-link class="custom-tree-node" to={baseUrl + data.nodeType}>
                            <span>{node.label}</span>
                        </router-link>
                    );
                }
            }
        }
    };
</script>

<style>
    .el-aside{
        border: solid 1px #e6e6e6;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>