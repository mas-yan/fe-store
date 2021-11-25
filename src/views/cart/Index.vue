<template>
  <div class="container my-5">
    <div class="row" v-if="carts.cart.length > 0">
      <div class="col-lg-8 col">
        <div class="card" style="border-radius: 16px !important">
          <div class="card-body d-none d-lg-block d-xl-block ps-2 d-xxl-block">
            <h4 class="judul"><i class="fas fa-shopping-bag"></i>&nbsp;Keranjang Saya : </h4>
            <table class="table">
              <tbody>
                <tr>
                  <th colspan="2" class="text-lg-start">Product</th>
                  <th>Harga</th>
                  <th colspan="2">QTY</th>
                </tr>
                <tr v-for="cart in carts.cart" :key="cart.id">
                  <td class="img">
                    <img :src="cart.image" style="background:#f1f5f8" class="rounded product img-fluid">
                  </td>
                  <td>
                    <router-link :to="{name: 'product.show',params:{'slug':cart.slug}}" class="d-inline-block text-truncate fw-bold mb-0 text-decoration-none text-dark pb-0 trun">{{cart.title}}</router-link>
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
                    <a href="#"><i class="fas fa-minus-circle"></i></a> <span class="fw-bold"> {{cart.pivot.qty}} </span> <a href="#"><i class="fas fa-plus-circle"></i></a>
                    </div>
                  </td>
                  <td class="txt">
                    <a class="text-danger" href="#"><i class="fas fa-trash"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-body d-block d-lg-none d-xl-none ps-2 d-xxl-none">
            <h4 class="judul"><i class="fas fa-shopping-bag"></i>&nbsp;Keranjang Saya : </h4>
            <hr class="mb-0 mt-4">
            <table class="table">
              <tbody>
                <tr v-for="cart in carts.cart" :key="cart.id">
                  <td>
                    <div class="img">
                      <img :src="cart.image" style="background:#f1f5f8" class="rounded product img-fluid">
                    </div>
                  </td>
                  <td>
                    <router-link :to="{name: 'product.show',params:{'slug':cart.slug}}" class="d-inline-block text-truncate fw-bold mb-0 text-decoration-none text-dark pb-0 trun">{{cart.title}}</router-link>
                    <div class="mb-1" v-if="cart.discount">
                      <small class="text-danger"><s>Rp. {{formatPrice(cart.price)}}</s> &nbsp;<span class="alert-danger rounded-pill px-1">{{cart.discount}}%</span></small>
                      <p style="font-weight:600" v-bind="all = cart.price_discount">Rp. {{formatPrice(cart.price_discount)}}</p>
                    </div>
                    <div v-else>
                      <p style="font-weight:600">Rp. {{formatPrice(cart.price)}}</p>
                    </div>
                    <div class="border d-inline rounded p-1 ps-1">
                      <a href="#"><i class="fas fa-minus-circle"></i></a> <span class="fw-bold"> {{cart.pivot.qty}} </span> <a href="#"><i class="fas fa-plus-circle"></i></a>
                    </div> &nbsp; &nbsp;
                    <a class="text-danger" href="#"><i class="fas fa-trash"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col">
        <div class="card shadow border-0 mt-3 mt-md-0" style="border-radius: 16px !important">
            <div class="card-body">
              <h4 class="judul"><i class="fas fa-shopping-bag"></i>&nbsp;Ringkasan Belanja : </h4>
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
                <button class="btn btn-primary btn-style">Checkout</button>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div v-else-if="total > 0 ||carts.cart.length == 0 && total == null">
      <div class="row">
        <div class="col-lg-8 col-12">
          <div class="card shadow border-0 mt-3 mt-md-0" style="border-radius: 16px !important">
            <ContentLoader class="rounded" />
          </div>
        </div>
        <div class="col-lg-4 col-12">
          <div class="card shadow border-0 mt-3 mt-md-0" style="border-radius: 16px !important">
            <ContentLoader class="shadow rounded" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="carts.cart.length == 0 && total == 0">
      <img src="../../assets/images/cart_empty.svg" class="img-fluid empty">
      <p class="text-empty text-center">Yah Keranjangmu Kosong Nih</p>
      <p class="sub-empty text-center">Saya rasa tombol dibawah ini sangatlah penting, Yuk isi keranjang ini dengan barang kesukaanmu!</p>
      <div class="d-flex justify-content-center">
        <router-link :to="{name: 'home'}" class="btn btn-primary btn-lg btn-style text-center">Mulai Belanja</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader,
  },
  setup() {
    const store = useStore()

    onMounted(()=>{
      store.dispatch('cart/cart')
    })

    const carts = computed(()=>{
      return store.state.cart
    })

    const total = computed(()=>{
      return store.state.cart.total
    })

    const data = computed(()=>{
      let arr = JSON.parse(JSON.stringify(store.getters['cart/qty']))
      let sum=0
      arr.map(harga=>{
        let grand_total = harga.price
        if (harga.price_discount) {
          grand_total = harga.price_discount
        }
        sum = sum + (grand_total * harga.pivot.qty)
      })
      return sum
    })

    return {
      carts,
      total,
      data,
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
  width: 100%;
}
@media (min-width: 768px) {

  .trun{
    max-width: 200px;
  }

  .empty{
    display: block;
    max-width: 400px;
    margin: auto auto;
  }
}
@media (min-width: 992px) { 
  .img{
    width: 15%;
  }

  .trun{
    max-width: 230px;
  }
}
</style>