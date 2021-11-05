<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Slider />
        <Category />
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '@/components/Slider.vue'
import Category from '@/components/Category.vue'
export default {
  components: {
      Slider,
      Category
  },
  setup() {
    
  },
}
</script>