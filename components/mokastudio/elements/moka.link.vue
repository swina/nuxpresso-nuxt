<template>
    <nuxt-link :to="el.link" class="">
        <component :is="component" :component="component" :el="el"/>
    </nuxt-link>
</template>

<script>
export default {
    name: 'MokaLink',
    props: [ 'el' , 'child' ],
    computed: {
        component(){
            return this.child
        }
    }
}
</script>