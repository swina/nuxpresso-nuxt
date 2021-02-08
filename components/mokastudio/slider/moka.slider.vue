<template>
    <div 
        :id="doc && doc.hasOwnProperty('anchor')? doc.anchor : doc.id"
        v-if="doc" 
        :key="doc.id"
        :class="'content max-w-screen overflow-x-hidden relative flex flex-no-wrap block ' + classe(doc.css)" :style="doc.style + ' ' +  background(doc)" :ref="doc.id">
        
            <template v-for="(block,i) in doc.blocks">
                  <moka-preview-container
                  :class="'slide flex-none top-0 left-0 right-0 bottom-0 w-full slide_' + i"
                  v-if="block && block.hasOwnProperty('blocks') && !block.hasOwnProperty('menu')" 
                  :doc="block" @action="hasSlideAction" :current="current"/>
            </template>
            
            
            <div v-if="doc.slider.dots.enable" class="absolute bottom-0 left-0 text-center flex-row justify-center items-center mb-10 md:mb-4 w-full">
              <i :class="'material-icons mr-2 ' + dotActive(n)" v-for="n in doc.blocks.length" @click="goTo(n-1)">fiber_manual_record</i>
            </div>

            <div v-if="doc.slider.navigation.enable">
              <div :class="'absolute top-0 left-0 h-full flex justify-center items-center p-1 ' + over" @click="goTo(index-1)">
                <i :class="'slider-navigation-icon material-icons text-4xl ' + doc.slider.navigation.css">{{ doc.slider.navigation.icons[0]}}</i>
              </div>
              <div :class="'absolute top-0 right-0 h-full flex justify-center items-center p-1 ' + over" @click="goTo(index+1)">
                <i :class="'slider-navigation-icon material-icons text-4xl ' + doc.slider.navigation.css">{{ doc.slider.navigation.icons[1]}}</i>
              </div>
            </div>
            <div v-if="doc.slider.buttons" :class="'absolute left-0 text-center hidden md:flex md:flex-row justify-center items-center my-2 w-full ' + doc.slider.buttons_position">
              <template v-for="(slide,n) in doc.blocks">
                <button :class="'mx-1 capitalize '  + buttonsClass" @click="goTo(n)">{{ slide.name || 'slide' + (n+1) }}</button>
              </template>

        </div>
    </div>

</template>

<script>
import MokaElement from '@/components/mokastudio/moka.element'
import MokaPreviewContainer from '@/components/mokastudio/slider/moka.slider.container'
import { mapState } from 'vuex'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];
import  AlloyFinger from 'alloyfinger'
export default {
    name: 'MokaPreviewSlider',
    data:()=>({
        index: -1,
        timer: null,
        current: null,
    }),
    components: { MokaElement , MokaPreviewContainer },
    props: [ 'doc'  ],
    computed:{
        ...mapState(['moka']),
        animations(){
            return gsapEffects
        },
        slides(){
            
            return this.doc.blocks.length
        },
        over(){
          return this.doc.slider.navigation.hover ? 'opacity-0 hover:opacity-100' : ''
        },
        buttonsClass(){
          let css = this.doc.slider.buttons_css ? ' ' + this.doc.slider.buttons_css : ''
          css += this.doc.slider.buttons_text ? ' ' + this.doc.slider.buttons_text : ''
          return css
        }
    },

    methods:{
        dotActive(n){
          let css = this.doc.slider.dots.css ? this.doc.slider.dots.css : 'text-black'
          return (n-1) === this.index ? css + ' animate-ping' : css + ' rounded-full'
        },
        goTo(n){
          if ( n < 0 ) return 
          if ( n > this.doc.blocks.length -1 ) return
          this.index = n
          this.current = this.doc.blocks[n].id
          let tl = gsap.timeline()
            if ( document.querySelector('.slide') ){
              tl.to ( '.slide' , { opacity:0 , duration: .4 } ),
              tl.to ( '.slide' , { xPercent: -this.index*100 , opacity:.5 , duration: .5 } ),
              tl.to ( '.slide' , { opacity:1 , duration: .5 })
            }
        },
        playslides ( sec ){
            console.log ( 'playing each ' + sec + ' secs' )
            let vm = this
            this.timer = window.setInterval( function(){
                vm.next(1)
            },parseInt(sec)*1000)
            
        },
        hasSlideAction(action){
            action === 'slider_next' ? 
                    this.next(1) : 
                        action === 'slider_prev' ? this.next(-1)
                             : null
        },
        next(n){
          if ( !this.doc ) return  
          if ( process.client ){
              this.index < (this.doc.blocks.length + n) ? this.index += n : this.index = 0
              this.index < 0 ? this.index = 0 : null
              this.index >= this.doc.blocks.length ? this.index = 0 : null
              //this.current = this.doc.blocks[this.index].id
                let tl = gsap.timeline()
                if ( document.querySelector('.slide') ){
                  tl.to ( '.slide' , { xPercent: -this.index*100 , opacity:1 , duration: 1.5 } )
                }
              }
            
        },
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
                    block.image.previewUrl ? 
                        ' background-image:url(' + block.image.previewUrl + ');background-size:cover;background-repeat:no-repeat;' :
                            ' background-image:url(' + block.image.url + ');' : ''  : ''        
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
        this.next()
        if ( parseInt(this.doc.slider.delay) > 0 ){
          this.playslides ( this.doc.slider.delay )
        }
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
      //console.log ( 'destroy timer ...' )
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