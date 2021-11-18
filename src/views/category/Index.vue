<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-6 col-md-3 p-2" v-for="category in categories" :key="category.id">
        <router-link :to="{name:'category.show',params:{slug: category.slug}}" class="card border-0 mb-2 tes">
          <img :src="category.image">
          <div class="card-body py-0 m-0 rounded shadow">
              <h6 class="text-center text-dark d-block text-truncate pt-3">{{category.name}}</h6>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>import { useStore } from "vuex"
import { computed, onMounted } from '@vue/runtime-core'

export default {
  setup() {
    const store = useStore()
    onMounted(()=>{
      store.dispatch('category/getCategory')
    })

    const categories = computed(()=>{
      return store.state.category.categories
    })

    return {
      categories
    }
  },
}
</script>

<style scoped>
.fb{
    width: 1300px;
    height: 100%;
  }
.card{
  border-radius: 16px !important;
  height: 255px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
}
img{
  max-height: 200px;
  height: 200px;
}

.card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

@media (min-width: 768px) { 
  .card{
    border-radius: 16px !important;
    height: 255px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;
  }
  img{
    max-height: 255px;
  }
  .fb{
    width: 1500px;
    height: 100%;
  }
}
@media (min-width: 992px) { 
  .card{
    border-radius: 16px !important;
    height: 300px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;
  }
  img{
    max-height: 250px;
    height: 240px;
  }
  .fb{
    width: 900px;
    height: 100%;
  }
}
</style>