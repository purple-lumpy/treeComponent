<template>
    <div>
        <TreeSelector
            :myData="treeData"
            @changeValue="handleChangeValue"
        />
    </div>
</template>

<script>
    import TreeSelector from './TreeSelector'

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
                                    title: 'leaf 1-2-1',
                                    id: '7'
                                }
                            ]
                        }
                    ]
                }
            }
        },
        computed: {
            treeData: function () {
                return this.addParent(this.myData, null)
            }
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
            },
            handleChangeValue () {
                console.log('接收到了')
            }
        }
    }
</script>

<style scoped>

</style>
