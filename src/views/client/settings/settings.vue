<template lang="html">
  <div class="">
    <Navbar></Navbar>
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'settings'" />

        <div id="page-content-wrapper">
            <div class="dashboard">
                <!-- <div class="_title">
                    <div class="text">
                      <h4>Account Information</h4>
                      <p>Update your account information</p>
                    </div>
                    <div class="btn-actions">
                      <button class="btn btn-outline-secondary pointer">
                        <i class="feather icon-edit"></i> Edit
                      </button>
                    </div>
                </div> -->
                <form class="_form mt-20" @submit.prevent>
                  <h4 class="nowrap">Personnal Information</h4>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group mt-20">
                        <label for="firstname">First Name</label>
                        <input type="text" name="firstname" v-model="ghost.first_name" placeholder="First Name" class="form-control">
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group mt-20">
                        <label for="lastname">Last Name</label>
                        <input type="text" name="lastname" v-model="ghost.last_name" placeholder="Last Name" class="form-control">
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="form-group mt-20">
                        <label for="birth_date">Date of birth</label>
                        <input type="date" name="birth_date" v-model="ghost.birth_date" placeholder="dd/mm/yyyy" class="form-control">
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="form-group mt-20">
                        <label for="phone">Mobile Phone</label>
                        <input type="number" name="phone" v-model="ghost.phone" placeholder="Mobile Phone" class="form-control">
                      </div>
                    </div>

                    <div class="col-sm-12">
                      <div class="form-group mt-20">
                        <!-- <label for="phone">Mobile Phone</label> -->
                        <input type="text" name="email" v-model="ghost.email" placeholder="your@email.com" class="form-control">
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <button type="submit" class="btn btn-secondary mt-20" @click="saveProfile()">Update</button>
                    </div>
                  </div>
                </form>

                <form class="_form mt-40" @submit.prevent>
                  <h4 class="nowrap">Modify password</h4>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group mt-20">
                        <label for="password">New Password</label>
                        <input type="password" name="password" v-model="ghost.password" placeholder="******" class="form-control">
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="form-group mt-20">
                        <label for="password">Confirm Password</label>
                        <input type="password" name="confirm_password" v-model="ghost.confirm_password" placeholder="******" class="form-control">
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <button type="submit" class="btn btn-secondary mt-20">Modify</button>
                    </div>
                  </div>
                </form>
            </div>
        </div>
    </div>
    <div class="_loader" v-show="isLoading">
      <Spinners></Spinners>
    </div>

    <Footer :isConnected="isConnected"></Footer>
  </div>
</template>

<script>
import Sidebar from '@/components/commons/sidebar/sidebar'
import Navbar from '@/components/commons/frontend/header/nav'
import Footer from '@/components/commons/frontend/footer/footer'
import config from '@/services/config'
import _ from 'lodash'

export default {
    data: () => ({
        payload: {},
        shifts: [],
        ghost: {}
    }),

    components: { Navbar, Sidebar, Footer },

    computed: {
       user () {
          return JSON.parse(localStorage.getItem(config.get('user')))
       },

       isConnected () {
            return !_.isEmpty(this.user)
        }
    },
    
    watch: { },

    mounted () {
      this.getSetting()
    },

    methods: { 
      async saveProfile () {
        this.startLoading()

        const res = await this.$api.put(`/user-api/clients/${this.user.id}/`, this.ghost)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('Sorry', error.response.data.error.message)
        })

        if (res) {
          this.stopLoading()
          this.$swal.success('Personnal information', 'modify as well')
          this.ghost = res.data.properties
        }
      },

      async getSetting () {
        this.startLoading()

        const res = await this.$api.get(`/user-api/clients/${this.user.id}/`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('Sorry', error.response.data.error.message)
        })

        if (res) {
          this.stopLoading()
          this.ghost = res.data
        }
      },
    }
}
</script>
