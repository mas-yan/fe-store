<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow bg-primary">
  <div class="container-fluid">
    <router-link :to="{name: 'home'}" class="navbar-brand fw-bold text-white fs-4">My-Store</router-link>
    <div class="d-lg-none">
        <button class="btn bg-white text-primary"><i class="fas fa-shopping-cart"></i>&nbsp;|&nbsp;<span class="badge bg-primary">0</span></button>
        <span class="mx-1 text-white" v-if="!login">|</span>
        <router-link :to="{name:'index'}" v-if="!login" class="btn btn-outline-light">Login</router-link> &nbsp;
        <router-link :to="{name: 'index'}" v-if="login" class="btn bg-white text-primary d-inline-block text-truncate" style="max-width: 130px;">{{user.name}}</router-link>
    </div>
    <div class="container">
      <div class="d-flex justify-content-between">
        <div class="dropdown">
          <button class="btn me-2 bg-white text-primary d-none d-lg-block d-xl-block ps-2 d-xxl-block" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-list-ul"></i> Kategori
          </button>
          <button class="btn me-2 bg-white text-primary mt-2 d-lg-none d-xl-none d-xxl-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fas fa-list-ul"></i>
        </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        <div class="input-group me-3 mt-2 mt-lg-0 mt-xl-0 mt-xxl-0">
          <input type="text" class="form-control border-0" placeholder="Cari Barang Kesukaanmu">
          <a class="btn bg-white text-primary"><i class="fas fa-search"></i></a>
        </div>
        <div class="d-none d-lg-block d-xl-block ps-2 d-xxl-block">
          <button class="btn me-2 bg-white text-primary"><i class="fas fa-shopping-cart"></i>&nbsp;|&nbsp;<span class="badge bg-primary">9999</span></button>
          <span class="me-2 my-auto text-white">|</span>
            <router-link :to="{name:'login'}" v-if="!login" class="btn me-2 btn-outline-light">Login</router-link>
            <router-link :to="{name:'register'}" v-if="!login" class="btn bg-white text-primary">Register</router-link>
            <router-link :to="{name: 'index'}" v-if="login" class="btn bg-white text-primary">{{user.name}}</router-link>
        </div>
      </div>
    </div>
  </div>
</nav>
<div class="mt-5">&nbsp;</div>
<!-- Bottom Navbar -->
    <nav class="navbar navbar-light bg-body p-0 rounded-3 mt-5 shadow-lg navbar-expand fixed-bottom d-lg-none d-xl-none d-xxl-none" style="border-top:5px solid #5a68d1;">
        <ul class="navbar-nav nav-justified w-100">
            <li class="nav-item">
                <router-link :to="{name: 'home'}" class="nav-link text-center">
                    <span class="text-primary" style="font-size: 1.2em;"><i class="fas fa-home"></i></span>
                    <span class="small d-block text-primary">Beranda</span>
                </router-link>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-center">
                    <span class="text-primary" style="font-size: 1.2em;"><i class="fas fa-grip-horizontal"></i></span>
                    <span class="small d-block text-primary">Kategori</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link text-center">
                    <span class="text-primary" style="font-size: 1.2em;"><i class="fas fa-shopping-cart"></i></span>
                    <span class="small d-block text-primary">Keranjang</span>
                </a>
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
@media (min-width: 992px) { 
  .input-group{
    width: 49%;
  }  
}
</style>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default{
  setup() {
    let cek = ref({
      state: false
    })
    const store = useStore()
    const login = computed(()=>{
        if (store.getters['auth/isLoggedIn']) {
            return cek.value.state = true
        }
    })

    const user = computed(()=>{
      return store.getters['auth/currentUser']
    })
    return {
      login,
      user
    }
  },
}
</script>
