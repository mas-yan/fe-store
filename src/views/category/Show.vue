<template>
  <div class="container my-5">
    <h3> <i class="fa fa-list-ul"></i> Kategori <strong>{{ categories.name }}</strong></h3>
    <div class="row">
      <div class="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 p-2" v-for="product in productCategory" :key="product.id">
        <div class="card border-0 mb-2 tes" style="background-color:#fff">
          <img :src="product.image">
          <div class="card-body py-0 m-0">
              <h6 class="text-lg-start text-xl-start text-xxl-start text-center d-block text-truncate pt-2">{{product.title}}</h6>
            <div v-if="product.discount">
              <h6 class="fw-bold text-primary">{{formatPrice(product.price_discount)}}</h6>      
              <small><s>Rp.{{formatPrice(product.price)}}</s> &nbsp;<span class="alert-danger rounded-pill px-1">{{product.discount}}%</span></small>
            </div>
            <div v-else>
              <h6 class="fw-bold text-primary">Rp.{{formatPrice(product.price)}}</h6>
            </div>
            <small class="d-block"><i class="fas fa-star" style="color: yellow"></i>4.9 (999999)</small>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-4 " v-show="nextExists">
        <a @click="loadMore(categories.name)"
            class=" p-2 px-3 rounded-md shadow btn btn-primary">LIHAT
            LEBIH BANYAK</a>
    </div>
  </div>
</template>

<script>import { useStore } from "vuex"
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    onMounted(()=>{
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
.card{
  border-radius: 16px !important;
  height: 255px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}
img{
  max-height: 130px;
  height: 130px;
}

.card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

@media (min-width: 768px) { 
  .card{
    border-radius: 16px !important;
    height: 255px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;
  }
  img{
    max-height: 255px;
  }
  .fb{
    width: 1500px;
    height: 100%;
  }
}
@media (min-width: 992px) { 
  .card{
    border-radius: 16px !important;
    height: 255px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;
  }
  img{
    max-height: 230px;
  }
  .fb{
    width: 900px;
    height: 100%;
  }
}
</style>