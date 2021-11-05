<template>
  <div class="container mb-5">
    <h3> Kategory</h3>
    <hr style="height: 4px" class="bg-primary">
    <div class="row" v-if="categories.length > 0">
      <div class="col-4 p-1" v-for="category in categories" :key="category.id">
        <div class="card shadow border-0">
          <div class="row g-0">
            <div class="col-lg-3 p-2 text-center">
              <img :src="category.image" class="img-fluid rounded mx-auto d-block img">
            </div>
            <div class="col-lg-9">
              <div class="card-body">
                <span class="text-primary text-lg-start text-xl-start text-xxl-start text-center d-block">{{category.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 p-1">
        <div class="card shadow-lg border-0">
          <div class="row g-0">
            <div class="col-lg-3 p-2 text-center">
              <img src="../assets/images/menu.png" class="img-fluid rounded mx-auto d-block img">
            </div>
            <div class="col-lg-9">
              <div class="card-body">
                <span class="text-primary text-lg-start text-xl-start text-xxl-start text-center d-block">Kategori Lainnya</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-4 p-1" v-for="index in 6" :key="index">
        <ContentLoader/>
      </div>
    </div>
  </div>
</template>

<script>import { useStore } from "vuex"
import { computed, onMounted } from '@vue/runtime-core'
import { ContentLoader } from 'vue-content-loader'

export default {
  components:{
    ContentLoader
  },
  setup() {
    const store = useStore()
    onMounted(() => {
        store.dispatch('category/getCategoryHome')
    })

    //digunakan untuk get data state "categories" di module "category" 
    const categories = computed(() => {
        return store.state.category.categories
    })

    return {
      categories
    }
  },
}
// fix layout category resp mobile
</script>

<style scoped>
  .img{
    width: 100%;
    height: auto;
    padding-top: 10px;
  }
  .card{
    overflow: hidden;
    height: 150px;
    border-radius: 15px;
  }
  span{
    font-weight: 500;
  }
  @media (min-width: 768px) {
    .img{
      height: 5em;
      padding-left: 10px;
      padding-right: 5px;
      padding-top: 5px;
    }
    span{
      font-weight: bold;
    }
  }
@media (min-width: 992px) { 
  span{
    margin-top: 10px;
    font-weight: bold;
  }
  .card{
    height: 80px;
  }
  .img{
    width: 100%;
    height: auto;
    /* padding-left: 0px; */
    /* padding-top: 10px; */
  }
}
</style>

