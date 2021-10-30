<template>
    <div class="container my-5">
        <div class="card shadow rounded border-0 p-3">
            <h1 class="text-center text-primary text-muted mb-4">Bergabung Dengan Kami</h1>
            <div class="row">
                <div class="col-6 mt-4 d-none d-lg-block d-xl-block d-xxl-block">
                        <img class="img-fluid" src="@/assets/images/register.svg" alt="">
                </div>
                <div class="col-lg-6 col-xl-6 col-xxl-6 col-12">
                    <div class="card border-0 rounded">
                        <div class="card-body">
                            <h5 class="text-muted">Register</h5>
                            <hr style="height: 4px">
                            <form @submit.prevent="register">
                                <div class="mb-3">
                                    <label for="nama">Nama</label>
                                    <input type="text" id="nama" :class="{'is-invalid': validate.name.length>0}" class="form-control" v-model="user.name"  placeholder="Masukkan Nama">
                                    <div class="invalid-feedback">
                                        {{validate.name}}
                                    </div>
                                </div>
                                {{user.valName}}
                                <div class="mb-3">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" :class="{'is-invalid': validate.email.length>0}" class="form-control" v-model="user.email"  placeholder="Masukkan Email">
                                    <div class="invalid-feedback">
                                        {{validate.email}}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="password">Password</label>
                                    <input type="password" autocomplete="" :class="{'is-invalid': validate.password.length>0}" id="password" class="form-control" v-model="user.password"  placeholder="Masukkan Password">
                                    <div class="invalid-feedback">
                                        {{validate.password}}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="confirm_password">Konfirmasi Password</label>
                                    <input type="password" autocomplete="" v-model="user.password_confirmation" id="confirm_password" class="form-control"  placeholder="Masukkan Konfirmasi Password">
                                </div>
                                <button class="btn text-white btn-primary">Daftar Sekarang</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useLoading } from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
export default {
    setup(){
        const user = reactive({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        })

        const validate = reactive({
            name: '',
            email: '',
            password: '',
        })

        const validation = ref([])
        const store = useStore()
        const router = useRouter()

        function register() {
            let loader = useLoading();
            loader.show({
                color: '#5a68d1',
                loader: 'dots',
            });
                // simulate AJAX
            let name     = user.name
            let email    = user.email
            let password = user.password
            let password_confirmation = user.password_confirmation


            store.dispatch('auth/register', {
                name,
                email,
                password,
                password_confirmation
            })
            .then(()=>{
                loader.hide()
                console.log('ok')
                router.push({name: 'login'})
            })
            .catch(err=>{
                loader.hide()
                validation.value = err
                if(validation.value.name) {
                   validate.name = validation.value.name[0]
                }
                if(validation.value.email) {
                   validate.email = validation.value.email[0]
                }
                if(validation.value.password) {
                   validate.password = validation.value.password[0]
                }
            })
        }

        return{
            user,
            validation,
            register,
            validate,
        }
    }
}
</script>