<template lang="html">
  <div class="">
      <Header />
    <div id="wrapper">
        <Sidebar />

        <div id="page-content-wrapper">
            <div class="dashboard">
              <div class="cards">

                <div class="card">
                  <div class="gauche">
                    <div class="number">45</div>
                    <div class="name">Team members</div>
                  </div>
                  <div class="droite"><i class="feather icon-users"></i></div>
                </div>

                <div class="card">
                  <div class="gauche">
                    <div class="number">45</div>
                    <div class="name">Clocked in</div>
                  </div>
                  <div class="droite"><i class="feather icon-user"></i></div>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'
import _ from 'lodash'

export default {
    data: () => ({
        payload: {}
    }),

    components: { Header, Sidebar },

    computed: { },

    watch: { },

    mounted () { },

    methods: { }
}
</script>
