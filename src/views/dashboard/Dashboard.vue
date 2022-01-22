<template>
<div class="alert alert-primary">
  Selamat Datang <b>{{ user.name }}</b>
</div>
    <!-- <div class="card mt-3 mt-lg-0 mt-xl-0 mt-xxl-0 shadow border-0 text-center">
      <div class="card-header bg-white">
       <nav>
        <div class="nav nav-tabs card-header-tabs" id="nav-tab" role="tablist">
          <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
          <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
          <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
        </div>
      </nav>
      </div>
      <div class="card-body">
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            asnakjs
          </div>
          <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
            janksn
          </div>
        </div>
        
      </div>
    </div> -->
</template>

<script>
import { useStore } from "vuex"
import { computed, onMounted } from 'vue'

export default {
  setup() {

    const store = useStore()

    onMounted(() => {
        //panggil action "getUser" dari module "auth" vuex
        store.dispatch('auth/getUser')

    })

    //data user login
    const user = computed(() => {
        return store.state.auth.user
    })

    return {
      user
    }
  },
}
</script>