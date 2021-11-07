<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Slider />
        <Product/>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '@/components/Slider.vue'
import Product from '@/components/Product.vue'
export default {
  components: {
      Slider,
      Product
  },
  setup() {
    
  },
}
</script>