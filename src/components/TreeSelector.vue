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
            @checkBoxChange="handleCheckBoxChange"
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
                        // title: 'Newparent 1',
                        // id: '1',
                        // children: [
                        //     {
                        //         title: 'parent 1-1',
                        //         id: '2',
                        //         children: [
                        //             {
                        //                 title: 'leaf 1-1-1',
                        //                 id: '4'
                        //             },
                        //             {
                        //                 title: 'leaf 1-1-2',
                        //                 id: '5'
                        //             }
                        //         ]
                        //     },
                        //     {
                        //         title: 'parent 1-2',
                        //         id: '3',
                        //         children: [
                        //             {
                        //                 title: 'leaf 1-2-1',
                        //                 id: '6'
                        //             },
                        //             {
                        //                 title: 'leaf 1-2-1',
                        //                 id: '7'
                        //             }
                        //         ]
                        //     }
                        // ]
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
        mounted () {
            console.log('treeSelector mounted')
        },
        methods: {
            handleAddNode () {
                let title = window.prompt('输入节点的名字', '')
                if (title) {
                    const temp = this.nodesData
                    if (this.nodesData.children) {
                        temp.children.push({
                            title,
                            id: title,
                            parent: temp
                        })
                    } else {
                        temp.children = [{
                            title,
                            id: title,
                            parent: temp
                        }]
                    }
                    this.nodesData = {...temp}
                }
            },
            handleRemoveNode () {
                this.nodesData = {}
            },
            handleCheckBoxChange (val) {
                console.log('checkbox changed, value is ', val)
                console.log('this.myData is ', this.myData)
                let prevPath = this.findPrevPath(this.myData)
                let leafPathes = this.findLeafPath(this.myData,prevPath)
                console.log('prev path is ', prevPath)
                console.log('leaf pathes r ', leafPathes)
                this.$emit('changeValue')
            },
            findPrevPath (data) {
                let pathes = []
                let dataFunc = data.parent
                while (dataFunc && dataFunc.title) {
                    pathes.push(dataFunc.title)
                    dataFunc = dataFunc.parent
                }
                return pathes.reverse().join('/')
            },
            findLeafPath (tree, path) {
                let pathes = []
                function findPath (tree, path) {
                    if (path) {
                        path += '/' + tree.title
                    } else {
                        path += tree.title
                    }
                    if (tree.children) {
                        for (let item of tree.children) {
                            findPath(item, path)
                        }
                    } else {
                        pathes.push(path)
                    }
                    return path
                }
                findPath(tree, path)
                return pathes
            }
        }
    }
</script>

<style scoped>

</style>
