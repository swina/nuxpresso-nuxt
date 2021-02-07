<template>
    <div v-if="element" :ref="el.id" :id="el.hasOwnProperty('anchor') && el.anchor?el.anchor:el.id" :style="el.style" element @click="element.hasOwnProperty('action') ? $emit('click',element.action) : null"> 
        <nuxt-link :to="'/' + $attrs.article.slug">
            <moka-element
                :article="$attrs.article"
                v-if="$isMokaElement(el) && el.tag!='form' && el.type != 'image'"
                :key="el.id"
                :el="el"
                :element="el"/> 
            <img v-if="el.type==='image' && $attrs.article.image" :src="$imageURL($attrs.article.image)" :class="el.css" :style="el.style" :alt="$attrs.article.image.alternativeText||$attrs.article.title" :title="$attrs.article.image.caption||$attrs.article.title"/>
        </nuxt-link>
         <!--<nuxt-link :class="el.css" :to="'/' + $attrs.article.slug">           
            <component :class="$cssResponsive(el.css)" :is="tag" v-html="el.content" v-if="(el.tag==='element' || el.type==='button')  && el.element !='img' && el.type != 'video' && el.type != 'audio' && !el.link" :style="stile"></component>
            <a v-if="el.link" :href="el.link">
                <component :class="$cssResponsive(el.css)" :is="tag" v-html="el.content" v-if="(el.tag==='element' || el.type==='button')  && el.element !='img' && el.type != 'video' && el.type != 'audio'" :style="stile"></component>
            </a>

            <component :style="stile" :class="$cssResponsive(el.css)" :is="tag" v-if="el.tag === 'article' && el.label!='image'" v-html="$attrs.article[el.label]"/>
            

            <div :style="stile" :class="$cssResponsive(el.css)" :is="tag" v-if="el.tag === 'article' && el.label!='image' && el.label==='category' && $attrs.article.categories">
                Categories: <span v-if="!$attrs.article.categories.length">NA</span>
                <template v-for="cat in $attrs.article.categories">
                    <span class="capitalize mr-2">{{ cat.name }}</span>
                </template>
            </div>

            <svg v-if="el.tag === 'svg'" width="100%" height="100%" :viewBox="el.content.viewBox" v-html="el.content.g" :class="el.css + ' fill-current'"></svg>
 
            <img v-if="el.tag === 'article' && el.label==='image' && $attrs.article[el.label]" :src="$attrs.article[el.label].url" :class="el.css"/>

            <img v-if="el.element === 'img' && el.image && el.image.url && el.image.ext != '.svg' && el.image.ext != '.mp4'" :src="el.image.url" :caption="el.image.caption" :alt="el.image.alternative_text" :class="$cssResponsive(el.css)"/>
            
            <div v-if="(el.element === 'img')  && el.image && el.image.ext === '.svg'" :class="el.css + ' fill-current'">     
                <simple-svg :src="el.image.url" width="100%" height="100%"/>
            </div>

            <video  :class="$cssResponsive(el.css)" v-if="el.type==='video' && el.image && el.image.url" :autoplay="el.hasOwnProperty('autoplay')?el.autoplay:true" 
            :controls="el.hasOwnProperty('controls')?el.controls:true"
            :loop="el.hasOwnProperty('loop')?el.loop:true">
                <source :src="el.image.url">
            </video>

            
        </nuxt-link> -->
            
        <!--
            <input :type="el.type" v-if="el.tag === 'input' && el.type!='button'" :class="$cssResponsive(el.css)" :value="el.content" :placeholder="el.required?'required!':''"/><sup v-if="el.required" class="ml-1 nuxpresso-element-required">*</sup>

            <i v-if="el.tag==='icon' && !el.link" :class="'material-icons moka-icons ' + $cssResponsive(el.css)">{{el.content}}</i>

            <a v-if="el.link && el.tag==='icon'" :href="el.link">
                <i v-if="el.tag==='icon'" :class="'material-icons moka-icons ' + $cssResponsive(el.css)">{{el.content}}</i>
            </a>
            <textarea v-if="el.element === 'textarea'" :class="$cssResponsive(el.css)"></textarea>

            <nav v-if="el.element === 'menu'" :class="menu_responsive(el) + ' z-top ' + el.css.align"> 
                <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative pr-4'" :key="el.id + '_' + i"> 

                    <nuxt-link :class="el.css.css" v-if="!item.submenu && !$attrs.develop && item.link && !item.link.includes('http')" :to="item.link">{{ item.label }} <i v-if="item.submenu" class="material-icons moka-icons">arrow_drop_down</i></nuxt-link>
                    
                    <div v-else @mouseover="menuover=i" :class="el.css.css" @click="menuover=i">{{item.label}} <i v-if="item.submenu && item.submenu.length" :class="el.css.css + ' material-icons moka-icons text-sm'">arrow_drop_down</i></div>
                    
                    <div v-if="item.submenu && item.submenu.length" :class="isOver(i) + ' ' + el.css.css + ' absolute w-48 p-1 flex flex-col z-top'" @mouseleave="menuover=-1"> 
                        <div v-for="sub in item.submenu">
                            <nuxt-link :key="sub.label" :class="el.css.css" :to="sub.link">{{ sub.label }}</nuxt-link>
                        </div>
                    </div>
                </div>
            </nav>
            <i :class="'material-icons moka-icons z-top fixed md:hidden top-0 left-0 m-1 ' + el.css.css" v-if="el.element === 'menu' && el.responsive" @click="menu_show=!menu_show">menu</i>
            <transition name="fade">
            <nav v-if="el.element === 'menu' && menu_show" class="absolute top-0 left-0 right-0 bottom-0 z-top h-screen flex flex-col p-1 my-2"> 
                <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative p-1'"> 
                    
                    <nuxt-link :class="el.css.css" v-if="!item.submenu && !$attrs.develop && item.link && !item.link.includes('http')" :to="item.link">{{ item.label }} <i v-if="item.submenu" class="material-icons moka-icons">arrow_drop_down</i></nuxt-link>
                    
                    <div v-else @mouseover="menuover=i" :class="el.css.css" @click="menuover=i">{{item.label}} <i v-if="item.submenu && item.submenu.length" :class="el.css.css + ' material-icons moka-icons text-sm'">arrow_drop_down</i></div>
                    
                    <div v-if="item.submenu && item.submenu.length" :class="isOver(i) + ' ' + el.css.css + ' absolute w-48 z-top p-1 flex flex-col'" @mouseleave="menuover=-1"> 
                        <div v-for="sub in item.submenu">
                            <div :class="el.css.css">{{sub.label}}</div>
                        </div>
                    </div>
                </div>
            </nav>
            </transition>
            -->
    </div>
</template>

<script>
import MokaElement from '@/components/mokastudio/moka.element.component'
import { mapState } from 'vuex'
 
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];

export default {
    data:()=>({
        el: null,
        article: 'article',
        opacity: 'opacity-0',
        menuover: -1,
        menu_show: false,
    }),
    components:{
        MokaElement
    },
    props: ['current'],
    /*
    beforeMount(){
        let vm = this
        this.article = 'article[' + this.$attrs.element.field + ']'
        if ( this.$attrs.element.element === 'article' && this.$attrs.element.id ){
            this.$axios.$get ( 'articles/' + this.$attrs.element.id ).then ( response => {
                vm.article = response[this.$attrs.element.field]
                return Promise.resolve(response)
            })
        }
    },
    */
    computed:{
        ...mapState ( ['moka'] ),
        element(){
            this.$attrs.element ?
                this.el = Object.assign ( {} , this.$attrs.element ) : false
            this.el["content"] = this.$attrs.article[this.$attrs.element.label]
            return this.el
        },

        tag(){
            return this.$attrs.element.element === 'h' ? 'h' + this.$attrs.element.level : 
                    this.$attrs.element.element
        },
        stile(){
            if (this.el.image ){
                return 'background-image:url(' + this.el.image.url + ');background-repeat:no-repeat; background-size:cover;background-position:center center; ' + this.el.style  
            }
            return ''
        },
        
        animations(){
            return gsapEffects
        }
        
    },
    methods:{
        /*
        element(){
            if ( this.$attrs.element ) {
                let image = null
                this.$attrs.element.type === 'image' ?
                    image = Object.assign ( {} , this.$attrs.article.image ) : null

                console.log ( 'image => ' , image )
                this.el = Object.assign ({} , this.$attrs.element )
                this.el.type === 'image' ?
                    this.el.image = Object.assign ( {} , image )
                    //this.el.image = Object.assign ( {}  , this.$attrs.article[this.$attrs.element.label] ) 
                    : this.el.content = this.$attrs.article[this.$attrs.element.label]
                return this.el
            } else {
                return false
            }
        },
        */
        animation(element,id){
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
                    start: "top 99.99%",
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
        responsiveCss(css){
            return css //this.$clean ( this.$cssResponsive ( css ) )
        },
        isOver(i){
            return i < 0 ? 'opacity-0' : this.menuover === i ? 'opacity-100' : 'opacity-0'
        },
        menu_responsive(menu){
            if ( menu.type === 'horizontal' && menu.responsive ) return 'hidden flex flex-col md:flex md:flex-row' 
            if ( menu.type === 'horizontal' && !menu.responsive ) return menu.css.container
            if ( menu.type === 'vertical' ) return 'flex flex-col'
        }
    },
    mounted(){
        //if ( this.$attrs.sub ){
            this.animation(this.element,this.element.id)
        //}
    }
}
</script>   