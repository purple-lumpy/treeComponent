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
    import { EventBus } from "./eventBus"
    // import {data as mockData} from '../mock'

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
                                },
                                {
                                    title: 'leaf 1-1-1',
                                    id: '17'
                                },
                                {
                                    title: 'leaf 1-1-2',
                                    id: '18'
                                },{
                                    title: 'leaf 1-1-1',
                                    id: '19'
                                },
                                {
                                    title: 'leaf 1-1-2',
                                    id: '20'
                                },{
                                    title: 'leaf 1-1-1',
                                    id: '21'
                                },
                                {
                                    title: 'leaf 1-1-2',
                                    id: '22'
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
                        },
                        {
                            title: 'parent 1-3',
                            id: '14',
                            children: [
                                {
                                    title: 'leaf 1-3-1',
                                    id: '8'
                                },
                                {
                                    title: 'leaf 1-3-2',
                                    id: '9'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-4',
                            id: '15',
                            children: [
                                {
                                    title: 'leaf 1-4-1',
                                    id: '10'
                                },
                                {
                                    title: 'leaf 1-4-2',
                                    id: '11'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-5',
                            id: '16',
                            children: [
                                {
                                    title: 'leaf 1-5-1',
                                    id: '12'
                                },
                                {
                                    title: 'leaf 1-5-2',
                                    id: '13'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-6',
                            id: '17',
                            children: [
                                {
                                    title: 'leaf 1-6-1',
                                    id: '12'
                                },
                                {
                                    title: 'leaf 1-6-2',
                                    id: '13'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-7',
                            id: '18',
                            children: [
                                {
                                    title: 'leaf 1-7-1',
                                    id: '12'
                                },
                                {
                                    title: 'leaf 1-7-2',
                                    id: '13'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-8',
                            id: '19',
                            children: [
                                {
                                    title: 'leaf 1-8-1',
                                    id: '12'
                                },
                                {
                                    title: 'leaf 1-8-2',
                                    id: '13'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-9',
                            id: '20',
                            children: [
                                {
                                    title: 'leaf 1-9-1',
                                    id: '12'
                                },
                                {
                                    title: 'leaf 1-9-2',
                                    id: '13'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-10',
                            id: '21',
                            children: [
                                {
                                    title: 'leaf 1-10-1',
                                    id: '12'
                                },
                                {
                                    title: 'leaf 1-10-2',
                                    id: '13'
                                }
                            ]
                        }
                    ]
                },
                // myData: mockData,
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
            // console.log('mock 数据为 ', mockData)
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
                data.id = data.id.toString()
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
