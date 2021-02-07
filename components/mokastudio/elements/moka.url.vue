<template>
    <a :href="link" class="" :target="target"  @click="action">
        <component :is="component" :component="component" :el="el"/>
    </a>
</template>

<script>
export default {
    name: 'MokaUrl',
    props: [ 'el' , 'child' ],
    data:()=>({
        target: '_blank',
        elementAction: null
    }),
    computed: {
        component(){
            return this.child
        },
        link(){
            if ( this.el.link.includes('#popup?') ){
                this.elementAction = { action:  'popup' , value: this.el.link.split('?')[1] }
                this.target = ''
                return '#' + this.el.link.split('?')[1]
            }
            this.target = this.el.link.includes('#') ? '' : '_blank'
            return this.el.link
        }
    },
    methods:{
        action(){
            if ( this.elementAction ){
                this.$store.dispatch ( this.elementAction.action , this.elementAction.value )
            } else {
                return null
            }
        }
    }
}
</script>