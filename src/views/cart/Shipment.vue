<template>
  <div class="m-lg-5 m-3 my-5">
    <!-- {{provinsi}} -->
    <div class="col-lg-4 col">
        <div class="card shadow border-0 mt-3 mt-md-0" style="border-radius: 16px !important">
            <div class="card-body">
              <h4>Destination</h4>
              <div class="mb-3">
                  <label for="PROVINSI">PROVINSI</label>
                  <select id="PROVINSI" @change="getCitiesDestination" v-model="ongkir.provinsi" class="form-control">
                    <option class="py-1" v-for="province in provinsi" :key="province.id" :value="province.province_id">{{ province.name }}</option>
                  </select>
              </div>
            </div>
          </div>
      </div>
      <h3 class="judul ms-3">Checkout</h3>
      <div class="row">
        <div class="col">
          <p class="fw-bold mb-0 ms-3">Detail Pesanan</p>
          <div>
            <div class="card border-0" v-for="i in 1" :key="i">
              <div class="card-body pb-0">
                <hr class="m-0 p-0 text-primary" style="height:4px">
                <p class="fw-bold">Pesanan {{pesanan++}}</p>
                <div class="row">
                  <div class="col-lg-2">
                    <div class="card rounded">
                      <div class="card-body m-0 p-0">
                        <img src="http://my-store.test/storage/products/q3ucbIZFsNbISysT2WvvAEQQleKsUBGMDIAE6MDf.jpg" class="img-fluid rounded img">
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-10">
                    <h6 class="d-inline-block text-truncate fw-bold mb-0 text-decoration-none text-dark pb-0 trun" style="font-family: 'Nunito Sans';">Jujutsu Kaisen 04 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium sed quam sequi distinctio repellendus eum Laudantium sed quam sequi distinctio repellendus eum</h6>
                    <p class="mb-0">5 barang (500 gr)</p>
                    <small class="text-danger"><s>Rp. 999.000</s> &nbsp;<span class="alert-danger rounded-pill px-1">99%</span></small>
                    <p style="font-weight:600" class="m-0">Rp. 999.000</p>
                  </div>
                    <hr class="ms-2 mb-0 mt-3" style="width: 97%">
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="m-0">Subtotal</p>
                      </div>
                      <div>
                        <p class="m-0" style="cursor: pointer" @click="myFunction(i)"><span class="fw-bold"> Rp. 999.000 </span><i class="fas fa-caret-down text-muted" id="toggle"></i></p>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between mb-3">
                      <div style="display: none" v-bind:id="'title'+i">
                        <p class="m-0">Harga (99 barang)</p>
                      </div>
                      <div style="display: none" v-bind:id="'harga'+i">
                        <p class="m-0">Rp. 999.000</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            <hr class="m-0 ms-3 p-0 text-primary" style="height:4px; width:95%">
          </div>
        </div>
        <div class="col">
          ajsbs
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
      provinsi:''
    })

    onMounted(()=>{
      store.dispatch('ongkir/getProvinsi')
    })

    const provinsi = computed(()=>{

      return store.state.ongkir.provinsi
    })

    function myFunction(id) {
      var x = document.getElementById("title"+id);
      var y = document.getElementById("harga"+id);
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
      myFunction
    }
  },
}
</script>

<style scoped>
.trun{
  max-width: 11.5rem;
}

@media (min-width: 992px) { 
  .trun{
    max-width: 450px;
  }
}
</style>