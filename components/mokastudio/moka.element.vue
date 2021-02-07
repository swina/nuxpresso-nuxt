<template>
    <div v-if="element" :ref="element.id" :id="el.hasOwnProperty('anchor') && el.anchor?el.anchor:el.id" :style="element.style" element @click="element.hasOwnProperty('action') ? $emit('click',element.action) : null"> 
            

            <component :class="$classe(el.css)" :is="tag" v-html="el.content" v-if="(el.tag==='element' || el.type==='button')  && el.element !='img' && el.type != 'video' && el.type != 'audio' && !el.link && !el.action" :style="$stile(el.style)"></component>
            
            <nuxt-link v-if="el.link" :to="el.link">
                <component :class="$classe(el.css)" :is="tag" v-html="el.content" v-if="(el.tag==='element' || el.type==='button')  && el.element !='img' && el.type != 'video' && el.type != 'audio'" :style="$stile(el.style)"></component>
            </nuxt-link>


            <!-- form action -->
            <component :class="$classe(el.css)" :is="tag" v-html="el.content" v-if="(el.tag==='element' || el.type==='button')  && el.element !='img' && el.type != 'video' && el.type != 'audio' && !el.link && el.action" :style="$stile(el.style)" @click="doAction(el.action)"></component>



            <component :style="stile" :class="$classe(el.css)" :is="tag" v-if="el.tag === 'article' && el.label!='image'" v-html="$attrs.article[el.label]"/>
            <!--<component :class="$cssResponsive(el.css)" :is="tag" v-if="el.tag === 'article'" v-html="el.content"/>-->

            <svg v-if="el.tag === 'svg'" width="100%" height="100%" :viewBox="el.content.viewBox" v-html="el.content.g" :class="el.css + ' fill-current'"></svg>
 
            <!--<component :ref="element.id" :class="$cssResponsive(el.css)" :is="tag" v-if="el.type === 'video'" :src="el.src + el.content"/>-->
            
            <img v-if="el.tag === 'article' && el.label==='image' && $attrs.article[el.label]" :src="$attrs.article[el.label].url" :class="$classe(el.css)"/>

            <img v-if="el.tag === 'article' && el.label==='image' && $attrs.article.featured_image" :src="$attrs.article.featured_image" :class="$classe(el.css)"/>

            <img v-if="el.element === 'img' && el.image && el.image.url && el.image.ext != '.svg' && el.image.ext != '.mp4'" :src="el.image.url" :caption="el.image.caption" :alt="el.image.alternative_text" :class="$classe(el.css)"/>
            
            <div v-if="(el.element === 'img')  && el.image && el.image.ext === '.svg'" :class="$classe(el.css) + ' fill-current'">     
                <simple-svg :src="el.image.url" width="100%" height="100%"/>
            </div>

            <video  :class="$classe(el.css)" v-if="el.type==='video' && el.image && el.image.url" :autoplay="el.hasOwnProperty('autoplay')?el.autoplay:true" 
            :controls="el.hasOwnProperty('controls')?el.controls:true"
            :loop="el.hasOwnProperty('loop')?el.loop:true">
                <source :src="el.image.url">
            </video>

            <!--<img :ref="element.id" v-if="el.element === 'img' && !el.image" src="../assets/no-image.png" :class="$cssResponsive(el.css)"/>-->
            
            <input :type="el.type" :name="el.name" :placeholder="el.placeholder" v-if="el.tag === 'input' && el.type!='button' && el.element!='textarea'" :class="$classe(el.css)" :value="el.content"/><sup v-if="el.required" class="ml-1 nuxpresso-element-required">*</sup>

            <!-- icon -->
            <i v-if="el.tag==='icon' && !el.link" :class="'material-icons moka-icons ' + $classe(el.css)">{{el.content}}</i>

            <a v-if="el.link && el.tag==='icon'" :href="el.link">
                <i v-if="el.tag==='icon'" :class="'material-icons moka-icons ' + $classe(el.css)">{{el.content}}</i>
            </a>
            <textarea v-if="el.element === 'textarea'" :name="el.name" :placeholder="el.placeholder" :class="$classe(el.css)"></textarea>

            <nav v-if="el.element === 'menu'" :class="menu_responsive(el) + ' z-top ' + el.css.align"> 
                <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative pr-4'" :key="el.id + '_' + i"> 

                    <nuxt-link :class="el.css.css" v-if="!item.submenu && !$attrs.develop && item.link && !item.link.includes('http')" :to="item.link">{{ item.label }} <i v-if="item.submenu" class="material-icons moka-icons">arrow_drop_down</i></nuxt-link>
                    
                    <div v-else @mouseover="menuover=i" :class="el.css.css" @click="menuover=i">{{item.label}} <i v-if="item.submenu && item.submenu.length" :class="el.css.css + ' material-icons moka-icons text-sm'">arrow_drop_down</i></div>
                    
                    <div v-if="item.submenu && item.submenu.length" :class="isOver(i) + ' ' + el.css.submenu + ' absolute flex flex-col z-top'" @mouseleave="menuover=-1"> 
                        <div v-for="sub in item.submenu">
                            <nuxt-link :key="sub.label" :class="el.css.css" :to="sub.link">{{ sub.label }}</nuxt-link>
                        </div>
                    </div>
                </div>
            </nav>
            <i :class="'material-icons moka-icons z-top fixed text-2xl md:hidden top-0 left-0 m-1 ' + el.css.css" v-if="el.element === 'menu' && el.responsive" @click="menu_show=!menu_show">menu</i>
            <transition name="fade">
            <nav v-if="el.element === 'menu' && menu_show" class="absolute top-0 left-0 right-0 bottom-0 z-top h-screen flex flex-col p-1 my-2"> 
                <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative p-1'"> 
                    
                    <nuxt-link :class="el.css.css" v-if="!item.submenu && !$attrs.develop && item.link && !item.link.includes('http')" :to="item.link">{{ item.label }} <i v-if="item.submenu" class="material-icons moka-icons">arrow_drop_down</i></nuxt-link>
                    
                    <div v-else @mouseover="menuover=i" :class="el.css.css" @click="menuover=i">{{item.label}} <i v-if="item.submenu && item.submenu.length" :class="el.css.css + ' material-icons moka-icons text-sm'">arrow_drop_down</i></div>
                    
                    <div v-if="item.submenu && item.submenu.length" :class="isOver(i) + ' ' + el.css.css + ' absolute w-48 z-top p-1 flex flex-col'" @mouseleave="menuover=-1"> 
                        <div v-for="sub in item.submenu">
                            <nuxt-link :to="sub.link" :class="el.css.css">{{sub.label}}</nuxt-link>
                        </div>
                    </div>
                </div>
            </nav>
            </transition>
    </div>
</template>

<script>
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
    props: ['current'],
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
    computed:{
        ...mapState ( ['moka'] ),
        element(){
            return this.$attrs.element  ? this.el = this.$attrs.element : false
        },
        tag(){
            return this.$attrs.element.element === 'h' ? 'h' + this.$attrs.element.level : 
                    this.$attrs.element.element
        },
        stile(){
            if (this.el.image ){
                return 'background-image:url(' + this.el.image.url + '); ' + this.el.style  
            }
            return ''
        },
        animations(){
            return gsapEffects
        }
        
    },
    methods:{
        doAction(action){
            console.log ( 'submit form')
        },
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
        /*
        responsiveCss(css){
            return css //this.$clean ( this.$cssResponsive ( css ) )
        },
        */
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