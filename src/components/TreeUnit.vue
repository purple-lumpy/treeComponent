<template>
    <div class="wrapper">
        <p
            v-if="!isLeaf"
            class="gt"
            :class="{open: shouldOpen, close: !firstTimeTag && !shouldOpen}"
            @click="handleOpenClick"
        >
            &gt;
        </p>

        <input
            type="checkbox"
            :checked="realChecked"
            @change="handleCheckChange"
        />

        <label
            v-show="!editTitle"
            @dblclick="handleTitleDoubleClick"
            title="双击更改节点名称"
        >
            {{myTitle}}
        </label>

        <input
            v-show="editTitle"
            autofocus type="text"
            v-model="myTitle"
            @blur="handleInputBlur"
        />
    </div>
</template>

<script>
    import { EventBus } from "./eventBus";

    export default {
        name: "TreeUnit",
        data: function () {
            return {
                shouldOpen: false,
                firstTimeTag: true,
                realChecked: this.shouldCheck,
                editTitle: false,
                myTitle: this.nodeTitle
            }
        },
        mounted () {
            EventBus.$on('clearCheckBox', () => {
                this.realChecked = false
            })
        },
        methods: {
            handleOpenClick () {
                this.firstTimeTag = false
                this.shouldOpen = !this.shouldOpen
                this.$emit('openPannel')
            },
            handleCheckChange (val) {
                this.$nextTick(function () {
                    this.realChecked = val.target.checked
                    this.$emit('checkboxChange', this.realChecked)
                })
            },
            handleTitleDoubleClick () {
                this.editTitle = true
            },
            handleInputBlur () {
                this.editTitle = false
                this.$emit('changeNodeTitle', this.myTitle)
                this.$emit('clearCheckBox')
            }
        },
        props: {
            isLeaf: {
                type: Boolean,
                required: true
            },
            isRoot: {
                type: Boolean
            },
            nodeId: {
                type: String,
                required: true
            },
            nodeTitle: {
                type: String,
                required: true
            },
            shouldCheck: {
                type: Boolean,
                default: function () {
                    return false
                }
            }
        },
        watch: {
            shouldCheck: function (val) {
                this.realChecked = val
            }
        }

    }
</script>

<style scoped>
    div.wrapper {
        height: 30px;
        line-height: 30px;
        display: inline-block;
        color: #515a6e;
    }
    div > .gt {
        display: inline-block;
        margin: 0 5px 0 0;
        font-size: 10px;
        cursor: pointer;
    }
    @keyframes toOpen {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(90deg);
        }
    }
    @keyframes toClose {
        from {
            transform: rotate(90deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    .open {
        animation: toOpen 0.5s;
        transform: rotate(90deg);
    }
    .close {
        animation: toClose 0.5s;
        transform: rotate(0deg);
    }
</style>
