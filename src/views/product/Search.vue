<template>
  <div class="m-lg-5 mt-0 pt-0 m-3">
    <h3 class="judul"> Produk</h3>
    <div class="row" v-if="products.length > 0">
      <div class="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 p-2" v-for="product in products" :key="product.id">
        <router-link @click="move" :to="{name:'product.show',params:{'slug':product.slug}}" class="text-decoration-none card border-0 mb-2">
          <img :src="product.image" class="img-fluid">
          <div class="card-body py-0 m-0">
              <h6 class="fw-bold text-lg-start text-dark text-xl-start text-start d-block text-truncate pt-2">{{product.title}}</h6>
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
      <div class="alert alert-danger">
          Pencarian Tidak Ditemukan
      </div>
    </div>
  </div>
</template>

<script>import { useStore } from "vuex"
import { computed, onMounted } from '@vue/runtime-core'

export default {
  setup() {
    const store = useStore()
    onMounted(() => {
        store.dispatch('product/getProduct')
    })

    //digunakan untuk get data state "categories" di module "category" 
    const products = computed(() => {
        return store.state.product.product
    })

    function move() {
      store.dispatch('product/resetState')
    }

    return {
      products,
      move
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