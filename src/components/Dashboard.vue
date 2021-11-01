<template>
  <div class="col-12 col-lg-4 col-xl-4 col-xxl-4">
    <div class="card shadow border-0 rounded">
      <div class="col-lg-auto col-12">
        <div class="rounded-circle text-center mx-auto" style="width:130px">
          <img src="@/assets/images/login.svg" style="width: 130px; height: 130px;" class="rounded-circle">
        </div>
      </div>
      <div class="col-lg-auto col-xl-auto col-xxl-auto col-12">
        <h5 class="fw-bold text-center text-muted text-truncate">Nama Akun</h5>
        <p class="text-center">Email</p>
      </div>
      <div class="col-lg-auto col-xl-auto col-xxl-auto col-12 mb-3">
        <ul class="list-group-item rounded border-0">
          <li class="list-group-item"><router-link :to="{name:'index'}" class="fw-bold text-decoration-none text-muted" href="#"><i class="fas fa-tachometer-alt"></i> &nbsp;Dashboard</router-link></li>
          <li class="list-group-item"><router-link to="/dashboard/profile" class="fw-bold text-decoration-none text-muted" href="#"><i class="fas fa-user"></i> &nbsp;Profile</router-link></li>
          <li class="list-group-item"><router-link to="/dashboard/cart" class="fw-bold text-decoration-none text-muted" href="#"><i class="fas fa-shopping-cart"></i> &nbsp;Keranjang</router-link></li>
          <li class="list-group-item"><a class="fw-bold text-decoration-none text-muted" href="#"><i class="fas fa-shopping-bag"></i> &nbsp;Pembelian</a></li>
          <li class="list-group-item"><a class="fw-bold text-decoration-none text-muted" href="#"><i class="fas fa-sign-out-alt"></i> &nbsp;Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>