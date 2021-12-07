<template>
  <div class="card mt-3 mt-lg-0 mt-xl-0 mt-xxl-0 shadow border-0">
    <!-- {{data}} -->
    <div class="card-body">
      <div v-if="data">
        <table class="table table-bordered table-responsive table-striped table-hover">
          <thead>
            <tr class="text-center">
              <th>Invoice</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data.data" :key="item.id" class="text-center">
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
        <nav class="d-flex justify-content-center">
          <ul class="pagination" v-for="(item,index) in data.links" :key="index">
            <li class="page-item">
              <a class="page-link" href="{{item.url}}}">
                <span>{{item.url}}</span>
              </a>
            </li>
            <!-- <li class="page-item active"><a class="page-link" href="#">2</a></li> -->
            <!-- <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li> -->
          </ul>
        </nav>
      </div>
      <div v-else class="alert alert-danger">
        Anda Belum Memiliki Riwayat Pembelian
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {

    const router = useRouter()
    const store = useStore()
    onMounted(()=>{
      store.dispatch('order/destroyProduct')
      store.dispatch('order/getOrder')
    })

    const data = computed(()=>{
      return store.state.order.order
    })

    function order(invoice) {
      router.push({name: 'order.detail',params:{slug: invoice}})
    }

    return{
      data,
      order
    }
  },
}
</script>