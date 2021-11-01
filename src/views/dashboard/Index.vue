<template>
  <div class="container my-5">
    <div class="row">
      <Dashboard></Dashboard>
      <div class="col-12 col-lg-8 col-xl-8 col-xxl-8">
        <div class="card mt-3 mt-lg-0 mt-xl-0 mt-xxl-0 shadow border-0">
          <div class="card-body">
            <router-view></router-view>
          </div>
        </div>
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
