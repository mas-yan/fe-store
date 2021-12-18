<template>
  <div v-if="data.length > 0">
    <div class="card mt-3 mt-lg-0 mt-xl-0 mt-xxl-0 shadow border-0">
      <div class="card-header me-3 judul bg-white border-0">Info Pembelian</div>
          <hr class="m-0 mx-3 p-0 text-primary" style="height:4px">
      <!-- {{data}} -->
      <div class="card-body">
        <table class="table table-borderless table-responsive">
          <tbody>
            <tr>
              <td class="text-muted fw-bold">No Invoice</td>
              <td>{{data[0].invoice}}</td>
            </tr>
            <tr>
              <td class="text-muted fw-bold">Nama Lengkap</td>
              <td>{{data[0].full_name}}</td>
            </tr>
            <tr>
              <td class="text-muted fw-bold">Phone</td>
              <td>{{data[0].phone}}</td>
            </tr>
            <tr>
              <td class="text-muted fw-bold">Kota/Kabupaten</td>
              <td>{{data[0].city}}</td>
            </tr>
            <tr>
              <td class="text-muted fw-bold">Provinsi</td>
              <td>{{data[0].province}}</td>
            </tr>
            <tr>
              <td class="text-muted fw-bold">Alamat Legkap</td>
              <td>{{data[0].address}}</td>
            </tr>
            <tr>
              <td class="text-muted fw-bold">Kurir/Service/ Ongkir</td>
              <td>{{data[0].courir}} / {{data[0].service}} / Rp. {{formatPrice(data[0].cost)}}</td>
            </tr>
            <tr>
              <td class="text-muted fw-bold">Total Bayar</td>
              <td>Rp. {{formatPrice(data[0].grand_total)}}</td>
            </tr>
            <tr>
              <td class="text-muted fw-bold">Status</td>
              <td v-if="data[0].status == 'pending'"><button class="btn-warning btn" @click="pay(data[0].snap_token)">Bayar</button></td>
              <td v-else-if="data[0].status == 'success'"><button class="btn-success btn" disabled>Success</button></td>
              <td v-else-if="data[0].status == 'expired'"><button class="btn-secondary btn" disabled>Expired</button></td>
              <td v-else-if="data[0].status == 'failed'"><button class="btn-danger btn" disabled>Failed</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card mt-3 shadow border-0 p-3">
        <div class="card-header bg-white border-0 judul">
          Item Yang Dibeli
        </div>
      <div class="card m-0 p-0 border-0" v-for="(product) in data[0].product" :key="product.id">
        <div class="card-body pt-0">
          <hr class="m-0 p-0 text-primary" style="height:4px">
          <div class="row mt-3">
            <div class="col-lg-2 col-3">
              <img :src="product.image" class="img-fluid rounded img">
            </div>
            <div class="col-lg-10 col-9">
              <router-link :to="{name:'product.show',params:{'slug':product.slug}}" class="d-inline-block text-truncate fw-bold mb-0 text-decoration-none text-dark pb-0 trun" style="font-family: 'Nunito Sans';">{{product.title}}</router-link>
              <div v-if="product.discount">
                <small class="text-danger"><s>Rp. {{formatPrice(product.old)}}</s> &nbsp;<span class="alert-danger rounded-pill px-1">{{product.discount}}%</span></small>
                <p style="font-weight:600" class="m-0">Rp. {{formatPrice(product.price_discount)}}</p>
              </div>
              <div v-else>
                <p style="font-weight:600" class="m-0">Rp. {{formatPrice(product.pivot.price)}}</p>
              </div>
              <p class="fw-bold text-muted">Qty : {{product.pivot.qty}}</p>
              <button class="btn-primary btn btn-sm" v-if="data[0].status == 'success'">Review Barang</button>
            </div>
          </div>
        </div>
      </div>
      <hr class="m-0 ms-3 p-0 text-primary" style="height:4px; width:95%">
    </div>
  </div>
  <div v-else>
    <div class="row">
      <div class="col-12">
        <div class="card shadow border-0 mt-3 mt-md-0" style="border-radius: 16px !important">
          <ContentLoader class="rounded" />
        </div>
      </div>
      <div class="col-12 mt-3">
        <div class="card shadow border-0 mt-3 mt-md-0" style="border-radius: 16px !important">
          <ContentLoader class="shadow rounded" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    onMounted(()=>{
      store.dispatch('order/getDetail',route.params.slug)
    })

    function pay(snap_token) {
      window.snap.pay(snap_token, {
          onSuccess: function () {
            router.push({name: 'order.detail',params:{slug: route.params.slug}})  
          },
          onPending: function () {
            router.push({name: 'order.detail',params:{slug: store.state.order.invoice}})
          },
          onError: function () {
            router.push({name: 'order.detail',params:{slug: store.state.order.invoice}})  
          },
      })
    }

    const data = computed(()=>{
      return store.state.order.detail
    })

    return{
      data,
      pay
    }
  },
}
</script>

<style scoped>
.trun{
  max-width: 11.5rem;
}

.img{
  height: 5.5rem;
}

@media (min-width: 768px) {
  .img{
    height: 6rem;
    object-fit: cover;
  }
}
@media (min-width: 992px) { 
  .trun{
    max-width: 450px;
  }

  .img{
    height: 7rem;
  }

}
</style>