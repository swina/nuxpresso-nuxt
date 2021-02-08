<template>
    <a :href="el.link" class="" target="_blank">
        <component :is="component" :component="component" :el="el"/>
    </a>
</template>

<script>
export default {
    name: 'MokaALink',
    props: [ 'el' , 'child' ],
    computed: {
        component(){
            return this.child
        }
    }
}
</script>