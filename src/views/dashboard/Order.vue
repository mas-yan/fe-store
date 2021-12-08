<template>
  <div class="card mt-3 mt-lg-0 mt-xl-0 mt-xxl-0 shadow border-0">
    <!-- {{page}} -->
    <div class="card-body">
      <div v-if="data">
        <table class="table table-bordered table-responsive table-striped table-hover">
          <thead>
            <tr class="text-center">
              <th>No</th>
              <th>Invoice</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in data.data" :key="index" class="text-center">
              <td>{{index+data.from}}</td>
              <td>{{item.invoice}}</td>
              <td>
                <button class="btn-warning btn btn-sm" v-if="item.status == 'pending'">{{item.status}}</button>
                </td>
              <td>
                <a @click="order(item.invoice)" class="btn btn-sm btn-success">Detail</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-center">
          <pagination v-model="page.page" :records="data.total" :per-page="data.per_page" @paginate="paginate(page.page)"/>
        </div>
      </div>
      <div v-else class="alert alert-danger">
        Anda Belum Memiliki Riwayat Pembelian
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Pagination from 'v-pagination-3';
export default {
  components: {
    Pagination
  },
  setup() {

    const page = ref({
      page: 1
    })

    const router = useRouter()
    const store = useStore()
    onMounted(()=>{
      store.dispatch('order/destroyProduct')
      store.dispatch('order/getOrder',1 )
    })

    const data = computed(()=>{
      return store.state.order.order
    })

    function paginate(params) { 
      store.dispatch('order/getOrder',params)
    }

    function order(invoice) {
      router.push({name: 'order.detail',params:{slug: invoice}})
    }

    return{
      data,
      order,
      paginate,
      page
    }
  },
}
</script>