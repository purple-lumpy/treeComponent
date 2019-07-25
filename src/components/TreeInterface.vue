<template>
    <div>
        <TreeSelector
            :myData="treeData"
            :clear="clear"
        />
    </div>
</template>

<script>
    import TreeSelector from './TreeSelector'
    import { EventBus } from "./eventBus";

    export default {
        name: "TreeInterface",
        components: {
            TreeSelector
        },
        data: function () {
            return {
                myData: {
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
                                    title: 'leaf 1-2-2',
                                    id: '7'
                                }
                            ]
                        }
                    ]
                },
                selectedPathes: new Set(),
                clear: false
            }
        },
        computed: {
            treeData: function () {
                return this.addParent(this.myData, null)
            }
        },
        mounted () {
            const self = this
            EventBus.$on('checkBoxChanged', (val) => {
                let prevPathes = self.selectedPathes
                if (val.type === 'add') {
                    self.selectedPathes = new Set([...prevPathes, ...val.data])
                } else {
                    self.selectedPathes = new Set([...prevPathes].filter(x => !(val.data).includes(x)))
                }
                this.$emit('changeSelect', this.selectedPathes)
                console.log('更新选项：', this.selectedPathes)
            })
            EventBus.$on('clearCheckBox', () => {
                this.selectedPathes = new Set()
                this.$emit('changeSelect', this.selectedPathes)
                console.log('更新选项：', this.selectedPathes)
            })
        },
        methods: {
            addParent (data, parent) {
                data.parent = parent
                if (data.children) {
                    for (let item of data.children) {
                        this.addParent(item, data)
                    }
                }
                return data
            }
        }
    }
</script>

<style scoped>

</style>
