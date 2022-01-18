<template>
  <div class="container my-5">
    <div v-if="!categories">
      <div class="row">
        <div class="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 p-2" v-for="index in 12" :key="index">
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
    <div class="row" v-else-if="productCategory.length > 0">
    <h3> <i class="fa fa-list-ul"></i> Kategori <strong>{{ categories.name }}</strong></h3>
      <div class="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 p-2" v-for="product in productCategory" :key="product.id">
        <router-link :to="{name:'product.show',params:{'slug':product.slug}}" class="text-decoration-none product card border-0 mb-2" style="background-color:#fff">
          <img :src="product.image" class="img-fluid">
          <div class="card-body py-0 m-0">
              <h6 class="fw-bold text-lg-start mb-0 pb-0 text-dark text-xl-start text-xxl-start d-block text-truncate pt-2">{{product.title}}</h6>
              <small class="title d-block text-truncate fw-bold mt-0 pt-0 text-secondary" style="font-family: 'Nunito Sans';">{{product.author}}</small>
            <div v-if="product.discount">
              <h6 class="fw-bold text-primary mb-0">Rp. {{formatPrice(product.price_discount)}}</h6>      
              <small class="text-danger"><s>Rp. {{formatPrice(product.price)}}</s> &nbsp;<span class="alert-danger rounded-pill px-1">{{product.discount}}%</span></small>
            </div>
            <div v-else>
              <h6 class="fw-bold text-primary mt-2">Rp. {{formatPrice(product.price)}}</h6>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-danger mt-5">
        Kategori <strong>{{ categories.name }}</strong> Belum Tersedia
      </div>
    </div>
    <div class="text-center mt-4 " v-show="nextExists">
        <a @click="loadMore(categories)"
            class=" p-2 px-3 rounded-md shadow btn btn-primary">LIHAT
            LEBIH BANYAK</a>
    </div>
  </div>
</template>

<script>import { useStore } from "vuex"
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    onMounted(()=>{
      store.dispatch('product/resetState')
      store.dispatch('category/getDetailCategory',route.params.slug)
    })

    const categories = computed(()=>{
      return store.state.category.category
    })

    const productCategory = computed(()=>{
      return store.state.category.productCategory
    })

    const nextExists = computed(() => {
        return store.state.category.nextExists
    })

    //get nextPage
    const nextPage = computed(() => {
        return store.state.category.nextPage
    })

    //loadMore function
    function loadMore(slug) {
        return store.dispatch('category/getLoadMore',slug)
    }

    return {
      categories,
      productCategory,
      nextExists,
      nextPage,
      loadMore,
    }
  },
}
</script>

<style scoped>
.fb{
    width: 1300px;
    height: 100%;
  }
.product{
  height: 305px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
}

.card{
  border-radius: 16px !important;
  overflow: hidden;
}

img{
  max-height: 200px;
  height: 200px;
}

.product:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.6);
}

@media (min-width: 768px) { 
  .product{
    border-radius: 16px !important;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;
    text-decoration: none;
    height: 300px;
  }
img{
  max-height: 200px;
  height: 200px;
}
  .fb{
    width: 1500px;
    height: 100%;
  }
}
@media (min-width: 992px) { 
  .product{
    height: 330px;
    border-radius: 16px !important;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;
    text-decoration: none;
  }
  img{
    max-height: 220px;
    height: 220px;
  }
  .fb{
    width: 900px;
    height: 100%;
  }
}
</style>