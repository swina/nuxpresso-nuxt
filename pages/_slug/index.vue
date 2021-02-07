<template>
    <div>
        <nuxpresso-moka-template v-if="articles && !loaded" :doc="articles.blocks.json" :article="articles"/>    
        <div v-if="!articles" class="nuxpresso-modal p-4 md:p-10">
            <img src="/logo.png" class="w-48 m-auto"/>
            <h3>Ooooops the page your are looking for doesn't exists !</h3>
            <button @click="$router.push('/')">Return to Homepage</button>
        </div>
    </div>
</template>

<script>
import articleQuery from '@/apollo/queries/article/articles-slug'
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'
import { mapState }  from 'vuex'
export default {
    name: 'NuxpArticleSlug',
    components: {
        NuxpressoMokaTemplate
    },
    data:()=>({
        articles: [],
        loaded: false,
        template: null
    }),
    computed:{
        //...mapState ( ['settings','default_component'] ),
        /*
        template(){
            return this.articles.blocks.json
            //return this.articles.component ? 
                //this.articles.component.json : this.default_component.json
        },
        */  
    },
    head(){
        if ( this.articles ){
            return {
                title: this.articles.seo_title ? this.articles.seo_title : this.articles.title,
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    { hid: 'description', name: 'description', content: this.articles.seo_description ? this.articles.seo_description : this.settings.seo_description || '' }
                ]
            }
            
        }
        
        
    },
    async asyncData({app,route}){
        const data  = await app.apolloProvider.defaultClient.query({
            query : articleQuery,
            variables: {
                slug : route.params.slug 
            }
        })
        return {
            articles : data.data.articles[0]
        }
    }
  /*
    apollo:{
        articles :{
            query : articleQuery,
            variables() {
                return { slug : this.$route.params.slug }
            },
            watchLoading(loading){
                this.loaded = loading
            },
            update : data => data.articles[0]
        }
    },

    /*
    async asyncData({app,route}){
        const data  = await app.apolloProvider.defaultClient.query({
            query : articleQuery,
            variables: {
                slug : route.params.slug 
            }
        })
        return {
            articles : data.data.articles[0]
        }
    }
    */
}
</script>