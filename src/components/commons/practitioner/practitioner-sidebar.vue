<template lang="html">
    <div class="gauche">
        <div class="card">
            <div class="profil">
                <img :src="profil" alt="" style="width:75px; height:75px; border-radius:75px;margin-right:10px;">
                <div class="available">
                    Availability <i class="feather icon-toggle-right"></i>
                </div>
            </div>
            <div class="card-head mt-20">
                <h5 class="nowrap">Hyacinthe ABANDA</h5>
                <a href="" class="secondary pointer nowrap"><i class="feather icon-edit-2"></i></a>
            </div>

            <div class="mt-20">
                <button class="btn btn-outline-secondary btn-block">Edit profile</button>
            </div>

            <div class="mt-20">
                <div class="location">
                    <div class="icon nowrap">
                        <i class="feather icon-map-pin"></i> Oakalnd, CA
                    </div>
                </div>
                <div class="location">
                    <div class="icon nowrap">
                        <i class="feather icon-user-check"></i> Member since 
                    </div>
                    <span class="nowrap">May 2023</span></div>
            </div>

            <div class="mt-20">
                <button class="btn btn-secondary btn-block">Manage calendar</button>
            </div>

        </div>

        <div class="card">
            <div class="card-head">
                <h5 class="nowrap">Profile description</h5>
                <a href="" class="secondary pointer nowrap"><i class="feather icon-edit-2"></i></a>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

            <div class="card-head mt-10">
                <h5 class="nowrap">Language</h5>
                <a href="" class="secondary pointer nowrap">Add new</a>
            </div>
            <p>English</p>
        </div>

        <div class="card">
            <div class="card-head">
                <h5 class="nowrap">Specialities</h5>
                <a href="" class="secondary pointer nowrap">Add new</a>
            </div>
            <div class="skills mt-20">
                <div class="skill"><div class="icon"><i class="feather icon-check"></i></div> <span class="nowrap">licensed mariage and family therapist</span></div>
                <div class="skill"><div class="icon"><i class="feather icon-check"></i></div> <span class="nowrap">licensed alcohol drug courselor</span></div>
                <div class="skill"><div class="icon"><i class="feather icon-check"></i></div> <span class="nowrap">access bars&rArr; practitioner</span></div>
                <div class="skill"><div class="icon"><i class="feather icon-check"></i></div> <span class="nowrap">accredited, certified advanced EFT practitioner</span></div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import config from '@/services/config'
  import _ from 'lodash'
  import profil from '@/assets/img/healing/profil-homme.png'
  
  export default {
    name: 'PractitionerSideBar',
      data: () => ({
          payload: {},
          shifts: [],
          members: [],
          profil
      }),
  
      components: {  },
  
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
      }
  }
  </script>
  