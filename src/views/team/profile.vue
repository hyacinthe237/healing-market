<template lang="html">
  <div class="">
      <Header v-show="!isLoading"/>
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'team'" />

        <div id="page-content-wrapper">
          <div class="profile-box">
              <div class="profile-form">
                <div class="tle">My profile detail</div>
                  <div class="content-profile-photo pointer mt-10">
                    <input type="file" name='image' id="fileElem" accept="image/*" style="display:none" @change="handleFile">
                    <div class="photo" id="fileSelect">
                        <i class="feather icon-camera" v-if="displayIcon"></i>
                        <img class="image" id="image" src="" v-else/>
                    </div>
                    <span v-show="displayIcon" class="mt-10">Add a cover</span>
                  </div>
              </div>
              <div class="profile-form mt-20">
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
                      <div class="text">Save profile</div>
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
import AuthService from '@/services/auth'

export default {
    data: () => ({
        phost: { password: '', confirm_password: '', new_password: '' },
        showFilter: false,
        displayIcon: true,
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
      var fileSelect = document.getElementById("fileSelect"),
        fileElem = document.getElementById("fileElem");

        fileSelect.addEventListener("click", function (e) {
            if (fileElem) {
                fileElem.click();
            }
            e.preventDefault(); // empêche la navigation vers "#"
        }, false);
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
              this.ghost = Object.assign({}, response.data)
              AuthService.setUser(response.data)
          }
      },

      async save () {
          this.startLoading()
          let formData = new FormData()
          formData.append('username', this.ghost.username)
          formData.append('email', this.ghost.email)
          formData.append('phone', this.ghost.phone)
          formData.append('cover', this.ghost.cover)
          formData.append('last_name', this.ghost.last_name)
          formData.append('first_name', this.ghost.first_name)

          const response = await this.$api.put(`user-api/users/${this.user.id}/`, formData)
          .catch(error => {
              this.stopLoading()
              this.$swal.error(this.$translate.text('Error'), this.$translate.text(error.response.data.errors))
          })

          if (response) {
              this.stopLoading()
              this.$swal.error('Confirmation', response.data.message)
              this.getUser()
              
          }
        },

        handleFile (e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;

            var reader = new FileReader()

            reader.onloadend = function () {
                $('.image').attr('src', reader.result)
            }
            reader.readAsDataURL(files[0])
            this.ghost.cover = files[0]
            this.displayIcon = false
        }
    }
}
</script>
