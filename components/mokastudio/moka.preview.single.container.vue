<template>
    <div 
        :id="doc.hasOwnProperty('anchor')? doc.anchor : doc.id"
        v-if="doc"
        :class="classe(doc.css)" :style="doc.style + ' ' +  $background(doc)" :ref="doc.id">
        <template v-for="(block,b) in doc.blocks">

            <moka-element
                @click="elementAction"
                v-if="block && !block.hasOwnProperty('blocks') || block.hasOwnProperty('items')"
                :key="block.id"
                :el="block"
                :element="block" 
                :develop="false"/>  
            
            <moka-preview-single-container
                :key="block.id"
                :component="$attrs.component"
                :top="false"
                :index="b"
                :level="parseInt($attrs.level)+1" 
                v-if="block && block.hasOwnProperty('blocks')" 
                :doc="block"/>
        </template>     
       
    </div>

</template>

<script>
import MokaElement from './moka.element.component'
//import MokaSingleContainer from '@/components/editor/preview/moka.preview.single.container'
import { mapState } from 'vuex'
export default {
    name: 'MokaPreviewSingleContainer',
    components: { MokaElement },
    props: [ 'doc' , 'coords' ,'pos' ],
    data:()=>({
        index: 0,
        position: null,
        modal:true
    }),
    computed:{
        ...mapState(['moka','editor']),
        zindex(){
            return this.$attrs.level < 1 ? 'auto' : this.$attrs.level < 2 ? 1 : 
                this.$attrs.level //    this.$attrs.zi
        },
        root(){
            return this.$attrs.top ? 0 : parseInt(this.$attrs.level)
        }
        
    },
    methods:{
        elementAction(action){
            this.$emit('action',action)
        },
        
        classe(css){
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
            if ( !block ) return ''
            return this.$imageURL(block.image) //this.$imageURL ( block.image )

            return block.hasOwnProperty('image') ?
                    block.image && block.image.url ? 
                        ' background-image:url(' + this.$imageURL(block.image) + ');' :
                             ''  : ''
        },
        
        setImageBackground(image){ 
            if ( !image ) return ''
            let response = ' background-image:url(' +  this.$imageURL(image) + ')' //theImg + ');'
            return response
        }
    },

}
</script>