<template>
  <div class="card mt-3 mt-lg-0 mt-xl-0 mt-xxl-0 shadow border-0">
    <div class="card-body">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <div class="ms-3">
            {{user.name}}
          </div>
        </div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">asas</div>
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">as</div>
      </div>
    </div>
  </div>
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