<template>
  <div id="nuxpresso-page">
    <nuxt/>
    <scroll-top v-if="settings && settings.scrolltop"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ScrollTop from '@/components/ScrollTop'
export default {
  middleware: 'load-initial-data',
  name: 'NuxpLayout',
  components: {
    ScrollTop
  },
  computed: {
    ...mapState ( ['settings'] )
  }
}
</script>
