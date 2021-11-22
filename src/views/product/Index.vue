<template>
  <div class="container my-5">
    <div class="card shadow border-0">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-6">
            <div class="card rounded">
              <div class="card-body">
                <img :src="product.image" class="img-fluid">
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <h3 class="text-center mt-3 ">{{product.title}}</h3>
            <hr>
            <p>Stok : {{product.stok}}</p>
            <p>Berat : 12 Kg</p>
            <hr>
            <p><span class="txt" v-html="product.detail_product"></span><a href="#deskrispsi" class="text-decoration-none">Lihat Selengkapnya...</a></p>
            <hr>
            <div v-if="product.discount">
              <h4 class="fw-bold text-primary">Rp. {{formatPrice(product.discount.price_discount)}}</h4>      
              <small class="text-muted"><s>Rp. {{formatPrice(product.price)}}</s> &nbsp;<span class="alert-danger rounded-pill px-1">{{product.discount.discount}}%</span></small>
            </div>
            <div v-else>
              <h4 class="fw-bold text-primary">Rp. {{formatPrice(product.price)}}</h4>
            </div>
              <p class="d-block mt-4"><i class="fas fa-star" style="color: yellow"></i>(4.9) 999999 Reviews</p>
              <hr>
              <div class="bottom text-center text-lg-start mt-4 mb-lg-4">
                <button @click="tes" id="deskrispsi" class="btn btn-primary mx-auto">Beli Sekarang</button>
                <button @click="addCart(product.slug)" class="btn ms-5 btn-outline-primary d-none d-lg-inline d-xl-inline ps-2 d-xxl-inline"><i class="fas fa-shopping-cart"></i> Tambah Ke Keranjang</button>
                <button @click="addCart(product.slug)" class="btn ms-3 btn-outline-primary d-inline d-lg-none d-xl-none ps-2 d-xxl-none"><i class="fas fa-shopping-cart"></i></button>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-body">
        <h3>Deskripsi Produk</h3>
        <p v-html="product.detail_product" class="mt-4"></p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, inject, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useLoading } from 'vue3-loading-overlay';
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const swal = inject('$swal')

    let cek = ref({
      state: false
    })

    onMounted(()=>{
      store.dispatch('product/getDetail',route.params.slug)
    })

    const product = computed(()=>{
      return store.state.product.detail
    })
    
    const login = computed(()=>{
        if (store.getters['auth/isLoggedIn']) {
            return cek.value.state = true
        }
    })

    function addCart(id) {
      let loader = useLoading();
            loader.show({
                color: '#5a68d1',
                loader: 'dots',
            });
      if (login.value) {
        store.dispatch('cart/addCart',id)
        .then(()=>{
          loader.hide()
          store.dispatch('cart/totalCart')
          swal({
              icon: 'success',
              title: 'Ditambahkan Ke Keranjang',
              showCancelButton: true,
              showConfimrButton: true,
              confirmButtonText: 'Lihat Keranjang Sekarang',
              cancelButtonText: 'oke',
          })
          .then((result) => {
            loader.hide()
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              router.push({name: 'cart'})
            }
          })
        })
      }else{
        loader.hide()
        router.push({name: 'login'})
      }
    }
    return {
      product,
      addCart,
      login,
    }
  },
}
</script>

<style scoped>

.txt{
  width:100%;
  
  /**Major Properties**/
  overflow:hidden;
  max-height: 6rem;
  -webkit-box-orient: vertical;
  display: block;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
}
</style>