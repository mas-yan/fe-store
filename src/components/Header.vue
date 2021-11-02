<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold text-white fs-3 mb-lg-4" href="#">My-Store</a>
    <div class="d-lg-none">
        <button class="btn bg-white text-primary"><i class="fas fa-shopping-cart"></i> 0 | Rp. 0</button>
        <span class="mx-1 text-white" v-if="!login">|</span>
        <router-link :to="{name:'index'}" v-if="!login" class="btn btn-outline-light">Login</router-link>
    </div>
    <div class="container">
      <div class="d-flex justify-content-between">
        <div class="input-group mt-2 me-3">
          <input type="text" class="form-control border-0" placeholder="Cari Barang Kesukaanmu">
          <a class="btn bg-white text-primary"><i class="fas fa-search"></i></a>
        </div>
        <div class="d-none d-lg-block d-xl-block ps-2 mt-2 ps-2 d-xxl-block">
          <button class="btn me-2 bg-white text-primary"><i class="fas fa-shopping-cart"></i> 0 | Rp. 0</button>
          <span class="me-2 my-auto text-white">|</span>
            <router-link :to="{name:'login'}" v-if="!login" class="btn me-2 btn-outline-light">Login</router-link>
            <router-link :to="{name:'register'}" v-if="!login" class="btn bg-white text-primary">Register</router-link>
            <a href="#" v-if="login" class="btn bg-white text-primary">akun</a>
        </div>
      <button class="navbar-toggler mt-2 bg-primary text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
      </button>
        </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 d-lg-none mb-lg-0">
          <li class="nav-item">
            <a class="nav-link text-white active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link text-white dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item text-black" href="#">Action</a></li>
              <li><a class="dropdown-item text-black" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-black" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white disabled">Disabled</a>
          </li>
        </ul>
      </div>
      <div class="d-none d-lg-block d-xl-block ps-2 d-xxl-block">
        <div class="navbar-nav">
          <a class="nav-link text-white active" aria-current="page" href="#">Home</a>
          <a class="nav-link text-white" href="#">Features</a>
          <a class="nav-link text-white" href="#">Pricing</a>
          <a class="nav-link text-white disabled">Disabled</a>
        </div>
      </div>
    </div>
  </div>
</nav>
<div class="mt-5">&nbsp;</div>
<!-- Bottom Navbar -->
    <nav class="navbar navbar-light bg-body p-0 border-top rounded-3 mt-5 shadow-lg navbar-expand fixed-bottom d-lg-none d-xl-none d-xxl-none">
        <ul class="navbar-nav nav-justified w-100">
            <li class="nav-item">
                <a href="#" class="nav-link text-center">
                    <span class="text-primary" style="font-size: 1.2em;"><i class="fas fa-home"></i></span>
                    <span class="small d-block text-primary">Beranda</span>
                </a>
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
    width: 55%;
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
    return {
      login
    }
  },
}
</script>
