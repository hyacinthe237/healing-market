<template lang="html">
  <div class="">
      <Header v-show="!isLoading"/>
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'team'" />

        <div id="page-content-wrapper">
          <div class="profile-box">
              <div class="profile-form">
                <div class="tle">My profile detail</div>
                <form class="_form text-center mt-20" @submit.prevent>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label for="username">Username</label>
                          <input type="text" name="username" v-model="ghost.username" placeholder="Username" class="form-control">
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label for="email">Email</label>
                          <input type="email" name="email" v-model="ghost.email" placeholder="Email" class="form-control">
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label for="phone">Phone Number</label>
                          <input type="text" name="phone" v-model="ghost.phone" placeholder="Username" class="form-control">
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label for="first_name">First name</label>
                          <input type="text" name="first_name" v-model="ghost.first_name" placeholder="First name" class="form-control">
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label for="last_name">Last name</label>
                          <input type="text" name="last_name" v-model="ghost.last_name" placeholder="Last name" class="form-control">
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bttn mt-20 pointer" @click="save()">
                      <div class="text">Save</div>
                      <div class="icon"><i class="feather icon-save"></i></div>
                  </div>
                </form>
              </div>

              <div class="profile-form mt-60">
                <div class="tle">Modify my password</div>
                <form class="_form text-center mt-20" @submit.prevent>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label for="password">Old Password</label>
                          <input type="password" name="password" v-model="phost.password" placeholder="********" class="form-control">
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label for="new_password">New Password</label>
                          <input type="password" name="new_password" v-model="phost.new_password" placeholder="********" class="form-control">
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label for="confirm_password">Confirm password</label>
                          <input type="password" name="confirm_password" v-model="phost.confirm_password" placeholder="********" class="form-control">
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bttn mt-20 pointer" @click="editPassword()">
                      <div class="text">Save new password</div>
                      <div class="icon"><i class="feather icon-edit-2"></i></div>
                  </div>
                </form>
              </div>
          </div>
        </div>
    </div>
    <div class="_loader" v-show="isLoading">
      <Spinners></Spinners>
    </div>
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'
import config from '../../services/config'

export default {
    data: () => ({
        phost: { password: '', confirm_password: '', new_password: '' },
        showFilter: false
    }),

    components: { Header, Sidebar },

    computed: {
       user () {
          return JSON.parse(localStorage.getItem(config.get('user')))
       },
    },

    watch: { },

    mounted () {
      this.getUser()
    },

    methods: {
      async getUser () {
          this.startLoading()

          const response = await this.$api.get(`user-api/users/${this.user.id}/`)
          .catch(error => {
              this.stopLoading()
              this.$swal.error(this.$translate.text('Error'), this.$translate.text(error.response.data.errors))
          })

          if (response) {
              this.stopLoading()
              // this.$store.commit('users/SET_USER', response.data)
              console.log('profile', response.data)
              this.ghost = Object.assign({}, response.data)
          }
        },
    }
}
</script>
