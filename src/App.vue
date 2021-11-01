<template>
<Header/>
<router-view/>
<Footer></Footer>
<vue-progress-bar></vue-progress-bar>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { getCurrentInstance } from "vue";
import router from './router';

export default {
  setup(){
    const internalInstance = getCurrentInstance();
    router.beforeEach((to) => {
      if (to.meta.progress !== undefined) {
          let meta = to.meta.progress;
          // parse meta tags
          internalInstance.appContext.config.globalProperties.$Progress.parseMeta(meta);
        }
        //  start the progress bar
        internalInstance.appContext.config.globalProperties.$Progress.start();
        //  continue to next page
    })
    router.afterEach(() => {
        //  finish the progress bar
        internalInstance.appContext.config.globalProperties.$Progress.finish();
      });
  },
  name: 'App',
  components: {
    Header,
    Footer
  },


  
}
</script>

<style>

</style>
