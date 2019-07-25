<template>
    <div>
        <TreeComp
            :is-root="isRoot"
            :is-leaf="isLeaf"
            v-show="nodesData.title && nodesData.id"
            :nodeId="nodesData.id"
            :nodeTitle="nodesData.title"
            :nodeChildren="nodesData.children"
            :checkBoxStraight="checkBoxValue"
            @addNode="handleAddNode"
            @removeNode="handleRemoveNode"
        >
        </TreeComp>
    </div>
</template>

<script>
    import TreeComp from './TreeComp'
    export default {
        name: "TreeSelector",
        components: {
            TreeComp
        },
        props: {
            myData: {
                type: Object,
                default: function () {
                    return {
                        title: 'Newparent 1',
                        id: '1',
                        children: [
                            {
                                title: 'parent 1-1',
                                id: '2',
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        id: '4'
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        id: '5'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                id: '3',
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        id: '6'
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        id: '7'
                                    }
                                ]
                            }
                        ]
                    }
                }
            },
            isRoot: {
                type: Boolean,
                default: function () {
                    return true
                }
            },
            checkBoxValue: {
                type: Boolean,
                default: function () {
                    return false
                }
            }
        },
        data: function () {
            return {
                nodesData: this.myData
            }
        },
        computed: {
            isLeaf: function () {
                return !this.nodesData.children || this.nodesData.children == false
            }
        },
        methods: {
            handleAddNode () {
                let title = window.prompt('输入节点的名字', '')
                if (title) {
                    const temp = this.nodesData
                    if (this.nodesData.children) {
                        temp.children.push({
                            title,
                            id: title
                        })
                    } else {
                        temp.children = [{
                            title,
                            id: title
                        }]
                    }
                    this.nodesData = {...temp}
                }
            },
            handleRemoveNode () {
                this.nodesData = {}
            }
        }
    }
</script>

<style scoped>

</style>
