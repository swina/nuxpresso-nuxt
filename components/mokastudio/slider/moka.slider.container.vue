<template>
    <div
        :id="doc && doc.hasOwnProperty('anchor')? doc.anchor : doc.id"
        v-if="doc"
        :animateMe="refreshAnimation"  
        :class="classe(doc.css)" :style="doc.style + ' ' +  background(doc)" :ref="doc.id">
        <template v-for="(block,b) in doc.blocks">
             
            <moka-element
                @click="elementAction"
                v-if="block && !block.hasOwnProperty('blocks') || block.hasOwnProperty('items')"
                :key="block.id"
                :el="block"
                :element="block" 
                :develop="false"/> 
            
            <moka-slider-container
                v-if="block && block.hasOwnProperty('blocks') && !block.hasOwnProperty('blocks_flip')" @action="elementAction" 
                :doc="block" :refreshAnimation="refreshAnimation"/>
            <!--<moka-slider :key="block.id" :ref="block.id" v-if="block && block.hasOwnProperty('slider')" :develop="true" :embeded="true" :doc="block" :editor="true"/>-->
            <moka-flipbox
                :key="block.id" 
                :ref="block.id" 
                v-if="block && block.hasOwnProperty('blocks_flip')" 
                :develop="false" 
                :embeded="true" 
                :doc="block" 
                :editor="true"/>
        </template>
        
    </div>

</template>

<script>
import MokaElement from '@/components/mokastudio/moka.element.component'
import MokaFlipbox from '@/components/mokastudio/moka.flipbox'
import { mapState } from 'vuex'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];

export default {
    name: 'MokaSliderContainer',
    components: { MokaElement , MokaFlipbox },
    props: [ 'doc'  ],
    computed:{
        ...mapState(['moka']),
        animations(){
            return gsapEffects
        },
        refreshAnimation(){
            if ( this.$attrs.current ){
                if ( this.$attrs.current === this.doc.id ){
                    this.animate ( this.doc , this.doc.id ) 
                    return true
                }
            }
            return false
        }
    },
    methods:{
        classe(css){
            if ( !css ) return 
            return css.hasOwnProperty('css') ? css.css + ' ' + css.container : css
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
                    ' background-image:url(' + this.$imageURL(block.image) + ');' :
                    '' : ''
                    
        },
        elementAction(action){
            this.$emit('action',action)
        },
        animate(element,id){
            if ( !element ) return 
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
        if ( !this.doc ) return
        if ( this.doc.hasOwnProperty('gsap') && this.doc.gsap.animation ){
            this.animate ( this.doc , this.doc.id )
        }
        
        return
        /*
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
        */
    }
}
</script>