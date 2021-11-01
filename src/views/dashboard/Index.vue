<template>
  <div class="container my-5">
    <div class="row">
      <Dashboard></Dashboard>
      <div class="col-12 col-lg-8 col-xl-8 col-xxl-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Dashboard from "../../components/Dashboard.vue";
export default {
  setup(){
    
  },
  name: 'App',
  components: {
    Dashboard
},


  
}
</script>
