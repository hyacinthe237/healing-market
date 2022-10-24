<template lang="html">
  <nav class="navbar navbar-expand-xl navbar-white bg-white">
    <div class="container">
        <a class="navbar-brand" href="#">
            <img :src="logo" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Product</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact us</a>
                </li>
            </ul>
            <form class="d-flex">
                <button>Sign in</button>
            </form>
        </div>
    </div>
</nav>
</template>

<script>
import logo from '@/assets/img/logo.png'
export default {
  data: () => ({
    logo
  }),
}
</script>
