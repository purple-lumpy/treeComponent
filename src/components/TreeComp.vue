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
                :class="{open: showPannel, close: !showPannel}"
                v-for="child in nodeChildren"
                :key="child.id"
            >
                <TreeSelector
                    :isRoot="false"
                    :myData="child"
                    :checkBoxValue="checkBoxValue"
                    @
                />
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
                checkBoxValue: false
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
            }
        }
    }
</script>

<style scoped>
    div.operations {
        display: inline-block;
        margin-left: 20px;
    }
    .pannel {
        margin: 0 0 0 15px;
        height: 50px;
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
