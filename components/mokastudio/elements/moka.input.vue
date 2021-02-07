<template>
    <input :type="el.type" :id="el.id" :name="el.name" :class="$cssResponsive(el.css)" :value="el.content" :placeholder="el.required?'required!':''" v-model="fieldValue"/>
</template>

<script>
export default {
    name: 'MokaInputElement',
    props:['el'],
    data:()=>({
        fieldValue: ''
    }),
    watch:{
        fieldValue(v){
            this.$emit('changed',v,this.el.name)
        }
    },
}
</script>