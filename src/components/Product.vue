<template>
  <div class="m-lg-5 m-3">
    <h3 class="judul"> Produk</h3>
    <hr style="height: 4px" class="bg-primary mt-0">
    <div class="row" v-if="products.length > 0">
      <div class="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 p-2" v-for="product in products" :key="product.id">
        <router-link :to="{name:'product.show',params:{'slug':product.slug}}" class="text-decoration-none card border-0 mb-2">
          <img :src="product.image" class="img-fluid">
          <div class="card-body py-0 m-0">
              <h6 class="fw-bold text-lg-start text-dark text-xl-start text-xxl-start text-center d-block text-truncate pt-2">{{product.title}}</h6>
            <div v-if="product.discount">
              <h6 class="fw-bold text-primary mb-0">Rp. {{formatPrice(product.price_discount)}}</h6>      
              <small class="text-danger"><s>Rp. {{formatPrice(product.price)}}</s> &nbsp;<span class="alert-danger rounded-pill px-1">{{product.discount}}%</span></small>
            </div>
            <div v-else>
              <h6 class="fw-bold text-primary">Rp. {{formatPrice(product.price)}}</h6>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="row" v-else>
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
    <div class="text-center mt-4 mb-4" v-show="nextExists">
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
    onMounted(() => {
        store.dispatch('product/getProduct')
    })

    //digunakan untuk get data state "categories" di module "category" 
    const products = computed(() => {
        return store.state.product.product
    })

    //get status NextExists
            const nextExists = computed(() => {
                return store.state.product.nextExists
            })

            //get nextPage
            const nextPage = computed(() => {
                return store.state.product.nextPage
            })

            //loadMore function
            function loadMore() {
                store.dispatch('product/getLoadMore', nextPage.value)
            }   

    return {
      products,
           // <-- return products
                nextExists,     // <-- return nextExists,
                nextPage,       // <-- return nextPage
                loadMore,  
    }
  },
}
</script>


<style scoped>
.fb{
    width: 30em;
    height: 80%;
  }
.card{
  height: 305px;
  border-radius: 16px !important;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
}
img{
  max-height: 200px;
  height: 200px;
}

.card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.6);
}

@media (min-width: 768px) { 
  .card{
    border-radius: 16px !important;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;
    text-decoration: none;
    height: 300px;
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
    width: 700px;
    height: 100%;
  }
}
</style>