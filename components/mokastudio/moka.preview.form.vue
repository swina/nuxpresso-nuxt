<template>
    <form
        data-netlify="true"
        data-netlify-recaptcha="true"
        :name="doc.action"
        @submit.prevent="onSubmit" 
        :id="doc.hasOwnProperty('anchor')? doc.anchor : doc.id"
        v-if="doc"
        :class="$classe(doc.css)" :style="$stile(doc) + ' ' +  $background(doc)" :ref="doc.id" :validate="validation">
        
        <template v-for="(block,b) in doc.blocks">
             <moka-element
                :article="$attrs.article"
                v-if="$isMokaElement(block) && block.tag!='form' && !sent"
                :key="block.id"
                :el="block"
                :element="block"
                @change="assignValue"/> 

            <moka-preview-form

                :key="block.id"
                :form="false"
                :loop="$attrs.loop"
                :article="$attrs.article"
                v-if="$isMokaContainer(block,doc) && !sent"
                :doc="block"/>
        </template>
        <div class="mt-2 w-full bg-gray-800 p-2 clear-both text-xl" v-if="response" :class="responseClass" v-html="response"></div>
    </form>

</template>

<script>
import MokaElement from '@/components/mokastudio/moka.element.component'
import MokaPreviewContainer from '@/components/mokastudio/moka.preview.container'
import  validator from 'validator'
import { mapState } from 'vuex'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];
import axios from 'axios'

export default {
    name: 'MokaPreviewForm',
    components: { MokaElement , MokaPreviewContainer  },
    props: [ 'doc'  ],
    data:()=>({
        form: null,
        action: null,
        response: '',
        enabled: true,
        responseClass: '',
        requiredFields:{},
        requiredError:{},
        fields:{},
        isValid: false,
        sent: false
    }),
    computed:{
        ...mapState(['moka']),
        animations(){
            
            return gsapEffects
        },
        validation(){
            /*
            if ( !process.client ) return 

            if ( !this.fields ) { this.isValid = true }
            if ( this.fields ){
                Object.keys(this.fields).map ( f => {
                    console.log ( 'validating field ...' , f.name )
                    this.requiredFields[f].field.type === 'text' ?
                        this.fields[field.name].length > 3 ? this.isValid = true : this.isValid = false : null
                })
            }
            */
            return this.isValid
        }
    },
    methods:{
        fieldRequired(block){
            return this.requiredError[block.name] ? 'border-red-500' : ''
        },
        validate(value,name){
            if ( this.requiredFields[name] ){
                if ( this.requiredFields[name].element === 'input' ){
                    
                    if ( value.length < 3 ){
                       this.requiredError[name] = true     
                    } else {
                        this.requiredError[name] = false
                    }
                }
            }
            return value
        },
        validateForm(){
            Object.keys(this.requiredFields).map ( f => {
                if ( this.requiredFields[f].type === 'text' ){
                    if ( validator.isLength ( this.fields[f] , { min: 2 , max: 100 } ) ){
                        this.isValid = true
                    } else {
                        this.requiredError[f] = 'missing or too short'
                    }
                }
                if ( this.requiredFields[f].type === 'email' ){
                    if ( validator.isEmail ( this.fields[f] ) ) { 
                        this.isValid = true 
                    } else {
                        this.requiredError[f] = 'not valid email'
                    } 
                }
            })
        },
        assignValue(value,name){
            this.fields[name] = this.validate(value,name)
        },
        async onSubmit(event) {
            if ( !this.enabled ) return
            let formData = new FormData(event.target);
            var data = {}; 
            formData.forEach(function(v,k) { data[k]=v; })
            let vm = this
            
            this.validateForm()
            if ( this.isValid ){
                this.sent = true
                vm.response = '<p class="animate-pulse">Sendig your request ...</p>'
                vm.responseClass = 'text-blue-400'
                this.enabled = false
                fetch( this.doc.action || process.env.emailSender , {
                    mode: 'no-cors',
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(data).toString()
                }).then(() => {
                    console.log('Form successfully submitted')
                    vm.responseClass = 'text-green-400'
                    vm.response = vm.doc.success || 'Your form was successfully submitted'
                    vm.enabled = true
                    vm.sent = true
                }).catch((error) => {
                    vm.sent = false
                    vm.response = vm.doc.error || 'An error occured. Please retry later.'
                    vm.responseClass = 'text-red-500'
                    vm.enabled = true
                })
                
               /*
                this.$axios.post ( 
                    vm.doc.action, data ).then ( resp => {
                    vm.responseClass = 'text-green-400'
                    vm.response = vm.doc.success || 'Your form was successfully submitted'
                    //vm.clearForm()
                    vm.enabled = true
                    vm.sent = true
                }).catch ( error => {
                    vm.sent = false
                    vm.response = vm.doc.error || 'An error occured. Please retry later.'
                    vm.responseClass = 'text-red-500'
                    vm.enabled = true
                })
                */
            } else {
                let msg = '<ul class="text-sm">'
                Object.keys(this.requiredError).map ( f => {
                    msg += '<li><span class="capitalize">' + f + '</span> ' + this.requiredError[f] + '</li>'
                })
                vm.response = 'Please fill the form with the required fields.' + msg + '</ul>'
                vm.responseClass = 'text-red-500'
                vm.enabled = true
            }
            
            return null
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
        this.doc.blocks.forEach(block=>{
            if ( block.element === 'input' ){
                this.fields[block.name] = ''
                if ( block.required ){
                    this.requiredFields[block.name] =  block 
                }
            }
            if ( block.type === 'textarea'){
                this.fields[block.name] = ''
            }
        })
        window.scrollTo(0,0)
        if ( this.doc.hasOwnProperty('gsap') && this.doc.gsap.animation ){
            //console.log ( 'REFS=>' , this.$refs , ' => animation => ' , this.doc.gsap.animation )
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