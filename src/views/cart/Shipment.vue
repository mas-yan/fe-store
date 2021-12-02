<template>
  <div class="m-lg-5 m-3 my-5">
      <!-- {{getProduct}} -->
      <h3 class="judul ms-3">Checkout</h3>
      <div class="row">
        <div class="col">
          <p class="fw-bold mb-0 ms-3">Alamat Pengiriman</p>
          <hr class="ms-3 my-0" style="width: 97%">
          <h1 class="fw-bold mb-0 mt-0 pt-0 ms-3">-</h1>
          <div class="mb-3" v-if="ongkir.city > 0">
            <label for="kab">Kurir</label>
            <select id="kab" @change="getCostOngkir" v-model="ongkir.courier" class="form-control">
              <option value="">Pilih Kurir</option>
              <option class="py-1" value="jne">JNE</option>
              <option class="py-1" value="tiki">TIKI</option>
              <option class="py-1" value="pos">POS</option>
            </select>
          </div>
          <a class="btn btn-outline-primary btn-sm ms-3" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Tambah Alamat</a>
          <hr class="ms-3" style="width: 97%">
          <p class="fw-bold mb-0 ms-3">Detail Pesanan</p>
          <div class="card border-0" v-for="(product,index) in getProduct" :key="product.id">
            <div class="card-body pb-0">
              <hr class="m-0 p-0 text-primary" style="height:4px">
              <p class="fw-bold">Pesanan {{index +1}}</p>
              <div class="row">
                <div class="col-lg-2 col-3">
                  <img :src="product.image" class="img-fluid rounded img">
                </div>
                <div class="col-lg-10 col-9">
                  <h6 class="d-inline-block text-truncate fw-bold mb-0 text-decoration-none text-dark pb-0 trun" style="font-family: 'Nunito Sans';">{{product.title}}</h6>
                  <p class="mb-0 mt-lg-3">{{product.pivot.qty}} barang ({{product.berat}} gr)</p>
                  <div v-if="product.discount">
                    <small class="text-danger"><s>{{formatPrice(product.old)}}</s> &nbsp;<span class="alert-danger rounded-pill px-1">{{product.discount}}%</span></small>
                    <p style="font-weight:600" class="m-0">{{formatPrice(product.price_discount)}}</p>
                  </div>
                  <div v-else>
                    <p style="font-weight:600" class="m-0">{{formatPrice(product.price)}}</p>
                  </div>
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
                  <div class="d-flex justify-content-between mb-3">
                    <div style="display: none" v-bind:id="`title${product.id}`">
                      <p class="m-0">Harga ({{product.pivot.qty}} barang)</p>
                      <p class="m-0">Ongkos Kirim</p>
                    </div>
                    <div style="display: none" v-bind:id="`harga${product.id}`">
                      <p class="m-0">Rp. {{formatPrice(product.price * product.pivot.qty)}}</p>
                      <p class="m-0">Rp. {{formatPrice(product.price)}}</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <hr class="m-0 ms-3 p-0 text-primary" style="height:4px; width:95%">
        </div>
        <div class="col-lg-4 col">
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
                    Total Ongkos Kirim
                  </div>
                  <div class="col">
                    <p class="text-end">Rp.999.000</p>
                  </div>
                </div>
                <hr class="m-0 mb-3" style="height:4px">
                <div class="row fw-bold" style="font-family: open sans">
                  <div class="col">
                    Total Tagihan
                  </div>
                  <div class="col">
                    <p class="text-end">Rp. 990.000</p>
                  </div>
                </div>
              </div>
              <div class="d-grid gap-2">
                <button class="btn btn-primary btn-style">Piliih Pembayaran</button>
              </div>
            </div>
            </div>
        </div>
      </div>
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
                  <input type="text" id="name" class="form-control" placeholder="Nama Lengkap">
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="no">No Telepon</label>
                  <input type="number" id="no" class="form-control" placeholder="No Telepon">
                </div>
              </div>
            </div>
            <div class="mb-3">
                <label for="provinsi">Provinsi</label>
                <select id="provinsi" @change="getCitiesDestination" v-model="ongkir.provinsi" class="form-control">
                  <option value="">Pilih Provinsi</option>
                  <option class="py-1" v-for="province in provinsi" :key="province.id" :value="province.province_id">{{ province.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="kab">Kabupaten/Kota</label>
                <select id="kab" v-model="ongkir.city" class="form-control">
                  <option value="">Pilih Kabupaten/Kota</option>
                  <option class="py-1" v-for="city in cities" :key="city.id" :value="city.city_id">{{ city.name }}</option>
                </select>
            </div>
            <div class="mb-3">
              <label for="alamat">Alamat Lengkap</label>
              <textarea name="alamat" id="alamat" rows="3" placeholder="Alamat Lengkap" class="form-control"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary">Simpan</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  setup() {
    let pesanan = 1
    const store = useStore()
    const ongkir = reactive({
      provinsi:'',
      city:'',
      weight: 0,
      courier: ""
    })

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
      return sum
    })
    function getCitiesDestination() {
      store.dispatch('ongkir/getCities',ongkir.provinsi)
    }

    function getCostOngkir() {
      let city_destination = ongkir.city
      let weight = ongkir.weight
      let courier = ongkir.courier

      console.log(city_destination);
      console.log(weight);
      console.log(courier);

      store.dispatch('ongkir/getCostOngkir',{
          city_destination,
          weight,
          courier
      })
    }

    onMounted(()=>{
      store.dispatch('ongkir/getProvinsi')
    })

    onMounted(()=>{
      return store.state.order.product
    })

    const getProduct = computed(()=>{
      let arr = JSON.parse(JSON.stringify(store.state.order.product))
      let sub = null
      let x = null

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
      })
      return x
    })

    const provinsi = computed(()=>{
      return store.state.ongkir.provinsi
    })

    const cities = computed(()=>{
      return store.state.ongkir.cities
    })
    
    const cost = computed(()=>{
      return store.state.ongkir.cost
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
      ongkir,
      pesanan,
      myFunction,
      getCitiesDestination,
      getCostOngkir,
      cities,
      cost,
      getProduct,
      data
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