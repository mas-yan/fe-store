<template>
  <div class="m-lg-5 m-3 my-5">
      <h3 class="judul ms-3 mb-3">Checkout</h3>
      <div class="row">
        <div class="col-lg-8 col-12">
          <div class="me-3">
          <h6 class="fw-bold mb-0 ms-3">Alamat Pengiriman</h6>
          <hr class="ms-3 my-0" style="width: 97%">
          <div class="ms-3 mt-2" v-if="address.fullAddress && address.city > 0">
            <p class="mb-0 fw-bolder">{{address.name}}</p>
            <p class="m-0 p-0">{{address.noTelp}}</p>
            <p class="mb-0">{{address.provinsi_name}} - {{address.city_name}}</p>
            <p class="text-muted m-0 p-0">{{address.fullAddress}}</p>
            <a class="btn btn-outline-primary mt-1 btn-sm" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Ubah Alamat</a>
          </div>
          <div v-else>
            <h1 class="fw-bold mb-0 mt-0 ms-3">-</h1>
            <a class="btn btn-outline-primary btn-sm ms-3" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Tambah Alamat</a>
          </div>
          <div class="mb-3 ms-3" v-if="address.fullAddress && address.city_name && address.name && address.noTelp">
            <h6 class="fw-bold mb-0 mt-3">Pililh Pengiriman</h6>
            <hr class="mb-2 mt-0">
            <div class="mb-3">
              <label for="kab">Kurir</label>
              <select id="kab" @change="getCostOngkir" v-model="address.courier" class="form-control">
                <option value="" v-if="address.courier == 0" disabled>Pilih Kurir</option>
                <option class="py-1" value="jne">JNE</option>
                <option class="py-1" value="tiki">TIKI</option>
                <option class="py-1" value="pos">POS</option>
              </select>
            </div>
            <div v-if="cost && address.courier">
              <h6 class="fw-bold mb-0 mt-3">{{cost.code.toUpperCase()}} | {{cost.name}}</h6>
              <div class="form-check" v-for="(service,index) in cost.costs" :key="index">
                  <input class="form-check-input" @change="serviceName(service.service)" type="radio" :value="service.cost[0].value" v-model="address.ongkir">
                  <label>{{service.service}} - {{service.description}} - Rp. {{formatPrice(service.cost[0].value)}} ({{service.cost[0].etd}} hari)</label>
              </div>
            </div>
          </div>
          </div>
          <p class="fw-bold p-0 m-0 mt-3 ms-3">Detail Pesanan</p>
          <div class="card m-0 p-0 border-0" v-for="(product,index) in getProduct" :key="product.id">
            <div class="card-body pt-0">
              <hr class="m-0 p-0 text-primary" style="height:4px">
              <p class="fw-bold mt-2">Pesanan {{index +1}}</p>
              <div class="row">
                <div class="col-lg-2 col-3">
                  <img :src="product.image" class="img-fluid rounded img">
                </div>
                <div class="col-lg-10 col-9">
                  <h6 class="d-inline-block text-truncate fw-bold mb-0 text-decoration-none text-dark pb-0 trun" style="font-family: 'Nunito Sans';">{{product.title}}</h6>
                  <div v-if="product.discount">
                    <small class="text-danger"><s>Rp. {{formatPrice(product.old)}}</s> &nbsp;<span class="alert-danger rounded-pill px-1">{{product.discount}}%</span></small>
                    <p style="font-weight:600" class="m-0">Rp. {{formatPrice(product.price_discount)}}</p>
                  </div>
                  <div v-else>
                    <p style="font-weight:600" class="m-0">Rp. {{formatPrice(product.price)}}</p>
                  </div>
                  <p style="font-weight:600">Berat: {{product.berat * product.pivot.qty}}Kg ({{product.pivot.qty}} barang) </p>
                </div>
                  <hr class="ms-2 mb-0 mt-3" style="width: 97%">
                  <div class="d-flex justify-content-between">
                    <div>
                      <p class="m-0">Subtotal</p>
                    </div>
                    <div>
                      <p class="m-0" style="cursor: pointer" @click="myFunction(product.id)"><span class="fw-bold">Rp. {{formatPrice(product.price * product.pivot.qty)}} &nbsp; </span><i class="fas fa-caret-down text-muted" id="toggle"></i></p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div style="display: none" v-bind:id="`title${product.id}`">
                      <p class="m-0">Harga ({{product.pivot.qty}} barang)</p>
                    </div>
                    <div style="display: none" v-bind:id="`harga${product.id}`">
                      <p class="m-0">Rp. {{formatPrice(product.price)}} x {{product.pivot.qty}}</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <hr class="m-0 ms-3 p-0 text-primary" style="height:4px; width:96%">
        </div>
        <div class="col-lg-4 col-12">
          <div class="card shadow posisi border-0 mt-4 mt-md-0" style="border-radius: 16px !important ">
              <div class="card-body">
              <h4 class="judul"><i class="fas fa-shopping-bag"></i>&nbsp;Ringkasan Belanja: </h4>
              <div class="mx-3">
                <div class="row mt-3 text-muted fw-bold" style="font-family: open sans">
                  <div class="col">
                    Total harga
                  </div>
                  <div class="col">
                    <p class="text-end">Rp. {{formatPrice(data)}}</p>
                  </div>
                </div>
                <div class="row text-muted fw-bold" style="font-family: open sans">
                  <div class="col">
                    Total Ongkir <small>({{Math.floor(berat * 100) / 100}} Kg)</small>
                  </div>
                  <div class="col">
                    <p class="text-end">Rp. {{formatPrice(address.ongkir)}}</p>
                  </div>
                </div>
                <hr class="m-0 mb-3" style="height:4px">
                <div class="row fw-bold" style="font-family: open sans">
                  <div class="col">
                    Total Tagihan
                  </div>
                  <div class="col">
                    <p class="text-end text-danger">Rp. {{formatPrice(address.grand_total)}}</p>
                  </div>
                </div>
              </div>
              <div class="d-grid gap-2">
                <button @click="storeTransaction" class="btn btn-primary btn-style" :disabled="address.ongkir < 1">{{!address.name || !address.city ? 'Pilih Alamat Dulu' : !address.courier || !address.ongkir ? 'Pilih Pengiriman Dulu' : 'Pilih Pembayaran'}}</button>
              </div>
            </div>
            </div>
        </div>
      </div>
      <loading :active="isLoading" :loader="dots" :color="'#5a68d1'"
        :is-full-page="fullPage"></loading>
    </div>
    <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel">Mau Dikirim Kemana?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label for="name">Nama Lengkap</label>
                  <input type="text" id="name" v-model="address.name" class="form-control" placeholder="Nama Lengkap">
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="no">No Telepon</label>
                  <input type="number" id="no" v-model="address.noTelp" class="form-control" placeholder="No Telepon">
                </div>
              </div>
            </div>
            <div class="mb-3">
                <label for="provinsi">Provinsi</label>
                <select id="provinsi" @change="provisiName($event)" v-model="address.provinsi" class="form-control">
                  <option value="" disabled>Pilih Provinsi</option>
                  <option class="py-1" v-for="province in provinsi" :key="province.id" :value="province.province_id">{{ province.province }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="kab">Kabupaten/Kota</label>
                <select id="kab" @change="cityName($event)" v-model="address.city" class="form-control">
                  <option value="" v-if="address.city == 0" disabled>Pilih Kabupaten/Kota</option>
                  <option class="py-1" v-for="city in cities" :key="city.id" :value="city.city_id">{{city.type}} {{ city.city_name }}</option>
                </select>
            </div>
            <div class="mb-3">
              <label for="alamat">Alamat Lengkap</label>
              <textarea name="alamat" v-model="address.fullAddress" id="alamat" rows="3" placeholder="Alamat Lengkap" class="form-control"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">simpan</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import Loading from 'vue3-loading-overlay';
import { useRouter } from 'vue-router'
export default {
  components: {
        Loading
    },
  setup() {
    const store = useStore()
    const router = useRouter()
    const address = reactive({
      name:'',
      noTelp:'',
      fullAddress:'',
      provinsi:'',
      provinsi_name:'',
      city_name:'',
      city:'',
      weight: 0,
      courier: '',
      service: '',
      ongkir:0,
      grand_total: 0,
      product:[],
      qty: [],
      price: []
    })
    const isLoading = ref(false);
    const fullPage = ref(true);
    const dots = ref('dots');

    function storeTransaction() {
        isLoading.value = true;
        store.dispatch('order/storeTransaction', address)
        .then(() => {
          isLoading.value = false;
          window.snap.pay(store.state.order.snap_token, {
              onSuccess: function () {
                window.scrollTo(0, 0)
                store.dispatch('order/destroyProduct')
                store.dispatch('cart/cart')
                store.dispatch('cart/totalCart')
                router.push({name: 'order.detail',params:{slug: store.state.order.invoice}})  
              },
              onPending: function () {
                window.scrollTo(0, 0)
                store.dispatch('order/destroyProduct')
                store.dispatch('cart/cart')
                store.dispatch('cart/totalCart')
                router.push({name: 'order.detail',params:{slug: store.state.order.invoice}})
              },
              onError: function () {
                window.scrollTo(0, 0)
                store.dispatch('order/destroyProduct')
                store.dispatch('cart/cart')
                store.dispatch('cart/totalCart')
                router.push({name: 'order.detail',params:{slug: store.state.order.invoice}})  
              },
          })
        })
        .catch(error => {
            console.log(error)
        })
    }

    const data = computed(()=>{
      let arr = JSON.parse(JSON.stringify(store.state.order.product))
      let sum = 0

      arr.map(harga=>{
        let grand_total = harga.price
        if (harga.price_discount) {
          grand_total = harga.price_discount
        }
        sum = sum + (grand_total * harga.pivot.qty)
      })
      address.grand_total = sum + address.ongkir
      return sum
    })
    
    function provisiName(e) {
      address.provinsi_name = e.target.options[e.target.options.selectedIndex].text
      store.dispatch('ongkir/getCities',address.provinsi)
      .then(()=>{
        address.courier = ''
        address.city_name = ''
      })
    }
    
    function cityName(e) {
      address.city_name = e.target.options[e.target.options.selectedIndex].text
      store.dispatch('ongkir/getCities',address.provinsi)
      .then(()=>{
        address.courier = ''
      })
    }
    
    function serviceName(e) {
      address.service = e
      store.dispatch('ongkir/getCities',address.provinsi)
    }

    function getCostOngkir() {
      let city_destination = address.city
      let weight = address.weight
      let courier = address.courier

      if (weight < 1) {
        weight = 1
      }
      isLoading.value = true;
      store.dispatch('ongkir/getCostOngkir',{
          city_destination,
          weight,
          courier
      })
      .then(()=>{
        isLoading.value = false;
        address.ongkir = 0
      })
      .catch(()=>{
        isLoading.value = false;

      })
    }

    onMounted(()=>{
      store.dispatch('ongkir/getProvinsi')
    })

    const getProduct = computed(()=>{
      let arr = JSON.parse(JSON.stringify(store.state.order.product))
      let sub = null
      let x = null
      let id = []
      let qty = []
      let price = []
      
       arr.filter(harga=>{
        let grand_total = harga.price
        if (harga.price_discount) {
          harga['old'] = harga.price
          grand_total = harga.price_discount
          sub = harga.price = grand_total
          let p = JSON.stringify(arr).replace(/null/g, sub)
          x = JSON.parse(p);
        }
        x = arr
        id.push(harga.id)
        price.push(harga.price)
        qty.push(harga.pivot.qty)
      })
      address.product = id
      address.price = price
      address.qty = qty
      return x 
      
    })

    const provinsi = computed(()=>{
      return store.state.ongkir.provinsi
    })

    const cities = computed(()=>{
      return store.state.ongkir.cities
    })
    
    const cost = computed(()=>{
      return store.state.ongkir.cost[0]
    })

    const berat = computed(()=>{
      const produk = JSON.parse(JSON.stringify(store.state.order.product))
      let sum = 0
        produk.map((value) => {
        let grand_total = value.berat
          sum = sum + (grand_total * value.pivot.qty)
        })
        address.weight = sum
      return address.weight
    })

    function myFunction(id) {
      var x = document.getElementById(`title${id}`);
      var y = document.getElementById(`harga${id}`);
      var z = document.getElementById("toggle");
      if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.transform = "rotate(180deg)";
      } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.transform = "rotate(0deg)";
      }
    }

    return {
      provinsi,
      myFunction,
      provisiName,
      cityName,
      getCostOngkir,
      serviceName,
      cities,
      cost,
      getProduct,
      data,
      address,
      berat,
      storeTransaction,
      isLoading,
      fullPage,
      dots
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

button:disabled {
  cursor: not-allowed;
  pointer-events: all !important;
}

@media (min-width: 768px) {
  .img{
    height: 6rem;
    object-fit: cover;
  }
  .posisi{
    position: sticky !important;
    position: -webkit-sticky !important;
    top: 100px !important; /* required */
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