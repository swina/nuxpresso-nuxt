<template>
    <img v-if="el.image" :ref="el.id" :src="image()" :caption="el.image.caption||el.image.name" :alt="el.image.alternativeText||el.image.name" :title="el.image.name.split('.')[0]" :class="$cssResponsive(el.css)" :style="el.style"/>
</template>

<script>
var gsap
export default {
    name: 'MokaImgElement',
    props: ['el'],
    methods:{
        image(){
                if ( process.env.development ){
                    let img = ''
                        this.el.image.url.includes('http') ?
                            img = this.el.image.url : 
                                img = process.env.strapiBaseUri + this.el.image.url.substring(1)
                    return img
                } else {
                    if ( process.client ){
                    return this.el.image.url.includes('http') ?
                        this.el.image.url :
                            this.el.image.url
                    }
                }
        }
    },
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
        
        this.el.style = this.el.style
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>