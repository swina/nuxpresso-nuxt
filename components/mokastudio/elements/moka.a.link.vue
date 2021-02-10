<template>
    <a :href="el.link" class="" target="_blank" :download="download">
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
        },
        download(){
            return this.child.type === 'file' ? true : false
        }
    }
}
</script>