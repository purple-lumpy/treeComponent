<template>
    <div>
        <div>
            <TreeUnit
                :node-id="nodeId"
                :node-title="nodeTitle"
                :isRoot="isRoot"
                :is-leaf="isLeaf"
                :shouldCheck="checkBoxStraight"
                @openPannel="handleOpenPannel"
                @addNode="handleAddNode"
                @removeNode="handleRemoveNode"
                @checkboxChange="handleCheckBoxChange"
                @changeNodeTitle="handleChangeNodeTitle"
            />

            <div class="operations">
                <button @click="handleAddNode">
                    +
                </button>
                <button v-if="!isRoot" @click="handleRemoveNode">
                    -
                </button>
            </div>
        </div>

        <div v-if="!isLeaf">
            <div
                class="pannel"
                v-for="child in showChildren"
                :key="child.id"
                :class="{open: showPannel, close: !showPannel}"
            >
                <TreeSelector
                    :isRoot="false"
                    :myData="child"
                    :checkBoxValue="checkBoxValue"
                />
            </div>
            <div
                class="show-more"
                :class="{open: showPannel, close: !showPannel}"
                v-show="haveDisplayChild"
                @click="handleShowMoreChildren"
            >
                more
            </div>
        </div>


    </div>
</template>

<script>
    import TreeUnit from './TreeUnit'
    export default {
        name: "TreeComp",
        components: {
            TreeUnit,
            TreeSelector: () => import('./TreeSelector')
        },
        data: function () {
            return {
                showPannel: false,
                firstTimeTag: true,
                checkBoxValue: false,
                showChildren: [],
                childIndex: 0,
                onceShowNumber: 3,
                haveDisplayChild: false
            }
        },
        props: {
            isRoot: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            isLeaf: {
                type: Boolean,
                default: function () {
                    return true
                }
            },
            nodeId: {
                type: String,
                default: function () {
                    return String(Math.round(Math.random() * 100))
                }
            },
            nodeTitle: {
                type: String,
                default: function () {
                    return 'Node'
                }
            },
            nodeChildren: {
                type: Array,
                default: function () {
                    return []
                }
            },
            checkBoxStraight: {
                type: Boolean
            }
        },
        watch: {
            checkBoxStraight: function (val) {
                this.checkBoxValue = val
            },
            nodeChildren: function () {
                // 新增节点 删除节点 处理
                if (!this.haveDisplayChild) {
                    this.showMore()
                }
            }
        },
        mounted () {
            if (this.nodeChildren.length) {
                this.showMore()
            }
        },
        methods: {
            handleOpenPannel () {
                this.showPannel = !this.showPannel
            },
            handleAddNode () {
                this.$emit('addNode')
            },
            handleRemoveNode () {
                this.$emit('removeNode')
            },
            handleCheckBoxChange (val) {
                this.checkBoxValue = val
                this.$emit('checkBoxChange', val)
            },
            handleShowMoreChildren () {
                this.showMore()
            },
            handleChangeNodeTitle (val) {
                this.$emit('changeNodeTitle', val)
            },
            showMore () {
                const nextIndex = this.childIndex + this.onceShowNumber
                this.showChildren = this.nodeChildren.slice(0, nextIndex)
                this.childIndex = nextIndex
                if (this.showChildren.length < this.nodeChildren.length) {
                    this.haveDisplayChild = true
                } else {
                    this.haveDisplayChild = false
                }
            }
        }
    }
</script>

<style scoped>
    div.operations {
        display: inline-block;
        margin-left: 20px;
    }
    div.operations > button {
        color: #515a6e;
    }
    .pannel {
        margin: 0 0 0 15px;
        height: 50px;
    }
    div.show-more {
        cursor: pointer;
        margin-left: 25px;
        color: #0000CD;
        text-shadow: 0 0 2px #4682B4;
    }
    @keyframes toOpen {
        from {
            height: 0;
        }
        to {
            height: auto;
        }
    }
    @keyframes toClose {
        from {
            height: auto;
        }
        to {
            height: 0;
        }
    }
    .open {
        animation: toOpen 0.5s;
        height: auto;
        display: block;
    }
    .close {
        animation: toClose 3s;
        height: 0;
        display: none;
    }
</style>
