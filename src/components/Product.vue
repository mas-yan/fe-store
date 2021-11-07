<template>
  <div class="container my-5">
    <h3> Kategory</h3>
    <hr style="height: 4px" class="bg-primary">
    <div class="row" v-if="products.data">
      <div class="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 p-2" v-for="product in products.data" :key="product.id">
        <div class="card border-0 mb-2 tes">
          <img :src="product.image">
          <div class="card-body py-0 m-0">
              <h6 class="text-lg-start text-xl-start text-xxl-start text-center d-block text-truncate pt-2">{{product.title}}</h6>
            <div v-if="product.discount">
              <h6 class="fw-bold text-primary">{{formatPrice(product.price_discount)}}</h6>      
              <small><s>{{formatPrice(product.price)}}</s> &nbsp;<span class="alert-danger rounded-pill px-1">{{product.discount}}%</span></small>
            </div>
            <div v-else>
              <h6 class="fw-bold text-primary">{{formatPrice(product.price)}}</h6>
            </div>
            <small class="d-block"><i class="fas fa-star" style="color: yellow"></i>4.9 (999999)</small>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-6 col-lg-2 col-xl-2 col-xxl-2 p-2" v-for="index in 12" :key="index">
          <div class="card shadow border-0 mb-3" style="background-color: #ccc">
          <div class="card-body">
            <FacebookLoader class="fb"/>
          </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>import { useStore } from "vuex"
import { computed, onMounted } from '@vue/runtime-core'
import { FacebookLoader } from 'vue-content-loader'


export default {
  components:{
    FacebookLoader
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

    return {
      products
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