<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow bg-primary" style="border-top: 5px solid #5a68d1;">
  <div class="container-fluid">
    <router-link :to="{name: 'home'}" class="navbar-brand text-white p-0 m-0 fs-4 text" style="font-family: pacifico">Literasiku</router-link>
    <div class="d-lg-none">
        <router-link :to="{name:'cart'}" @click="destroyCart" class="btn bg-white text-primary"><i class="fas fa-shopping-cart"></i>&nbsp;|&nbsp;<span class="badge bg-primary">{{total}}</span></router-link>
        <span class="mx-1 text-white" v-if="!login">|</span>
        <router-link :to="{name:'index'}" v-if="!login" class="btn btn-outline-light">Login</router-link> &nbsp;
        <router-link :to="{name: 'index'}" v-if="login" class="btn bg-white fw-bold text-primary d-inline-block text-truncate" style="max-width: 120px; fw-bold">{{user.name}}</router-link>
    </div>
    <div class="container">
      <div class="d-flex justify-content-between">
        <div class="dropdown">
          <button class="btn me-2 bg-white text-primary d-none ps-2 d-lg-block" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-list-ul"></i> Kategori
          </button>
          <button class="btn me-2 bg-white text-primary mt-2 d-lg-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fas fa-list-ul"></i>
        </button>
        <div class="dropdown-menu">
          <ul class="list-group p-2" v-if="categories.length > 0" aria-labelledby="dropdownMenuButton1">
            <button @click="detail(category.slug)" class="list-group-item text-start d-inline-block text-truncate rounded mb-2 text-dark border-0" v-for="category in categories" :key="category.id" style="max-width:250px; width:100%; background-color: #e1e8f0;">
              <img :src="category.image" class="rounded img-fluid" style="height: 35px;">
              &nbsp;&nbsp;<span>{{ category.name }}</span>
            </button>
              <router-link :to="{name: 'category'}" class="list-group-item d-inline-block text-truncate rounded bg-primary shadow mb-2 text-white text-center" >Kategori Lainnya </router-link>
          </ul>
          <ul class="list-group p-2" v-else aria-labelledby="dropdownMenuButton1">
            <div class="list-group-item d-inline-block text-truncate rounded bg-danger shadow mb-2 text-white" style="max-width:250px; width:100%;">Kategori Belum Tersedia</div>
          </ul>
        </div>
        </div>
        <div class="input-group me-3 mt-2 mt-lg-0 mt-xl-0 mt-xxl-0">
          <input type="text" @click="search" v-model="searchProduct" @keyup="searchQuery" class="form-control border-0" placeholder="Mau baca apa hari ini?">
          <a class="btn bg-white text-primary"><i class="fas fa-search"></i></a>
        </div>
        <div class="d-none ps-2 d-lg-block">
          <router-link :to="{name:'cart'}" @click="destroyCart" class="btn me-2 bg-white text-primary"><i class="fas fa-shopping-cart"></i>&nbsp;|&nbsp;<span class="badge bg-primary">{{total}}</span></router-link>
          <span class="me-2 my-auto text-white">|</span>
            <router-link :to="{name:'login'}" v-if="!login" class="btn me-2 btn-outline-light">Login</router-link>
            <router-link :to="{name:'register'}" v-if="!login" class="btn bg-white text-primary">Register</router-link>
            <router-link :to="{name: 'index'}" v-if="login" class="btn bg-white text-primary fw-bold">{{user.name}}</router-link>
        </div>
      </div>
    </div>
  </div>
</nav>
<div class="mt-5 mt-lg-3 mt-xl-3 mt-xxl-3">&nbsp;</div>
<!-- Bottom Navbar -->
    <nav class="navbar navbar-light bg-body p-0 rounded-3 mt-5 shadow-lg navbar-expand fixed-bottom d-md-none" style="border-top:5px solid #5a68d1;">
        <ul class="navbar-nav nav-justified w-100">
            <li class="nav-item">
                <router-link :to="{name: 'home'}" class="nav-link text-center">
                    <span class="text-primary" style="font-size: 1.2em;"><i class="fas fa-home"></i></span>
                    <span class="small d-block text-primary">Beranda</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'category'}" class="nav-link text-center">
                    <span class="text-primary" style="font-size: 1.2em;"><i class="fas fa-grip-horizontal"></i></span>
                    <span class="small d-block text-primary">Kategori</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name:'cart'}" @click="destroyCart" class="nav-link text-center">
                    <span class="text-primary" style="font-size: 1.2em;"><i class="fas fa-shopping-cart"></i></span>
                    <span class="small d-block text-primary">Keranjang</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'index'}" class="nav-link text-center">
                    <span class="text-primary" style="font-size: 1.2em;"><i class="fas fa-user-alt"></i></span>
                    <span class="small d-block text-primary">Akun</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>
<style scoped>

.input-group{
  width: 100%;
}  
@media (max-width: 360px) { 
  .text{
    font-size: 21px !important;
  }
}
@media (min-width: 992px) { 
  .input-group{
    width: 49%;
  }  
}
</style>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

export default{
  setup() {
    let cek = ref({
      state: false,
    })
    const searchProduct = ref(null)

    const store = useStore()
    const router = useRouter()

    function detail(params) {
      store.dispatch('category/getDetailCategory',params)
      router.push({name:'category.show',params:{slug:params}})
    }
    
    const login = computed(()=>{      
      if (store.getters['auth/isLoggedIn']) {
        store.dispatch('cart/totalCart')
        return cek.value.state = true
      }else{
        return cek.value.state = false
      }
    })

    const user = computed(()=>{
      return store.getters['auth/currentUser']
    })

    onMounted(() => {
      store.dispatch('category/getCategoryHome')
    })

    function destroyCart() {
      store.dispatch('cart/destroyCart')
    }

    const total = computed(()=>{
      if (cek.value.state == true) {
        return store.state.cart.total
      }else{
        return store.state.cart.total = 0
      }
    })

    //digunakan untuk get data state "categories" di module "category" 
    const categories = computed(() => {
        return store.state.category.home
    })

    function searchQuery() {
        store.dispatch('product/searchProduct', searchProduct.value)
      }

    function search() {
        router.push({
          name: 'search'
        })
      }

    return {
      login,
      user,
      categories,
      detail,
      total,
      cek,
      destroyCart,
      search,
      searchProduct,
      searchQuery
    }
  },
}
</script>
