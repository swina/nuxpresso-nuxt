<template>
  <div class="max-w-screen w-screen">
    <client-only>
      <nuxpresso-moka-template v-if="homepage" :doc="homepage.blocks.json" :article="homepage"/>
    </client-only>
  </div>
</template>

<script>
import qryHome from '@/apollo/queries/article/article-home'
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'
import { mapState } from 'vuex'
export default {
  name: 'NuxpMain',
  components: {
    NuxpressoMokaTemplate
  },
  data:()=>({
    template:null
  }),
  
  head(){
        return {
            title: this.homepage.seo_title ? this.homepage.seo_title : this.homepage.title,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { 
                  hid: this.homepage.seo_title, 
                  name: 'description', 
                  content: this.homepage.seo_description ? this.homepage.seo_description : this.settings.seo_description
                }
            ]
        }
        
        
  },
  computed: {
    ...mapState( ['settings'] ),
  },
  
  async asyncData({app}){
    const data  = await app.apolloProvider.defaultClient.query({
      query : qryHome,
    })
    return {
      homepage : data.data.articles[0]
    }
  }
  
}
</script>
