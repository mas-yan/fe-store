<template>
  <div class="card border-0 rounded shadow mt-lg-0 mt-xl-0 mt-xxl-0 mt-3">
    <div class="card-body">
        <div class="rounded-circle text-center d-none d-lg-block d-xl-block d-xxl-block mx-auto mb-3" style="width:130px">
          <img :src="profile.avatar" style="width: 130px; height: 130px;" class="rounded-circle">
        </div>
        <div class="row">
          <div class="col-12 col-lg-6 col-xl-6 col-xxl-6">
            <h5 class="text-muted text-lg-center fw-bold">Profile</h5>
            <hr style="height:4px">
            <form @submit.prevent="updateProfile" method="POST" enctype="multipart/form-data">
              <div class="mb-3">
              <label for="avatar">Avatar</label>
                <input type="file" @change="onFIleChange" id="avatar" :class="{'is-invalid': validate.image.length>0}" class="form-control">
                <div class="invalid-feedback">
                    {{validate.image}}
                </div>
              </div>
              <div class="mb-3">
                <label for="nama">Nama Lengkap</label>
                <input type="text" :class="{'is-invalid': validate.name.length>0}" v-model="profile.name" placeholder="Nama Legkap" id="nama" class="form-control">
                <div class="invalid-feedback">
                    {{validate.name}}
                </div>
              </div>
              <div class="mb-3">
                <label for="email">Alamat Email</label>
                <input type="email" v-model="profile.email" disabled placeholder="Alamat Email" id="email" class="form-control">
              </div>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" type="submit">Update Profile</button>
              </div>
            </form>
          </div>
          <div class="col mt-4 mt-lg-0 mt-xl-0 mt-xxl-0 d-none d-lg-block d-xl-block d-xxl-block">
            <h5 class="text-muted fw-bold text-lg-center">Password</h5>
            <hr style="height:4px">
            <div class="mb-3">
              <label for="oldpassm">Password Lama</label>
              <input type="password" placeholder="Password Lama" id="oldpassm" class="form-control">
            </div>
            <div class="mb-3">
              <label for="passwordm">Password Baru</label>
              <input type="text" placeholder="Password Baru" id="passwordm" class="form-control">
            </div>
            <div class="mb-3">
              <label for="password_confirmationm">Konfirmasi Password</label>
              <input type="password" placeholder="Konfirmasi Password Baru" id="password_confirmationm" class="form-control">
            </div>
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="submit">Update Password</button>
            </div>
          </div>
        </div>
    </div>
  </div>
  <div class="card border-0 rounded shadow mt-lg-0 mt-xl-0 mt-xxl-0 mt-3 d-lg-none d-xxl-none d-xl-none">
    <div class="card-body">
      <div class="row">
        <div class="col mt-4 mt-lg-0 mt-xl-0 mt-xxl-0 d-lg-none d-xl-none d-xxl-none">
          <h5 class="text-muted fw-bold text-lg-center">Password</h5>
          <hr style="height:4px">
          <div class="mb-3">
            <label for="oldpass">Password Lama</label>
            <input type="password" placeholder="Password Lama" id="oldpass" class="form-control">
          </div>
          <div class="mb-3">
            <label for="password">Password Baru</label>
            <input type="text" placeholder="Password Baru" id="password" class="form-control">
          </div>
          <div class="mb-3">
            <label for="password_confirmation">Konfirmasi Password</label>
            <input type="password_confirmation" placeholder="Konfirmasi Password Baru" id="password_confirmation" class="form-control">
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="submit">Update Password</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>import { useStore } from "vuex"
import { computed, inject, onMounted, ref, reactive } from '@vue/runtime-core'
import { useRouter } from "vue-router"
import { useLoading } from 'vue3-loading-overlay'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const swal = inject('$swal')

    onMounted(()=>{
      store.dispatch('profile/getProfile')
    })
    const profile = computed(()=>{
      return store.state.profile.profile
    })

    const imageAvatar = ref(null)
    const validation = ref([])
    const validate = reactive({
        name: '',
        email: '',
        image: '',
    })

    function onFIleChange(e) {
      imageAvatar.value = e.target.files[0]
      if (!imageAvatar.value.type.match('image.*')) {
        imageAvatar.value = null
        e.target.value = ''
        validate.image = "Extensi File Tidak Diizinkan!"
      }
    }

    // method update profile
    function updateProfile() {
      
        let loader = useLoading();
        loader.show({
            color: '#5a68d1',
            loader: 'dots',
        });

        //formdata
        let formData = new FormData();

        formData.append('avatar', imageAvatar.value)
        formData.append('name', profile.value.name)

        //panggil actions "updateProfile" dari module "profile"
        store.dispatch('profile/updateProfile', formData)
        .then(() => {

            router.push({name:'index'})
            loader.hide()
            swal({
              icon: 'success',
              title: 'Profile Berhasil Diupdate!',
            })

            //set imageAvatar to null
            imageAvatar.value = null

        }).catch(error => {
          loader.hide()
            //assign validaation message
            validation.value = error

            //show validation name with toast
            if(validation.value.name) {
                 validate.name = validation.value.name[0]
            }
        })
    }

    return {
      profile,
      validation,         
      onFIleChange,       
      updateProfile, 
      validate 
    }
  },
}
</script>