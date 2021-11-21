<template>
  <Slider />
  <!-- <div class="container"> -->
    <!-- <div class="row"> -->
      <!-- <div class="col"> -->
        <!-- <Category/> -->
        <Product/>
      <!-- </div> -->
    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
// import Category from '@/components/Category.vue'
import Slider from '@/components/Slider.vue'
import Product from '@/components/Product.vue'
export default {
  components: {
      Slider,
      Product,
      // Category
  },
  setup() {
    
  },
}
</script>