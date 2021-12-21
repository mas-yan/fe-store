<template>
    <div class="container my-5">
        <div class="card shadow rounded border-0 p-3">
            <h1 class="text-center text-primary text-muted mb-4">Masuk Untuk Mulai Belanja</h1>
            <div class="row">
                <div class="col-6 mt-4 d-none d-lg-block d-xl-block d-xxl-block">
                        <img class="img-fluid" src="@/assets/images/login.svg" alt="">
                </div>
                <div class="col-lg-6 col-xl-6 mt-lg-4 col-xxl-6 col-12">
                    <div class="card border-0 rounded">
                        <div class="card-body">
                            <h5 class="text-muted">Login</h5>
                            <hr style="height: 4px" />
                            <form @submit.prevent="login">
                                <div class="mb-3">
                                    <label for="email">Email</label>
                                    <input
                                        v-model="user.email"
                                        :class="{'is-invalid':validate.email.length>0}"
                                        type="email"
                                        id="email"
                                        class="form-control"
                                        placeholder="Masukkan Email"
                                    />
                                    <div class="invalid-feedback">
                                        {{validate.email}}
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="password">Password</label>
                                    <input
                                        v-model="user.password"
                                        :class="{'is-invalid':validate.password.length>0}"
                                        type="password"
                                        autocomplete
                                        id="password"
                                        class="form-control"
                                        placeholder="Masukkan Password"
                                    />
                                    <div class="invalid-feedback">
                                        {{validate.password}}
                                    </div>
                                </div>
                                <div class="text-danger my-3" v-if="validate.message.length>0">
                                    {{validate.message}}
                                </div>
                                <button class="btn text-white btn-primary">Masuk</button>
                            </form>
                        </div>
                    </div>
                    <div class="text-center mt-3 mb-5 d-lg-none d-xl-none d-xxl-none">
                        Belum Punya Akun? <router-link :to="{name:'register'}">Daftar Disini</router-link>
                    </div>
                </div>
            </div>
        </div>
        <loading :active="isLoading" :loader="dots" :color="'#5a68d1'"
        :is-full-page="fullPage"></loading>
    </div>
</template>

<script>import { reactive,ref } from "@vue/reactivity"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// Import component
import Loading from 'vue3-loading-overlay';
import { onMounted } from '@vue/runtime-core'

export default {
    components: {
        Loading
    },
    setup() {
        // user state
        const user = reactive({
            email: '',
            password: ''
        })
        const isLoading = ref(false);
        const fullPage = ref(true);
        const dots = ref('dots');

        // validation state
        const validate = reactive({
            email: '',
            password: '',
            message:''
        })
        
        const validation = ref([])

        // store Vuex
        const store = useStore()

        const router = useRouter()

        // funcction login
        function login() {
            isLoading.value = true;
            let email = user.email
            let password = user.password

            store.dispatch('auth/login',{
                email,
                password
            })
            .then(()=>{
                console.log('success');
                isLoading.value = false;
                router.push({name:'index'})
            })
            .catch(err=>{
                isLoading.value = false;
                validation.value = err
                if (validation.value.email) {
                    validate.email = validation.value.email[0]
                }else{
                    validate.email = ''
                }
                if (validation.value.password) {
                    validate.password = validation.value.password[0]
                }else{
                    validate.password = ''
                }
                if(validation.value.message) {
                    validate.message = "Yakin itu benar? Coba diingat lagi."
                }else{
                    validate.message = ''
                }
            })
        }

        onMounted(()=>{
            if (store.getters['auth/isLoggedIn']) {
                router.push({name:'index'})
            }
        })

        return{
            user,
            login,
            validate,
            isLoading,
            fullPage,
            dots
        }
    },
    
}
</script>