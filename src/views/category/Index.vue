<template>
  <div class="container my-5">
    <h3> <i class="fa fa-list-ul"></i> Kategori</h3>
    <div class="row" v-if="categories.length > 0">
      <div class="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 mt-4" v-for="category in categories" :key="category.id">
        <router-link :to="{name:'category.show',params:{slug: category.slug}}" class="card border-0">
          <img :src="category.image" class="img-fluid">
        </router-link>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2" v-for="index in 12" :key="index">
        <div class="card shadow border-0 mb-3">
        <div class="card-body p-0">
          <ContentLoader style="width: 400%;" class="mt-3">
            <circle cx="50" cy="20" r="20" />
            <rect x="10" y="50" rx="3" ry="3" width="35" height="10" />
            <rect x="55" y="50" rx="3" ry="3" width="35" height="10" />
            <rect x="10" y="70" rx="3" ry="3" width="80" height="10" />
            <rect x="15" y="90" rx="3" ry="3" width="67" height="10" />
          </ContentLoader>
        </div>
        </div>
      </div>
    </div>
     <div class="text-center mt-4 " v-show="nextExists">
        <a @click="loadMore"
            class=" p-2 px-3 rounded-md shadow btn btn-primary">LIHAT
            LEBIH BANYAK</a>
    </div>
  </div>
</template>

<script>import { useStore } from "vuex"
import { computed, onMounted } from '@vue/runtime-core'
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
  },
  setup() {
    const store = useStore()
    
    onMounted(()=>{
      store.dispatch('category/getCategory')
    })

    const categories = computed(()=>{
      return store.state.category.categories
    })

    const nextExists = computed(() => {
        return store.state.category.nextExists
    })

    //get nextPage
    const nextPage = computed(() => {
        return store.state.category.nextPage
    })

    //loadMore function
    function loadMore() {
        return store.dispatch('category/getLoadMoreAll')
    }

    return {
      categories,
      nextExists,
      nextPage,
      loadMore,
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