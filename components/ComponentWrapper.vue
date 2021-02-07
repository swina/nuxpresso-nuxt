<template>
    <span>
        <nuxt-link 
            v-if="$attrs.route"
            :to="$attrs.route">
            <component :is="loadcomponent" :class="'nuxpresso-' + $attrs.classe.toLowerCase()" :options="$attrs.options"/>
        </nuxt-link>
        <component v-else :is="loadcomponent" :class="'nuxpresso-' + $attrs.classe.toLowerCase()" :options="$attrs.options"/>
    </span>    
</template>

<script>
export default {
    computed:{
         loadcomponent(){
            let chunk = this.$attrs.name
            return () =>  import(/* webpackChunkName: 'nuxpresso_' */ '~/components/widgets/' + this.$attrs.name)
        },
    }
}
</script>