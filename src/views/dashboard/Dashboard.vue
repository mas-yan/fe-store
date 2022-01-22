<template>
<div class="alert alert-primary mt-3">
  Selamat Datang <b>{{ user.name }}</b>
</div>
    <div class="card mt-3 mt-lg-0 mt-xl-0 mt-xxl-0 shadow border-0 text-center">
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
            <h5 class="card-title">Lorem ipsum dolor sit amet.</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut at odit quidem obcaecati voluptatibus molestias nihil magni, voluptatum, aliquid deserunt dolorum numquam incidunt ipsa asperiores tempora, corporis maiores placeat id non temporibus? Odio nobis similique, totam deleniti in voluptatibus maxime eum reprehenderit aliquid impedit maiores obcaecati iste nisi! Perferendis, asperiores.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus ea eius eos blanditiis commodi sit! Laudantium porro unde similique minima perspiciatis impedit nesciunt non vero magni, accusamus, veniam sunt? Est facilis eum odio deleniti dolores excepturi rerum, corporis aliquam atque, beatae quisquam eius labore nam repellendus aspernatur non ex dignissimos quasi dolore autem quaerat! Excepturi, officia qui doloremque pariatur earum esse tempora nesciunt voluptatum? Deserunt sunt temporibus quam corrupti quis rem, ad recusandae nisi, molestiae adipisci asperiores modi vero dolor et explicabo neque culpa, dolorum ipsum perferendis vitae dolore ipsa! Hic, veritatis dolorem quam excepturi deleniti modi et vel.
          </div>
          <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque necessitatibus, sit, esse nihil perferendis nostrum facere earum autem atque quam, modi culpa? Magni soluta explicabo at porro atque placeat provident nobis sit voluptate repellendus incidunt consectetur quidem animi, iusto sunt veniam dolorem iste illum ipsa maxime culpa nostrum ad fuga? Fugit maxime ipsum qui! Fugiat corrupti iusto voluptatibus, distinctio minus optio? Esse atque provident officia animi labore illum praesentium maxime magni nulla deleniti saepe totam aspernatur maiores iure modi doloremque unde rem adipisci eos, voluptatem molestiae minus voluptate. Exercitationem maiores impedit autem similique veniam cum deleniti, beatae corrupti minima iure.
          </div>
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