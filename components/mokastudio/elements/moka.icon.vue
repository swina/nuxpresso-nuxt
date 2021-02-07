<template>
    <i :ref="el.id" :class="iconClass + ' moka-icons ' + $cssResponsive(el.css)">{{icon}}</i>
</template>
<script>
var gsap
export default {
    name: 'MokaIconElement',
    props: ['el'],
    computed:{
        iconClass(){
            return this.el.tag === 'icon' ? 'material-icons' : 'bi-' + this.el.content
        },
        icon(){
            return this.el.tag === 'icon' ? this.el.content : ''
        }
    },
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>