<template>
    <div
        :id="doc.hasOwnProperty('anchor')? doc.anchor : $randomID()"
        v-if="doc" 
        :key="$randomID()" 
        :class="classe(doc.css) + ' flex-wrap'" :style="doc.style + ' ' +  background(doc)" :ref="doc.id">
        <template v-for="(block,b) in doc.blocks">
            
            <template v-for="article in $attrs.articles">
                
                <moka-element
                    :loop="true"
                    :article="article"
                    v-if="$isMokaElement(block)"
                    :key="$randomID()"
                    :element="block"/>

                <div
                    :key="$randomID()" 
                    :class="block.css.css + ' ' + block.css.container" 
                    :style="block.style" 
                    v-if="block && block.type!='grid' && !block.hasOwnProperty('slider') && block.hasOwnProperty('blocks') && !block.hasOwnProperty('menu')">
                    
                    <template v-for="element in block.blocks"> 
                        <moka-element
                            :loop="true"
                            :article="article"
                            v-if="$isMokaElement(element)"
                            :key="$randomID()"
                            :element="element"
                            />
                        <div v-if="element.type==='flex'" 
                            :key="$randomID()" 
                            :class="element.css.css + ' ' + element.css.container" 
                            :style="element.style">
                            <template v-for="nested in element.blocks">
                                <moka-element
                                    :loop="true"
                                    :article="article"
                                    v-if="$isMokaElement(nested)"
                                    :key="$randomID()"
                                    :element="nested"
                                />
                            </template>
                        </div>
                    </template>
                </div>
            </template>
        </template>
        <div class="w-ful p-2 cursor-pointer items-center justify-center flex flex-row">
            <i class="material-icons mr-2 text-2xl" @click="$store.dispatch('set_loop_action' ,'prev')">chevron_left</i>
            {{ paging.current }} / {{ paging.pages }}
            <i class="material-icons mr-2 text-2xl" @click="$store.dispatch('set_loop_action' ,'next')">chevron_right</i>
        </div>
    </div>

</template>

<script>
import queryArticles from '@/apollo/queries/article/articles-pagination.gql'
import MokaElement from '@/components/mokastudio/moka.element.loop'
import MokaSlider from '@/components/mokastudio/moka.slider'
import MokaContainer from '@/components/mokastudio/moka.preview.container'
import { mapState } from 'vuex'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];

export default {
    name: 'MokaPreviewContainerLoop',
    components: { MokaElement , MokaSlider , MokaContainer },
    props: [ 'doc'  ],
    data:()=>({
        start: 0,
        limit:8,
    }),
    computed:{
        ...mapState(['moka']),
        animations(){
            return gsapEffects
        },
        paging(){
            let pages = {
                current: 1,
                pages: Math.round(this.$attrs.articles.length/this.$attrs.limit)+1
            }
            this.$attrs.start > 0 ?
                pages.current = Math.round(this.$attrs.start/this.$attrs.limit)+1 
                    : null

            return pages
        }
    },
    apollo:{
        articles: {
            prefetch: true,
            query: queryArticles,
            variables(){
                return {
                    limit: parseInt(this.limit),
                    start: parseInt(this.start)
                }
            },
            update: data => data.articles 
        }  
    },
    methods:{
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
        animate(element,id){
            let vm = this
            if ( this.$refs && element.hasOwnProperty('gsap') && element.gsap.animation ){
                console.log ( 'animation for => ' , id , this.$refs[id] )
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
                        console.log ( 'start playing animation')
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
            console.log ( 'REFS=>' , this.$refs , ' => animation => ' , this.doc.gsap.animation )
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