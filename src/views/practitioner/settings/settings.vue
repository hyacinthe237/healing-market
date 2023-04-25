<template lang="html">
  <div class="">
    <Navbar></Navbar>
    <div class="practitioner-dashboard" v-show="!isLoading">
      
      <Practitioner-SideBar></Practitioner-SideBar>
      <div class="droite">
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
          <form class="_form mt-20">
            <h4 class="nowrap">Personnal Information</h4>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group mt-20">
                  <label for="firstname">First Name</label>
                  <input type="text" name="first_name" v-model="ghost.first_name" placeholder="First Name" class="form-control">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group mt-20">
                  <label for="lastname">Last Name</label>
                  <input type="text" name="last_name" v-model="ghost.last_name" placeholder="Last Name" class="form-control">
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group mt-20">
                  <label for="birth_date">Date of birth</label>
                  <input type="date" name="birthdate" v-model="ghost.birthdate" placeholder="dd/mm/yyyy" class="form-control">
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
                  <label for="email">Email</label>
                  <input type="text" name="email" v-model="ghost.email" placeholder="your@email.com" class="form-control">
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group mt-20">
                  <label for="zip_code">Zip Code</label>
                  <input type="text" name="zip_code" v-model="ghost.zip_code" placeholder="Zip Code" class="form-control">
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group mt-20">
                  <label for="address">Address</label>
                  <input type="text" name="address" v-model="ghost.address" placeholder="Address" class="form-control">
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group mt-20">
                  <label for="state">State</label>
                  <input type="text" name="state" v-model="ghost.state" placeholder="State" class="form-control">
                </div>
              </div>

              <div class="col-sm-3">
                <div class="form-group mt-20">
                  <label for="location">Location</label>
                  <input type="text" name="location" v-model="ghost.location" placeholder="Location" class="form-control">
                </div>
              </div>

              <div class="col-sm-3">
                <div class="form-group mt-20">
                  <label for="region">Region</label>
                  <input type="text" name="region" v-model="ghost.region" placeholder="Region" class="form-control">
                </div>
              </div>

              <div class="col-sm-3">
                <div class="form-group mt-20">
                  <label for="city">City</label>
                  <input type="text" name="city" v-model="ghost.city" placeholder="City" class="form-control">
                </div>
              </div>

              <div class="col-sm-3">
                <div class="form-group mt-20">
                  <label for="social_security">Social security</label>
                  <input type="text" name="social_security" v-model="ghost.social_security" placeholder="Social security" class="form-control">
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group mt-20">
                  <label for="facebook">Facebook</label>
                  <input type="text" name="facebook" v-model="ghost.facebook" placeholder="Facebook" class="form-control">
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group mt-20">
                  <label for="instagram">Instagram</label>
                  <input type="text" name="instagram" v-model="ghost.instagram" placeholder="Instagram" class="form-control">
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group mt-20">
                  <label for="website">Website</label>
                  <input type="text" name="website" v-model="ghost.website" placeholder="Website" class="form-control">
                </div>
              </div>

              <div class="col-sm-12">
                <div class="form-group mt-20">
                  <label for="tags">Tags</label>
                  <input-tag v-model="ghost.tags" placeholder="Add a tag" class="form-control"></input-tag>
                </div>
              </div>

              <div class="col-sm-12">
                <div class="form-group mt-20">
                  <label for="language">Language</label>
                  <input-tag v-model="ghost.language" placeholder="Add a tag" class="form-control"></input-tag>
                </div>
              </div>

              <div class="col-sm-12">
                <div class="form-group mt-20">
                  <label for="description">Description</label>
                  <textarea name="description" id="description" cols="10" rows="5" v-model="ghost.description" placeholder="Description" class="form-control"></textarea>
                </div>
              </div>

              <!-- <div class="col-sm-6">
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
              </div> -->

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

    components: { Navbar, Footer },

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
      this.getUser()
    },

    methods: { 
      async getUser () {
        this.startLoading()

        const res = await this.$api.get(`/user-api/therapists/${this.user.therapist_id}/`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('Sorry', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          console.log('data', res.data)
          this.ghost = Object.assign({}, res.data)
        }
      },
    }
}
</script>
