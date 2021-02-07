<template>
    <component
        :is="semantic"
        :id="doc.hasOwnProperty('anchor')? doc.anchor : doc.id"
        v-if="doc &&  modal " 
        :modal="popup" 
        :class="$classe(doc.css)" :style="$stile(doc) + ' ' +  $background(doc)" :ref="doc.id">
        <template v-for="(block,b) in doc.blocks">

            <!-- html element --> 
            <moka-element
                :article="$attrs.article"
                v-if="$isMokaElement(block) && block.tag!='form'"
                :key="block.id"
                :el="block"
                :element="block"/> 

            <!-- grid / flex -->
            <moka-preview-container
                :key="$randomID()"
                :loop="$attrs.loop"
                :article="$attrs.article"
                :start="$attrs.start"
                :limit="$attrs.limit"
                v-if="$isMokaContainer(block,doc) && block.tag!='form'" 
                :doc="block"/>

            <!-- articles loop template (grid) -->
            <moka-articles-loop
                :key="$randomID()"
                :articles="$attrs.article"
                v-if="block.loop"
                :doc="block"
                :start="$attrs.start"
                :limit="$attrs.limit"
                :pagination="$attrs.pagination||false"/>

            <!-- form -->
            <moka-form
                :key="$randomID()"
                :article="$attrs.article"
                v-if="block.tag==='form'"
                :doc="block"/>
            <!-- render slider -->
            <moka-slider :key="block.id" v-if="block && block.hasOwnProperty('slider')" :develop="false" :embeded="true" :doc="block" :editor="false"/> 
        </template>
        <i class="material-icons absolute top-0 right-0 m-1" v-if="doc.hasOwnProperty('popup') && doc.popup.close" @click="popupClose">close</i>
    </component>

</template>

<script>
//import MokaElement from '@/components/mokastudio/moka.element'
import MokaElement from '@/components/mokastudio/moka.element.component'
import MokaSlider from '@/components/mokastudio/slider/moka.slider'
import MokaArticlesLoop from '@/components/mokastudio/moka.preview.container.loop'
import MokaForm from '@/components/mokastudio/moka.preview.form'
//import MokaArticlesLoop from '@/components/mokastudio/moka.preview.articles.loop'
import { mapState } from 'vuex'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];

export default {
    name: 'MokaPreviewContainer',
    components: { MokaElement , MokaSlider , MokaArticlesLoop , MokaForm  },
    props: [ 'doc'  ],
    data:()=>({
        modal: true
    }),
    computed:{
        ...mapState(['popup']),
        animations(){
            return gsapEffects
        },
        semantic(){
            return this.doc.semantic ? this.doc.semantic : 'div'
        },
        popup(){
            if ( this.doc.hasOwnProperty('popup') ){
                if ( this.doc.popup.trigger ){
                    //this.doc.css.css.replace('modal','')
                    this.modal = false
                } else {
                    this.modal = true
                }
            }
        }
    },
    watch:{
        '$store.state.popup':function(v){
            if ( v ){
                this.modal = true
                if ( this.doc.hasOwnProperty('gsap') && this.doc.gsap.animation ){
                    this.animate ( this.doc , this.doc.id )
                }
            }
        }
    },
    methods:{
        /*
        classe(css){
            return css.hasOwnProperty('css') ? this.$cssResponsive(css.css) + ' ' + this.$cssResponsive(css.container) : this.$cssResponsive(css)
        },
        stile(block,doc){
            if ( !block || !doc ) return 
            let stile = ''
            if ( block.hasOwnProperty('fontFamily')){
                stile += 'font-family:\"' + block.fontFamily + '\"; '
            }
            return block.hasOwnProperty('style') ? block.style + stile : stile
        },
        background(block){
            if ( !block ) return 
            return block.hasOwnProperty('image') ?
                block.image && block.image.url ? 
                    block.image.previewUrl ? 
                        ' background-image:url(' + block.image.previewUrl + ');background-size:cover;background-repeat:no-repeat;' :
                            ' background-image:url(' + block.image.url + ');' : ''  : ''        
        },
        */
        popupClose(){
            this.modal = false
            this.$store.dispatch('popup','')
        },
        animate(element,id){
            let vm = this
            if ( this.$refs && element.hasOwnProperty('gsap') && element.gsap.animation ){
                //console.log ( 'animation for => ' , id , this.$refs[id] )
                let ani = gsap.effects[element.gsap.animation]( this.$refs[id] ,{
                    trigger: this.$refs[id],
                    duration: parseFloat(element.gsap.duration),
                    delay: parseFloat(element.gsap.delay),
                    ease: element.gsap.ease
                })
                ScrollTrigger.create({
                    id: id,
                    start: "top 99%",
                    trigger: this.$refs[id],
                    toggleActions: "play pause restart none",
                    animation:ani,
                    onEnter: ()=>{ 
                        //console.log ( 'start playing animation')
                        if ( element.gsap.delay ){
                            ani.play()
                        } else {
                            ani.play(0)
                        }
                    },
                    
                });
                    
            }
        },
    },
    mounted(){
        window.scrollTo(0,0)
        if ( this.doc.hasOwnProperty('gsap') && this.doc.gsap.animation ){
            //console.log ( 'REFS=>' , this.$refs , ' => animation => ' , this.doc.gsap.animation )
            this.animate ( this.doc , this.doc.id )
        }
        return
        this.doc.blocks.forEach ( block => {
            if ( block.hasOwnProperty('gsap') && block.gsap.animation  ){
                this.animate(block, block.id)
            }
            if ( block.hasOwnProperty('blocks') ){
                block.blocks.forEach ( container => {
                    if ( container.hasOwnProperty('gsap') && container.gsap.animation ){
                        this.animate ( container , container.id )
                    }
                    if ( container.hasOwnProperty('blocks') ){
                        container.blocks.forEach ( el => {
                            if ( el.hasOwnProperty('gsap') && el.gsap.animation ){
                                this.animate ( el , el.id   )
                            }
                                if ( el.hasOwnProperty('blocks') ){
                                el.blocks.forEach ( element => {
                                        if ( element.hasOwnProperty('gsap') && element.gsap.animation ){
                                        this.animate ( element , element.id   )
                                    }
                                })
                            }
                            
                        })
                    }
                })
            }
        })
    }
}
</script>