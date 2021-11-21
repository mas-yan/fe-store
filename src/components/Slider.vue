<template>
  <div class="mt-5 mb-4 m-lg-5 m-3 mt-5">
    <div v-if="sliders.length > 0">
      <vueper-slides slide-image-inside autoplay :fixed-height="true" class="no-shadow" style="border-radius: 20px;">
            <template v-slot:arrow-left>
              <i class="fas fa-chevron-circle-left"></i>
          </template>
              <vueper-slide style="border-radius: 20px;" v-for="(slider, i) in sliders" :key="i" :image="slider.image" :link="slider.link"/>
          <template v-slot:arrow-right>
              <i class="fas fa-chevron-circle-right"></i>
          </template>
      </vueper-slides>
    </div>
    <div v-else>
      <ContentLoader class="shadow rounded" />
    </div>
  </div>
</template>

<style scoped>
.vueperslides--fixed-height {
    height: 150px; 
}

@media (min-width: 768px) {
    .vueperslides--fixed-height {
      height: 250px; 
    }
  }

@media (min-width: 992px) { 
  .vueperslides--fixed-height {
    height: 400px; 
  }
}
</style>

<script>
    //hook vue
    import { computed, onMounted  } from 'vue'

    //vuex
    import { useStore } from 'vuex'

    //content loader
    import { ContentLoader } from 'vue-content-loader'
    
    //vueper slider
    import { VueperSlides, VueperSlide } from 'vueperslides'
    import 'vueperslides/dist/vueperslides.css'

    export default {

        components: {
            ContentLoader,
            VueperSlides, 
            VueperSlide
        },

        setup() {

            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action "getSlider" di module "slider"
            onMounted(() => {
                store.dispatch('slider/getSlider')
            })

            //digunakan untuk get data state "sliders" di module "slider" 
            const sliders = computed(() => {
              // console.log(store.state.slider.sliders);
                return store.state.slider.sliders
            })

            return {
                sliders,   // <-- sliders
            }

        }

    }
</script>