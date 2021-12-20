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
              <!-- Button trigger modal -->
              <button type="button" v-if="data[0].status == 'success'" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="`#rating${product.id}`">
                Review Barang
              </button>
              <!-- Modal -->
              <div class="modal fade" v-bind:id="`rating${product.id}`" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Review Buku {{product.title}}</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="d-flex justify-content-center">
                      <star-rating @update:rating ="setRating" :show-rating="false" :star-size="50" :glow="10" glow-color="#ffd055"></star-rating>
                      </div>
                      <div class="input-group mb-3 mt-4">
                        <input type="file" @change="onFIleChange" class="form-control" id="inputGroupFile02">
                      </div>
                      <div class="mt-4">
                        <textarea class="form-control" v-model="rate.review" placeholder="Beri Ulasan"></textarea>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" @click="review(product.id,product.slug)" class="btn btn-primary" data-bs-dismiss="modal">Kirim Ulasan</button>
                    </div>
                  </div>
                </div>
              </div>
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
import { computed, inject, onMounted, reactive } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ContentLoader } from 'vue-content-loader'
import StarRating from 'vue-star-rating'
import { useLoading } from 'vue3-loading-overlay'

export default {
  components: {
    ContentLoader,
    StarRating
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const swal = inject('$swal')

    let rate = reactive({
      rating: 0,
      image:'',
      review:''
    })

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

    function setRating(rating) {
      rate.rating = rating
    }

    const data = computed(()=>{
      return store.state.order.detail
    })


    function onFIleChange(e) {
      rate.image = e.target.files[0]
    }

    function review(product,slug) {
      
        let loader = useLoading();
        loader.show({
            color: '#5a68d1',
            loader: 'dots',
        });

        if (rate.rating < 1) {
          loader.hide()
          swal({
              icon: 'error',
              title: 'Harus Memberi Setidaknya 1 Bintang!',
            })
        }else{
          //formdata
        let formData = new FormData();

        formData.append('star', rate.rating)
        formData.append('image', rate.image)
        formData.append('review', rate.review)
        formData.append('product', product)

        //panggil actions "updateProfile" dari module "profile"
        store.dispatch('order/postReview', formData)
        .then(() => {

            router.push({name:'product.show',params:{'slug':slug}})
            loader.hide()
            swal({
              icon: 'success',
              title: 'Berhasil Memberi Ulasan!',
            })

            //set imageAvatar to null
            rate.image = ''

        }).catch(error => {
          loader.hide()
          console.log(error);
        })
        }
    }
    
    return{
      data,
      pay,
      rate,
      setRating,
      onFIleChange,
      review
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