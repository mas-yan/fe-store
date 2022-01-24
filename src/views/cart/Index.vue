<template>
  <div class="container my-5">
    <div class="row" v-if="carts.cart.length > 0">
      <div class="col-lg-8 col-12">
        <div class="card" style="border-radius: 16px !important">
          <div class="card-body d-none d-lg-block d-xl-block ps-2 d-xxl-block">
            <h4 class="ms-2 judul"><i class="fas fa-shopping-cart"></i>&nbsp;Keranjang Saya : </h4>
            <table class="table">
              <tbody>
                <tr>
                  <th>
                    <div class="form-check">
                      <input class="form-check-input" @click='selectAll()' v-model='product.isCheckAll' type="checkbox" id="flexCheckDefault">
                    </div>
                  </th>
                  <th colspan="2" class="text-lg-start">Product</th>
                  <th>Harga</th>
                  <th :colspan="(product.check.length > 0) ? 0 : 2">QTY</th>
                  <th v-show="product.check.length > 0"><a @click="deleteCheckProduck" class="text-danger text-decoration-none qty">Hapus</a></th>
                </tr>
                <tr v-for="cart in carts.cart" :key="cart.id">
                  <td>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" v-bind:value='cart.id' v-model='product.check' @change='updateCheckall' id="flexCheckDefault">
                    </div>
                  </td>
                  <td class="img">
                    <img :src="cart.image" style="background:#f1f5f8" class="rounded product img-fluid">
                  </td>
                  <td>
                    <router-link @click="move" :to="{name: 'product.show',params:{'slug':cart.slug}}" class="d-inline-block text-truncate fw-bold text-decoration-none text-dark trun">{{cart.title}}</router-link>
                    <p class="fw-bold m-0 text-muted">Stok {{cart.stok}}</p>
                    <p class="m-0">Berat: {{cart.berat}} kg</p>
                  </td>
                  <td v-if="cart.discount">
                    <small class="text-danger"><s>Rp. {{formatPrice(cart.price)}}</s> &nbsp;<span class="alert-danger rounded-pill px-1">{{cart.discount}}%</span></small>
                    <p style="font-weight:600">Rp. {{formatPrice(cart.price_discount)}}</p>
                  </td>
                  <td class="txt" v-else>
                      <p style="font-weight:600">Rp. {{formatPrice(cart.price)}}</p>
                  </td>
                  <td class="txt">
                    <div class="border d-inline rounded p-1 ps-1">
                    <a @click="subtQty(cart.slug)" v-if="cart.pivot.qty >1" class="qty"><i class="fas fa-minus-circle"></i></a> <span class="fw-bold"> {{cart.pivot.qty}} </span> <a @click="addQty(cart.slug)" v-if="parseInt(cart.pivot.qty) < parseInt(cart.stok) " class="qty text-primary"><i class="fas fa-plus-circle"></i></a>
                    </div>
                  </td>
                  <td class="txt" :class="[product.check.length > 0 ? 'text-center' : '']">
                    <a @click="deleteCart(cart.slug)" class="qty text-danger"><i class="fas fa-trash"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-body d-block d-lg-none d-xl-none ps-2 d-xxl-none">
            <h4 class="judul"><i class="fas fa-shopping-cart"></i>&nbsp;Keranjang Saya : </h4>
            <div class="ms-2 mt-4 form-check">
              <input class="form-check-input" @click='selectAll()' v-model='product.isCheckAll'  type="checkbox" id="flexCheckDefault">
              <label class="form-check-label ms-4" for="flexCheckDefault">
                Pilih Semua
              </label>
              <a @click="deleteCheckProduck" v-show="product.check.length > 0" class="text-danger float-end text-decoration-none qty">Hapus</a>
            </div>
            <hr class="mb-0 mt-0">
            <table class="table">
              <tbody>
                <tr v-for="cart in carts.cart" :key="cart.id">
                  <td>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" v-bind:value='cart.id' v-model='product.check' @change='updateCheckall' id="flexCheckDefault">
                    </div>
                  </td>
                  <td>
                    <div class="img">
                      <img :src="cart.image" style="background:#f1f5f8" class="rounded product img-fluid">
                    </div>
                  </td>
                  <td>
                    <router-link @click="move" :to="{name: 'product.show',params:{'slug':cart.slug}}" class="d-inline-block text-truncate fw-bold mb-0 text-decoration-none text-dark pb-0 trun">{{cart.title}}</router-link>
                    <div class="mb-1" v-if="cart.discount">
                      <small class="text-danger"><s>Rp. {{formatPrice(cart.price)}}</s> &nbsp;<span class="alert-danger rounded-pill px-1">{{cart.discount}}%</span></small>
                      <p style="font-weight:600">Rp. {{formatPrice(cart.price_discount)}}</p>
                    </div>
                    <div v-else>
                      <p style="font-weight:600" class="mb-0">Rp. {{formatPrice(cart.price)}}</p>
                    </div>
                      <span class="m-0 fw-bold text-muted">Stok {{cart.stok}} &nbsp;</span>
                    <div class="float-end">
                      <div class="border d-inline rounded p-1 ps-1">
                        <a @click="subtQty(cart.slug)" v-if="cart.pivot.qty >1" class="qty"><i class="fas fa-minus-circle"></i></a> <span class="fw-bold"> {{cart.pivot.qty}} </span> <a @click="addQty(cart.slug)" class="qty text-primary"><i class="fas fa-plus-circle"></i></a>
                      </div> &nbsp; &nbsp;
                      <a @click="deleteCart(cart.slug)" class="qty text-danger"><i class="fas fa-trash"></i></a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-12">
        <div class="posisi card shadow border-0 mt-3 mt-md-0" style="border-radius: 16px !important">
            <div class="card-body">
              <h4 class="judul"><i class="fas fa-shopping-bag"></i>&nbsp;Ringkasan Belanja: </h4>
              <div class="mx-3">
                <div class="row mt-3 text-muted fw-bold" style="font-family: open sans">
                  <div class="col">
                    Sub Total
                  </div>
                  <div class="col">
                    <p class="text-end">Rp. {{formatPrice(data)}}</p>
                  </div>
                </div>
                <div class="row text-muted fw-bold" style="font-family: open sans">
                  <div class="col">
                    Total Barang
                  </div>
                  <div class="col">
                    <p class="text-end">{{total}} Barang</p>
                  </div>
                </div>
                <hr class="m-0 mb-3" style="height:4px">
                <div class="row fw-bold" style="font-family: open sans">
                  <div class="col">
                    Total Harga
                  </div>
                  <div class="col">
                    <p class="text-end">Rp. {{formatPrice(data)}}</p>
                  </div>
                </div>
              </div>
              <div class="d-grid gap-2">
                <button :disabled="product.check.length < 1" @click="shipment" class="btn btn-primary btn-style">Checkout</button>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div v-else-if="cek > 0 ||carts.cart.length == 0 && cek == null">
      <div class="row">
        <div class="col-md-6 col-12">
          <div class="card shadow border-0 mt-3 mt-md-0" style="border-radius: 16px !important">
            <ContentLoader class="rounded" />
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="card shadow border-0 mt-3 mt-md-0" style="border-radius: 16px !important">
            <ContentLoader class="shadow rounded" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="carts.cart.length == 0 && cek == 0">
      <img src="../../assets/images/cart_empty.svg" class="img-fluid empty">
      <p class="text-empty text-center">Yah Keranjangmu Kosong Nih</p>
      <p class="sub-empty text-center">Saya rasa tombol dibawah ini sangatlah penting, Yuk isi keranjang ini dengan buku kesukaanmu!</p>
      <div class="d-flex justify-content-center">
        <router-link :to="{name: 'home'}" class="btn btn-primary btn-lg btn-style text-center">Mulai Belanja</router-link>
      </div>
    </div>
    <loading :active="isLoading" :loader="dots" :color="'#5a68d1'"
        :is-full-page="fullPage"></loading>
  </div>
</template>

<script>
import { computed, inject, onMounted, reactive, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import Loading from 'vue3-loading-overlay';
import { useRouter } from 'vue-router'

export default {
  components: {
    ContentLoader,
    Loading
  },
  
  setup() {
    const store = useStore()
    const isLoading = ref(false);
    const fullPage = ref(true);
    const dots = ref('dots');
    const swal = inject('$swal')
    const router = useRouter()

    let product = reactive({
      isCheckAll: false,
      prod: '',
      check: []
    })

    onMounted(()=>{
      store.dispatch('cart/cart')
    })

    function shipment(){
      let arr = JSON.parse(JSON.stringify(product.prod))
      let check = JSON.parse(JSON.stringify(product.check))
      let data = []

      arr.filter(cek=>{
        return check.indexOf(cek.id) !== -1
      })
      .map(total=>{
        data.push(total)
      })
      store.dispatch('order/addProduct',data)
      router.push({name: 'shipment'})
    }

    function selectAll() {
      product.isCheckAll = !product.isCheckAll;
      product.check = [];
      if(product.isCheckAll){ // Check all
        for (var key in product.prod) {
          product.check.push(product.prod[key].id);
        }
      }
    }

    function updateCheckall(){
      if(product.check.length == product.prod.length){
         product.isCheckAll = true;
      }else{
         product.isCheckAll = false;
      }
    }

    function deleteCheckProduck() {
      let arr = JSON.parse(JSON.stringify(product.prod))
      let check = JSON.parse(JSON.stringify(product.check))
      let del = []

      arr.filter(cek=>{
        return check.indexOf(cek.id) !== -1
      })
      .map(total=>{
        del.push(total.id)
      })
      let total = del.toString()
      console.log(total);
      swal.fire({
        title: 'Apakah yakin ingin menghapus dari keranjang?',
        showCancelButton: true,
        confirmButtonText: 'yakin',
        denyButtonText: `cancel`,
      }).then((result) => {
        /* Read more about isConfirmed */
        if (result.isConfirmed) {
          isLoading.value = true;
          store.dispatch('cart/deleteSelected',{
            id: total
          })
          .then(()=>{
            store.dispatch('cart/cart')
            product.check = []
            store.dispatch('cart/totalCart')
            .then(()=>{
              isLoading.value = false;
            })
            swal.fire(`${del.length} barang berhasil dihapus!`, '', 'success')
          })
        }
      })
    }

    const carts = computed(()=>{
      product.prod = JSON.parse(JSON.stringify(store.state.cart.cart))
      return store.state.cart
    })

    const total = computed(()=>{
      let arr = JSON.parse(JSON.stringify(product.prod))
      let check = JSON.parse(JSON.stringify(product.check))
      let sum = 0
      arr.filter(cek=>{
        return check.indexOf(cek.id) !== -1
      })
      .map(total=>{
        sum = parseInt(sum) + parseInt(total.pivot.qty)
      })
      return sum
    })

    const data = computed(()=>{
      let arr = JSON.parse(JSON.stringify(store.getters['cart/qty']))
      let check = JSON.parse(JSON.stringify(product.check))
      let sum = 0

      arr.filter(cek=>{
        return check.indexOf(cek.id) !== -1
      })
      .map(harga=>{
        let grand_total = harga.price
        if (harga.price_discount) {
          grand_total = harga.price_discount
        }
        sum = sum + (grand_total * harga.pivot.qty)
      })
      return sum
    })

    const cek = computed(()=>{
      return store.state.cart.total
    })

    function move() {
      store.dispatch('product/resetState')
    }

    function deleteCart(id) {
      swal.fire({
        title: 'Apakah yakin ingin menghapus dari keranjang?',
        showCancelButton: true,
        confirmButtonText: 'yakin',
        denyButtonText: `cancel`,
      }).then((result) => {
        /* Read more about isConfirmed */
        if (result.isConfirmed) {
          isLoading.value = true;
          store.dispatch('cart/deleteCart',id)
          .then(()=>{
            store.dispatch('cart/cart')
            store.dispatch('cart/totalCart')
            isLoading.value = false;
            swal.fire('Satu barang berhasil dihapus!', '', 'success')
          })
        }
      })
    }

    function addQty(data) {
      isLoading.value = true;
      store.dispatch('cart/addQty',data)
      .then(()=>{
        store.dispatch('cart/cart')
        store.dispatch('cart/totalCart')
        .then(()=>{
          isLoading.value = false;
        })
      })
    }
    
    function subtQty(data) {
      isLoading.value = true;
      store.dispatch('cart/subtQty',data)
      .then(()=>{
        store.dispatch('cart/cart')
        store.dispatch('cart/totalCart')
        .then(()=>{
          isLoading.value = false;
        })
      })
    }

    return {
      carts,
      total,
      data,
      move,
      deleteCart,
      addQty,
      subtQty,
      product,
      selectAll,
      updateCheckall,
      cek,
      deleteCheckProduck,
      shipment,
      isLoading,
      fullPage,
      dots
    }
  },
}
</script>

<style scoped>
.product{
  width: 5rem;
  height: 5rem;
  padding: 5px;
}

button:disabled {
  cursor: not-allowed;
  pointer-events: all !important;
}

.qty{
  cursor: pointer;
}

.text-empty{
  display: block;
  position: relative;
  font-weight: 800;
  font-family: "Nunito Sans", -apple-system, sans-serif;
  font-size: 1.71429rem;
  line-height: 30px;
  color: var(--color-text-high,rgba(49,53,59,0.96));
  text-decoration: initial;
  margin: 0px;
}

.sub-empty{
  display: block;
  position: relative;
  font-weight: 400;
  font-size: 1rem;
  line-height: 20px;
  color: var(--color-text-low,rgba(49,53,59,0.68));
  text-decoration: initial;
  margin: 8px 0px 16px;
}

.empty{
  display: block;
  max-width: 200px;
  margin: auto auto;
}

.trun{
  max-width: 11.5rem;
}

.txt{
  padding-top: 1.9em;
}

.img{
  width: 4rem;
}
@media (min-width: 768px) {
  .trun{
    max-width: 200px;
  }

  .posisi{
    position: sticky !important;
    position: -webkit-sticky !important;
    top: 130px !important; /* required */
  }

  .empty{
    display: block;
    max-width: 400px;
    margin: auto auto;
  }
  .img{
    width: 5rem;
  }
}
@media (min-width: 992px) { 
  .img{
    width: 15%;
  }

  .trun{
    max-width: 200px;
  }
}
</style>