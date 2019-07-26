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
    import { EventBus } from "./eventBus";

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
            },
            clear: {
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
                let keys = Object.keys(this.nodesData)
                return keys.length === 0 || !this.nodesData.children || this.nodesData.children == false
            },
            ids: function () {
                let wholeId = new Set()
                for(let item of this.nodesData.children) {
                    wholeId.add(item.id)
                }
                return wholeId
            }
        },
        methods: {
            handleAddNode () {
                let title = window.prompt('输入id名与节点名，格式：id名#节点名', '')
                if (title) {
                    let idTitle = title.match(/([^#]+)#(.+)/)
                    if (!idTitle) {
                        window.alert('请输入正确的格式：id名#节点名')
                        return
                    }
                    if (this.ids.has(idTitle[1])) {
                        window.alert('id名与该层已有id名重复，请设置另一个id名')
                        return
                    }
                    const temp = this.nodesData
                    if (this.nodesData.children) {
                        temp.children.push({
                            title: idTitle[1],
                            id: idTitle[0],
                            parent: temp
                        })
                    } else {
                        temp.children = [{
                            title: idTitle[1],
                            id: idTitle[0],
                            parent: temp
                        }]
                    }
                    this.nodesData = {...temp}
                    this.$nextTick(function () {
                        EventBus.$emit('clearCheckBox')
                    })

                }
            },
            handleRemoveNode () {
                let par = this.nodesData.parent
                let index = par.children.indexOf(this.nodesData)
                par.children.splice(index,1)
                this.nodesData = {}
                EventBus.$emit('clearCheckBox')
            },
            handleCheckBoxChange (val) {
                let prevPath = this.findPrevPath(this.myData)
                let toLeafPathes = this.findLeafPath(this.myData, prevPath)
                this.$emit('changeValue')
                EventBus.$emit('checkBoxChanged', {
                    type: val ? 'add': 'remove',
                    data: toLeafPathes
                })
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
                    if (tree.children && tree.children.length !== 0) {
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
