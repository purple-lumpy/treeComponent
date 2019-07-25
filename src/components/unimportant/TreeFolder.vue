<template>
    <p>
        <span>{{ folder.name }}</span>
        <tree-folder-contents :children="folder.children"/>
    </p>
</template>

<script>
    export default {
        name: "TreeFolder",
        components: {
            TreeFolderContents: () => import('./TreeFolderContents')
        },
        data: function () {
            return {
            }
        },
        props: {
            folder: {
                type: Object,
                default: function () {
                    return {
                        name: 'parent 1',
                        id: '1',
                        children: [
                            {
                                name: 'parent 1-1',
                                id: '2',
                                children: [
                                    {
                                        name: 'leaf 1-1-1',
                                        id: '4'
                                    },
                                    {
                                        name: 'leaf 1-1-2',
                                        id: '5'
                                    }
                                ]
                            },
                            {
                                name: 'parent 1-2',
                                id: '3',
                                children: [
                                    {
                                        name: 'leaf 1-2-1',
                                        id: '6'
                                    },
                                    {
                                        name: 'leaf 1-2-1',
                                        id: '7'
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
