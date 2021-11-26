<template>
  <div class="mx-5 mb-5">
    <h3 class="judul"> Kategory</h3>
    <hr style="height: 4px" class="bg-primary">
    <div class="row" v-if="categories.length > 0">
      <div class="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2" v-for="category in categories" :key="category.id">
        <router-link :to="{name:'category.show',params:{slug: category.slug}}" class="card border-0">
          <img :src="category.image" class="img-fluid">
        </router-link>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-4 p-1" v-for="index in 6" :key="index">
        <ContentLoader class="shadow"/>
      </div>
    </div>
  </div>
</template>

<script>import { useStore } from "vuex"
import { computed, onMounted } from '@vue/runtime-core'
import { ContentLoader } from 'vue-content-loader'

export default {
  components:{
    ContentLoader
  },
  setup() {
    const store = useStore()
    onMounted(() => {
        store.dispatch('category/getCategoryHome')
    })

    //digunakan untuk get data state "categories" di module "category" 
    const categories = computed(() => {
        return store.state.category.home
    })

    return {
      categories
    }
  },
}
</script>

<style scoped>
  .card{
    border-radius: 16px !important;
    /* height: 180px; */
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;
    text-decoration: none;
  }
  .card:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.6);
  }
</style>

