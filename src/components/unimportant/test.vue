<template>
    <h1>
        {{message}}
    </h1>
</template>

<script>
    export default {
        name: "test",
        data () {
            return {
                message: 'hello vue'
            }
        },
        beforeCreate () {
            console.log('test, beforeCreate')
        },
        created () {
            console.log('test, created')
        },
        beforeMount () {
            console.log('test, beforeMount')
        },
        mounted() {
            // debugger
            console.log('test, mounted')
        }
    }
</script>

<style scoped>

</style>
