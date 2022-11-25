<template lang="html">
      <section class="_header">
        <div class="dashboard-brand">
          <a href="#"><img :src="logo" alt=""></a>
        </div>
        <div class="_droite">
          <div class="notify"><i class="feather icon-bell"></i></div>
          <div class="avatar"></div>
          <div class="dropdown dropleft">
            <div class="profil-name dropdown-toggle" type="button" id="dropdownProfil" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span>Abanda Hyacinthe</span>
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownProfil">
              <a class="dropdown-item" href="#"><i class="feather icon-user"></i> My profile</a>
              <a class="dropdown-item" href="#"><i class="feather icon-lock"></i> Modify password</a>
              <a class="dropdown-item" href="#" @click="signout()"><i class="feather icon-log-out"></i> Log Out</a>
            </div>
          </div>
        </div>
      </section>
</template>

<script>
import _ from 'lodash'
import logo from '@/assets/img/logo-nogada-foot.png'

export default {
    props: {
        root: {
            type: Object,
            default: () => {}
        }
    },

    data: () => ({
        role: 1,
        sizecss: 0,
        logo
    }),

    computed: {
        user () {
           return this.$store.state.users.user
        }
    },

    mounted () {

    },

    methods: {
        signout () {
            this.$auth.logout()
        }
    }
}
</script>
