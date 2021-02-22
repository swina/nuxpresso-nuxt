<template>
    <span @click="action">
        <a v-if="!el.link.includes('#popup?')" :href="link" :target="target">
            <component :is="component" :component="component" :el="el"/>
        </a>
        <component v-if="el.link.includes('#popup?')" :is="component" :component="component" :el="el" @click="prevent"/>
    </span>
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
        prevent(e){
            e.preventDefault()
        },
        action(e){
            if ( this.el.link && this.el.link.includes('#popup?') ){
                e.preventDefault()
                this.elementAction = { action:  'popup' , value: this.el.link.split('?')[1] }
                console.log ( this.elementAction )
                if ( this.elementAction ){
                    this.$store.state.popup ?
                        this.$store.dispatch ( 'popup' , null ) :
                            this.$store.dispatch ( this.elementAction.action , this.elementAction.value )
                } else {
                    return null
                }
            }
        }
    }
}
</script>