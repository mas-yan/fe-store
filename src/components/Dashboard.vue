<template>
  <div class="col-12 col-lg-4 col-xl-4 col-xxl-4">
    <div class="card shadow border-0 rounded posisi">
      <div class="col-lg-auto col-12">
        <div class="rounded-circle my-3 text-center mx-auto" style="width:130px">
          <img :src="user.avatar" style="width: 130px; height: 130px;" class="rounded-circle">
        </div>
      </div>
      <div class="col-lg-auto col-xl-auto col-xxl-auto col-12">
        <h5 class="fw-bold text-center text-dark text-truncate">{{user.name}}</h5>
        <p class="text-center">{{user.email}}</p>
      </div>
      <div class="col-lg-auto col-xl-auto col-xxl-auto col-12 mb-3">
        <ul class="list-group-item rounded border-0 d-lg-none">
          <li class="list-group-item"><a @click="dashboard" class="fw-bold text-decoration-none text-muted"><i class="fas fa-tachometer-alt"></i> &nbsp;Dashboard</a></li>
          <li class="list-group-item"><a @click="order" class="fw-bold text-decoration-none text-muted"><i class="fas fa-shopping-bag"></i> &nbsp;Pembelian</a></li>
          <li class="list-group-item"><a @click="profile" class="fw-bold text-decoration-none text-muted"><i class="fas fa-user"></i> &nbsp;Profile</a></li>
          <li class="list-group-item" id="index"><a @click="logout" class="fw-bold text-decoration-none text-muted" style="cursor: pointer;"><i class="fas fa-sign-out-alt"></i> &nbsp;Logout</a></li>
        </ul>
        <ul class="list-group-item rounded border-0 d-none d-lg-block">
          <li class="list-group-item"><router-link :to="{name:'index'}" class="fw-bold text-decoration-none text-muted"><i class="fas fa-tachometer-alt"></i> &nbsp;Dashboard</router-link></li>
          <li class="list-group-item"><router-link :to="{name:'order'}" class="fw-bold text-decoration-none text-muted"><i class="fas fa-shopping-bag"></i> &nbsp;Pembelian</router-link></li>
          <li class="list-group-item"><router-link :to="{name:'profile'}" class="fw-bold text-decoration-none text-muted"><i class="fas fa-user"></i> &nbsp;Profile</router-link></li>
          <li class="list-group-item" id="index"><a @click="logout" class="fw-bold text-decoration-none text-muted" style="cursor: pointer;"><i class="fas fa-sign-out-alt"></i> &nbsp;Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { computed, inject, onMounted } from 'vue'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const swal = inject('$swal')

    onMounted(() => {
      //panggil action "getUser" dari module "auth" vuex
        store.dispatch('auth/getUser')
    })

    //data user login
    const user = computed(() => {
        return store.state.auth.user
    })

    function order() {
      const p = document.getElementById('index')
      router.push({name: 'order'})
      p.scrollIntoView({
        behavior: "smooth",
      })
    }
    function profile() {
      const p = document.getElementById('index')
      router.push({name: 'profile'})
      p.scrollIntoView({
        behavior: "smooth",
      })
    }
    function dashboard() {
      const p = document.getElementById('index')
      router.push({name: 'index'})
      p.scrollIntoView({
        behavior: "smooth",
      })
    }

    function logout() {
      swal.fire({
        title: 'Apakah Anda Yakin?',
        text: "Ingin Keluar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5a68d1',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, keluar sekarang!'
      }).then((result) => {
        if (result.isConfirmed) {
          store.dispatch('auth/logout')
          .then(()=>{
            router.push({name: 'login'})
          })
          swal.fire(
            'Success!',
            'Anda telah keluar.',
            'success'
          )
        }
      })
    }

    return {
      logout,
      user,
      dashboard,
      profile,
      order
    }
  },
}
</script>

<style scoped>
@media (min-width: 768px) {
  .posisi{
    position: sticky !important;
    position: -webkit-sticky !important;
    top: 90px !important; /* required */
  }
}
</style>