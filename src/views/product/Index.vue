<template>
  <div class="container my-5">
    <div v-if="product.id > 0">
      <div class="card shadow border-0">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-4">
              <div class="card rounded">
                <div class="card-body">
                  <img :src="product.image" class="img-fluid img">
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <h5 class="mt-3 title fw-bold text-dark text-center" style="font-family: 'Nunito Sans';">{{product.title}}</h5>
              <hr>
              <div class="row">
                <div class="col-8 d-block d-md-none">
                  <h3 class=" mb-0" style="font-size: 18px;">Jumah Halaman</h3>
                  <span class="text-center">{{product.jumlah_halaman}}</span>
                  <h3 class="mt-2  mb-0" style="font-size: 18px;">Tanggal Terbit</h3>
                  <span class="text-center">{{product.tanggal_terbit}}</span>
                  <h3 class=" mt-2 mb-0" style="font-size: 18px;">Bahasa</h3>
                  <span class="text-center">{{product.bahasa}}</span>
                  <h3 class="mt-2  mt-2 mb-0" style="font-size: 18px;">Penerbit</h3>
                  <span class="text-center d-inline-block text-truncate" style="max-width: 200px;">{{product.penerbit}}</span>
                </div>
                <div class="col-4 d-block d-md-none">
                  <h3 class=" mb-0" style="font-size: 18px;">Berat</h3>
                  <span class="text-center">{{product.berat}} kg</span>
                  <h3 class="mt-2 mb-0" style="font-size: 18px;">Stok</h3>
                  <span class="text-center">{{product.stok}} Buku</span>
                  <h3 class=" mb-0 mt-2" style="font-size: 18px;">Lebar</h3>
                  <span class="text-center">{{product.lebar}} cm</span>
                  <h3 class="mt-2 mb-0" style="font-size: 18px;">Panjang</h3>
                  <span class="text-center">{{product.panjang}} cm</span>
                </div>
                <div class="col-3 d-none d-md-block">
                  <h3 class="text-muted mb-0" style="font-size: 18px;">Jumah Halaman</h3>
                  <span class="text-center">{{product.jumlah_halaman}}</span>
                  <h3 class="mt-2 text-muted mb-0" style="font-size: 18px;">Tanggal Terbit</h3>
                  <span class="text-center">{{product.tanggal_terbit}}</span>
                </div>
                <div class="col-3 d-none d-md-block">
                  <h3 class="text-muted mb-0" style="font-size: 18px;">Berat</h3>
                  <span class="text-center">{{product.berat}} kg</span>
                  <h3 class="mt-2 text-muted mb-0" style="font-size: 18px;">Stok</h3>
                  <span class="text-center">{{product.stok}} Buku</span>
                </div>
                <div class="col-3 d-none d-md-block">
                  <h3 class="text-muted mb-0" style="font-size: 18px;">Lebar</h3>
                  <span class="text-center">{{product.lebar}} cm</span>
                  <h3 class="mt-2 text-muted mb-0" style="font-size: 18px;">Panjang</h3>
                  <span class="text-center">{{product.panjang}} cm</span>
                </div>
                <div class="col-3 d-none d-md-block">
                  <h3 class="text-muted mb-0" style="font-size: 18px;">Bahasa</h3>
                  <span class="text-center">{{product.bahasa}}</span>
                  <h3 class="mt-2 text-muted mb-0" style="font-size: 18px;">Penerbit</h3>
                  <span class="text-center d-inline-block text-truncate" style="max-width: 150px;">{{product.penerbit}}</span>
                </div>
              </div>
              <hr>
              <p><span class="txt" v-html="product.deskripsi_product"></span><a href="#deskrispsi" class="text-decoration-none">Lihat Selengkapnya...</a></p>
              <hr>
              <div v-if="product.discount">
                <h4 class="fw-bold text-primary">Rp. {{formatPrice(product.discount.price_discount)}}</h4>      
                <small class="text-danger"><s>Rp. {{formatPrice(product.price)}}</s> &nbsp;<span class="alert-danger rounded px-2">{{product.discount.discount}}%</span></small>
              </div>
              <div v-else>
                <h4 class="fw-bold text-primary">Rp. {{formatPrice(product.price)}}</h4>
              </div>
                <p class="d-block"><i class="fas fa-star" style="color: yellow"></i>(4.9) 999999 Reviews</p>
                <hr id="deskrispsi">
                <div class="bottom text-center text-lg-start mt-4 mb-lg-4">
                  <button @click="tes" class="btn d-md-inline d-none btn-primary mx-auto">Beli Sekarang</button>
                  <button @click="addCart(product.slug)" class="btn ms-5 btn-outline-primary d-none ps-2 d-md-inline"><i class="fas fa-shopping-cart"></i> Tambah Ke Keranjang</button>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card mt-3 border-0 shadow">
        <div class="card-header bg-white">
          <h3 class="judul">Deskripsi Buku</h3>
        </div>
        <div class="card-body">
          <h5 v-html="product.title" style="font-family: 'Nunito Sans';" class="title fw-bold text-dark text-center"></h5>
          <p v-html="product.deskripsi_product" class="mt-4"></p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card shadow border-0">
        <ContentLoader class="rounded" />
      </div>
      <div class="card mt-3 border-0 shadow">
        <ContentLoader class="rounded" />
      </div>
    </div>
  </div>

  <div class="d-md-none p-0 rounded-3 mt-5 fixed-bottom">
    <div class="card shadow-lg" style="border-radius: 16px 16px 0 0 !important; border-top:5px solid #5a68d1;">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h4 class="text-muted" style="font-size: 18px;">Harga</h4>
          <div v-if="product.id > 0">
            <div v-if="product.discount">
                <h3 class="text-primary fw-bold" style="font-size: 18px;">Rp. {{formatPrice(product.discount.price_discount)}}</h3>
            </div>
            <div v-else>
              <h3 class="text-primary fw-bold" style="font-size: 18px;">Rp. {{formatPrice(product.price)}}</h3>
            </div>
          </div>
          <div v-else>
              <h3 class="text-primary fw-bold" style="font-size: 18px;">Rp. 0</h3>            
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <button @click="tes" id="deskrispsi" class="btn d-md-none btn-style btn-primary">Beli Sekarang</button>
          <button @click="addCart(product.slug)" class="btn-style btn btn-outline-primary ps-2 d-md-none"><i class="fas fa-shopping-cart"></i> Keranjang</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, inject, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useLoading } from 'vue3-loading-overlay';
import { useRoute, useRouter } from 'vue-router'
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader,
  },
  
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
              store.dispatch('cart/destroyCart')
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

.img{
  width: 100%;
  max-height: 445px;
  object-fit: contain;
}

.title{
  display: -webkit-box;
  max-height: 3.5rem;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.txt{
  display: -webkit-box;
  max-height: 7rem;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>