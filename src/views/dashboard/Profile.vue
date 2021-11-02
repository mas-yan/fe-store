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
            <form @submit.prevent="updatePassword" method="POST">
              <div class="mb-3">
                <label for="oldpassl">Password Lama</label>
                <input type="password" autocomplete v-model="user.old_password" placeholder="Password Lama" id="oldpassl" :class="{'is-invalid': validate.old_password.length>0}" class="form-control">
                <div class="invalid-feedback">
                  {{validate.old_password}}
                </div>
              </div>
              <div class="mb-3">
                <label for="passwordl">Password Baru</label>
                <input type="password" autocomplete v-model="user.password" placeholder="Password Baru" id="passwordl" :class="{'is-invalid': validate.password.length>0}" class="form-control">
                <div class="invalid-feedback">
                  {{validate.password}}
                </div>
              </div>
              <div class="mb-3">
                <label for="password_confirmationm">Konfirmasi Password</label>
                <input type="password" autocomplete v-model="user.password_confirmation" placeholder="Konfirmasi Password Baru" id="password_confirmationm" class="form-control">
              </div>
              <div class="text-danger my-3" v-if="validate.message.length>0">
                  {{validate.message}}
              </div>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" type="submit">Update Password</button>
              </div>
            </form>
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
            <form @submit.prevent="updatePassword" method="POST">
              <div class="mb-3">
                <label for="oldpass">Password Lama</label>
                <input type="password" autocomplete v-model="user.old_password" placeholder="Password Lama" id="oldpass" :class="{'is-invalid': validate.old_password.length>0}" class="form-control">
                <div class="invalid-feedback">
                    {{validate.old_password}}
                </div>
              </div>
              <div class="mb-3">
                <label for="password">Password Baru</label>
                <input type="password" v-model="user.password" placeholder="Password Baru" id="password" :class="{'is-invalid': validate.password.length>0}" class="form-control">
                <div class="invalid-feedback">
                    {{validate.password}}
                </div>
              </div>
              <div class="mb-3">
                <label for="password_confirmation">Konfirmasi Password</label>
                <input type="password" v-model="user.password_confirmation" placeholder="Konfirmasi Password Baru" id="password_confirmation" class="form-control">
              </div>
              <div class="text-danger my-3" v-if="validate.message.length>0">
                {{validate.message}}
              </div>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" type="submit">Update Password</button>
              </div>
          </form>
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
        old_password:'',
        password:'',
        message:''
    })

    const user = reactive({
      old_password:'',
      password:'',
      password_confirmation:''
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
    
    function updatePassword() {
      let loader = useLoading();
      loader.show({
          color: '#5a68d1',
          loader: 'dots',
      });

      let old_password = user.old_password
      let password = user.password
      let password_confirmation = user.password_confirmation

      store.dispatch('profile/updatePassword',{
        old_password,
        password,
        password_confirmation
      })
      .then(()=>{
        loader.hide()
        swal({
          icon: 'success',
          title: 'Password Berhasil Diupdate!',
        })
        router.push({name:'index'})
      })
      .catch(error=>{
        loader.hide()
        validation.value = error

        //show validation name with toast
        if(validation.value.old_password) {
              validate.old_password = validation.value.old_password[0]
        }else{
          validate.old_password = ''
        }
        if(validation.value.password) {
              validate.password = validation.value.password[0]
        }else{
          validate.password = ''
        }
        if(validation.value.message) {
          console.log(validation.value.message);
            validate.message = "Password Lama idak Sesuai"
        }else{
          validate.message = ''
        }
      })
    }

    return {
      profile,
      validation,         
      onFIleChange,       
      updateProfile, 
      validate,
      user,
      updatePassword
    }
  },
}
</script>