<template>
<div class="m-lg-5 m-3">
  <h3 class="judul mb-3"> Kategori yang mungkin kamu suka</h3>
  <div v-if="categories.length > 0" class="m-2 d-none d-lg-block">
    <vueper-slides
      :fixed-height="true"
      class="no-shadow "
      :visible-slides="6"
      slide-multiple
      :gap="3"
      disable-arrows-on-edges
      :bullets="false"
      :dragging-distance="10">
      <vueper-slide class="img-fluid" v-for="category in categories" :key="category.id">
        <template #content>
      <div class="vueperslide__content-wrapper" style="flex-direction: row">
      <router-link :to="{name:'category.show',params:{slug: category.slug}}" class="card border-0">
          <img :src="category.image" class="img-fluid">
        </router-link>
      </div>
    </template>
    </vueper-slide>
    </vueper-slides>
  </div>
  <div v-if="categories.length > 0" class="d-block d-lg-none">
    <vueper-slides
    :fixed-height="true"
      class="no-shadow "
      :visible-slides="3"
      slide-multiple
      :arrows-outside="false"
      disable-arrows-on-edges
      :gap="3"
      :bullets="false"
      :dragging-distance="10">
      <template v-slot:arrow-left>
          <i class="fas fa-chevron-circle-left"></i>
      </template>
      <template v-slot:arrow-right>
          <i class="fas fa-chevron-circle-right"></i>
      </template>
      <vueper-slide class="img-fluid" v-for="category in categories" :key="category.id">
      <template #content>
        <div class="vueperslide__content-wrapper" style="flex-direction: row">
      <router-link :to="{name:'category.show',params:{slug: category.slug}}" class="card border-0">
          <img :src="category.image" class="img-fluid">
        </router-link>
      </div>
      </template>
      </vueper-slide>
    </vueper-slides>
  </div>
  <div class="row" v-else>
    <div class="col-lg-2 col-6 p-2" v-for="index in 6" :key="index">
        <div class="card shadow border-0 mb-3">
        <div class="card-body p-0">
          <ContentLoader style="width: 400%;" class="mt-3">
            <circle cx="50" cy="30" r="30" />
            <rect x="10" y="90" rx="3" ry="3" width="80" height="10" />
            <rect x="10" y="70" rx="3" ry="3" width="35" height="10" />
            <rect x="55" y="70" rx="3" ry="3" width="35" height="10" />
            <rect x="15" y="110" rx="3" ry="3" width="67" height="10" />
          </ContentLoader>
        </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>import { useStore } from "vuex"
import { computed, onMounted } from '@vue/runtime-core'
import { ContentLoader } from 'vue-content-loader'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'


export default {
  components:{
    VueperSlides, 
    VueperSlide,
    ContentLoader
  },
  setup() {
    const store = useStore()
    onMounted(() => {
        store.dispatch('category/getRandom')
    })

    //digunakan untuk get data state "categories" di module "category" 
    const categories = computed(() => {
        return store.state.category.rand
    })

    return {
      categories,
    }
  },
}
</script>

<style scoped>

.vueperslides--fixed-height {
    height: 8.5rem;
    margin-bottom: 8%;
}
@media (min-width: 430px) { 
  .vueperslides--fixed-height {
    height: 15rem;
    margin-bottom: 8%;
  }
}
@media (min-width: 768px) { 
  .vueperslides--fixed-height {
    height: 18rem;
    margin-bottom: 8%;
  }
}
@media (min-width: 992px) { 
  .vueperslides--fixed-height {
    height: 14rem;
    margin-bottom: 4%;
  }
}
@media (min-width: 1400px) { 
  .vueperslides--fixed-height {
    height: 30rem;
    margin-bottom: 4%;
  }
}
  .card{
    border-radius: 16px !important;
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;
    text-decoration: none;
  }
  .card:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
</style>

