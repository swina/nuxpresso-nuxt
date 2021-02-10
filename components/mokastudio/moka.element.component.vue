<template>
    <component :ref="el.id" :is="component" :class="css" :el="el" :child="child" @changed="changedValue"/> 
</template>

<script>
import MokaText from '@/components/mokastudio/elements/moka.text'
import MokaVideo from '@/components/mokastudio/elements/moka.video'
import MokaAudio from '@/components/mokastudio/elements/moka.audio'
import MokaIframe from '@/components/mokastudio/elements/moka.iframe'
import MokaSvg from '@/components/mokastudio/elements/moka.svg'
import MokaImg from '@/components/mokastudio/elements/moka.img'
import MokaIcon from '@/components/mokastudio/elements/moka.icon'
import MokaMenu from '@/components/mokastudio/elements/moka.menu'
import MokaInput from '@/components/mokastudio/elements/moka.input'
import MokaTextarea from '@/components/mokastudio/elements/moka.textarea'
import MokaSimpleSvg from '@/components/mokastudio/elements/moka.simple.svg'
import MokaArticle from '@/components/mokastudio/elements/moka.article'
import MokaLink from '@/components/mokastudio/elements/moka.link'
import MokaUrl from '@/components/mokastudio/elements/moka.url'
import MokaDownload from '@/components/mokastudio/elements/moka.download'
export default {
    name: 'MokaRenderElement',
    components: {
        MokaText,
        MokaVideo,
        MokaAudio,
        MokaIframe,
        MokaSvg,
        MokaImg,
        MokaInput,
        MokaTextarea,
        MokaSimpleSvg,
        MokaArticle,
        MokaLink,
        MokaUrl,
        MokaDownload
    },
    data:()=>({
        css: '',
        child: null
    }),
    props: [ 'el' ],
    computed:{
        
        component(){
            let el = this.$attrs.element
            !el.link ?
                this.css = this.$cssResponsive(el.css) :
                    this.css = ''
            if ( ( el.tag === 'element' || el.type === 'button' ) && el.element != 'img' && el.type != 'video' && el.type != 'audio' ) {
                this.child = MokaText
                return el.link ? this.linkComponent(el.link) : MokaText
                
            }
            if ( el.tag === 'article' && el.type === 'element' ){
                this.$attrs.element.content = this.$attrs.article[el.label]
                this.child = MokaText
                return el.link ? this.linkComponent(el.link) : MokaText
                return MokaText
            }

            if ( el.tag === 'article' && el.type === 'date' ){
                this.$attrs.element.content = this.$moment(this.$attrs.article[el.label])
                this.child = MokaText
                return el.link ? this.linkComponent(el.link) : MokaText
                return MokaText
            }

            if ( el.tag === 'article' && el.element === 'img' ){
                this.$attrs.element.image = this.$attrs.article.featured_img//this.$attrs.article[el.label]
                this.child = MokaImg
                return el.link ? this.linkComponent(el.link) : MokaImg
            }
            if ( el.type === 'video' ) {
                if ( el.element != 'iframe' ){
                    this.child = MokaVideo
                    return el.link ? this.linkComponent(el.link) : MokaVideo
                } else {
                    this.child = MokaIframe
                    return MokaIframe
                }
            }
            if ( el.type === 'audio' ) {
                this.child = MokaAudio
                return el.link ? this.linkComponent(el.link) : MokaAudio
            }
            if ( el.type === 'svg' ){
                this.child = MokaSvg
                return el.link ? this.linkComponent(el.link) : MokaSvg
            }
            if ( el.element === 'img' && el.image && el.image.url && el.image.ext != '.svg' && el.image.ext != '.mp4' ) {
                this.child = MokaImg
                return el.link ? this.linkComponent(el.link) : MokaImg
            }
            if ( el.tag === 'icon' || el.tag === 'icon_bt' ){
                this.child = MokaIcon
                return el.link ? this.linkComponent(el.link) : MokaIcon
            }
            if ( el.element === 'menu' ){
                return MokaMenu
            }
            if ( el.tag === 'input' && el.type!='button' && el.type != 'textarea' ){
                return MokaInput
            } 
            if ( el.type === 'textarea' ){
                return MokaTextarea
            }
            if ( (el.element === 'img')  && el.image && el.image.ext === '.svg' ) {
                this.child = MokaSimpleSvg
                return el.link ? this.linkComponent(el.link) : MokaSimpleSvg 
            }
            if ( el.type === 'file' && el.link ){
                this.child = MokaText
                return MokaDownload
            }
        }
    },
    methods: {
        changedValue(v,name){
            this.$emit('change',v,name)
        },
        linkComponent(url){
            return url.includes('http') || url.includes('#') ?
                MokaUrl : MokaLink 
            
        },
    }
    
}
</script>