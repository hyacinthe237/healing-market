<template lang="html">
  <div class="">
    <Navbar></Navbar>
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'settings'" />

        <div id="page-content-wrapper">
            <div class="dashboard">
                <div class="_title">
                    <div class="text">
                      <h4>Account Information</h4>
                      <p>Update your account information</p>
                    </div>
                    <div class="btn-actions">
                      <button class="btn btn-outline-secondary pointer">
                        <i class="feather icon-edit"></i> Edit
                      </button>
                    </div>
                </div>
                <form class="_form mt-20">
                  <h4 class="nowrap">Personnal Information</h4>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group mt-20">
                        <label for="firstname">First Name</label>
                        <input type="text" name="firstname" v-model="ghost.firstname" placeholder="First Name" class="form-control">
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group mt-20">
                        <label for="lastname">Last Name</label>
                        <input type="text" name="lastname" v-model="ghost.lastname" placeholder="Last Name" class="form-control">
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
                      <button type="submit" class="btn btn-secondary mt-20">Update</button>
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
        members: [],
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

    mounted () {},

    methods: { 
      async getDoashboard () {
        this.startLoading()

        const res = await this.$api.get(`/schedule-api/dashboard-event`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('Sorry', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          console.log('members', res.data)
        }
      },

      async getMembers () {
        this.startLoading()

        const res = await this.$api.get(`/user-api/manager-team-member`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('get members error', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          this.members = res.data.message.teamates.filter(m => m.id!== this.user.id)
        }
      },

      async getEmployeeDoashboard () {
        this.startLoading()

        const res = await this.$api.get(`/user-api/users/${this.user.id}/`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('Sorry', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          this.payload = Object.assign({}, res.data)
          this.shifts = res.data.shifts.slice(0,2)
        }
      },
    }
}
</script>
