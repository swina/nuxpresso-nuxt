<template>
    <div 
        :id="doc && doc.hasOwnProperty('anchor')? doc.anchor : doc.id"
        v-if="doc && doc.blocks.length" 
        :key="doc.id"
        :class="'overflow-hidden flex flex-no-wrap '+ classe(doc.css)" :style="doc.style + ' ' +  background(doc)" :ref="doc.id" @click="next()" @mouseover="index=1" @mouseleave="index=0">
        
            <template v-for="(block,i) in doc.blocks">

                 <moka-element
                    v-if="block && !block.hasOwnProperty('blocks') && !block.hasOwnProperty('blocks') || block.hasOwnProperty('items')"
                    @click="elementAction"
                    :key="block.id"
                    :el="block"
                    :develop="false"/> 

                  <moka-preview-single-container 
                    v-if="block.hasOwnProperty('blocks')"
                    :key="block.id"
                    :doc="block"
                    :component="$attrs.component"
                    :top="false"
                    :flipside="i"
                    :master="doc.id"
                    :index="i"
                    :id="doc.id+i"
                    :level="parseInt($attrs.level)+1" 
                    :zi="$attrs.zi + parseInt($attrs.level)"
                    class="absolute top-0 left-0 right-0 bottom-0"
                    style="backface-visibility: hidden;"/>
                  
            </template>
            
    </div>

</template>

<script>
import MokaElement from './moka.element.component'
import MokaPreviewSingleContainer from './moka.preview.single.container'
import { mapState } from 'vuex'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];
import  AlloyFinger from 'alloyfinger'
export default {
    name: 'MokaFlipboxContainer',
    data:()=>({
        index: 0,
        timer: null,
        current: null,
        currentID: null,
        loaded: false
    }),
    components: { MokaElement  , MokaPreviewSingleContainer },
    props: [ 'doc'  ],
    computed:{
        ...mapState(['moka']),
        animations(){
            return gsapEffects
        }
    },
    watch:{
        index(v){
            if ( this.doc ){
                this.next()
            }
        }
    },
    methods:{
        elementAction(action){
            this.$emit('action',action)
        },
        getIndex(i){
            if ( i === 1 ){
                return ' opacity-0 '
            }
            return ''
        },
        dotActive(n){
          let css = this.doc.slider.dots.css ? this.doc.slider.dots.css : 'text-black'
          return (n-1) === this.index ? css + ' animate-ping' : css + ' rounded-full'
        },
        hasSlideAction(action){
            action === 'slider_next' ? 
                    this.next(1) : 
                        action === 'slider_prev' ? this.next(-1)
                             : null
        },
        next(){
            if ( !this.$attrs.master ){
                let backCard
                let master = this.doc.id
                
                if ( this.$attrs.master ){
                    master = this.$attrs.master
                }
                this.index === 0 ? 
                    backCard = 1 : 
                        backCard = 0
                let tl = gsap.timeline()
                    tl.to ( '#' + master + this.index , {opacity:1,rotationY:0 ,duration: .5})
                    tl.to ( '#' + master + backCard , {opacity:0 , rotationY:180 , duration: .5});
            }
            this.loaded = true
        },
        classe(css){
          if ( !css ) return
          let flipbox = ''
          console.log ( this.doc )
          this.doc.hasOwnProperty('image_flip') ? flipbox = ' relative ' : null
          return css.hasOwnProperty('css') ? css.css + ' ' + css.container + flipbox : css + flipbox
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
              ' background-image:url(' + this.$imageURL(block.image) + ');' : ''
        },
        animate(element,id){
            if ( !element ) return 
            let vm = this
            if ( this.$refs && element.hasOwnProperty('gsap') && element.gsap.animation ){

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
      if ( !this.doc.blocks.length ) return 
        this.next()
        let container = this.$refs[this.doc.id]
        let slider = new AlloyFinger ( container , {
          swipe:(evt)=>{
            if ( evt.direction === 'Left' ) {
              (this.index+1) < this.doc.blocks.length ?
                this.goTo(this.index+1) :
                  this.goTo(0)
            }
            if ( evt.direction === 'Right' ) {
              (this.index) > 0 ?
                this.goTo(this.index-1) :
                  this.goTo(this.doc.blocks.length-1)
            }
          },
          doubleTap:(evt)=>{
            (this.index+1) < this.doc.blocks.length ?
                this.goTo(this.index+1) :
                  this.goTo(0)
          },
        })
    },
    beforeDestroy(){
      console.log ( 'destroy timer ...' )
      clearInterval(this.timer)
      this.timer = null
    }
}

</script>
<style>
.xslide {
  height: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  position: relative;
  float: left;
}
</style>