<template lang="html">
  <div class="">
    <Header v-show="!isLoading" />
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'jobsites'" />

        <div id="page-content-wrapper">
          <div class="contiainer">
            <div class="row">
              <div class="col-sm-4">
                <form class="_form mt-20 padding" @submit.prevent>
                  <div class="reset" @click="resetGhost()"><i class="feather icon-repeat"></i></div>
                  <h3>{{ type_name }} a job site</h3>
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" v-model="ghost.name" placeholder="Name" class="form-control">
                  </div>

                  <div class="form-group mt-20">
                    <label for="color_code">Color code</label>
                    <input type="text" name="color_code" v-model="ghost.color_code" placeholder="#890000" class="form-control">
                  </div>
                  
                  <div class="save-button mt-20 pointer" @click="editJobSite()" v-if="isEdit">
                      <div class="text">Edit a job site</div>
                      <div class="icon"><i class="feather icon-save"></i></div>
                  </div>

                  <div class="save-button mt-20 pointer" @click="addJobSite()" v-else>
                      <div class="text">Add a job site</div>
                      <div class="icon"><i class="feather icon-save"></i></div>
                  </div>
                </form>
              </div>
              <div class="col-sm-8">
                <div class="team">
                  <!-- List Box code -->
                  <div class="list-box">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="w30">Name</th>
                                <th class="w20">Color code</th>
                                <th class="w10"></th>
                            </tr>
                        </thead>
      
                        <tbody>
                            <tr v-for="s in sites" :key="s.id">
                                <td class="w30">
                                  <div class="name">
                                    {{ s.name }}
                                  </div>
                                </td>
                                <td class="w20 no-column">
                                  <div class="position">{{ s.color_code }}</div>
                                </td>
                                <td class="w10">
                                  <div class="actions pointer">
                                    <div class="icons">
                                      <i class="feather icon-edit-2" @click="edit(s)"></i>
                                      <i class="feather icon-more-vertical" ></i>
                                    </div>
                                  </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
import Swal from 'sweetalert2'

export default {
    data: () => ({
        payload: {},
        selectedMember: {},
        isEdit: false,
        sites: [],
    }),

    components: { Header, Sidebar },

    computed: {
      user () { return JSON.parse(localStorage.getItem(config.get('user'))) },
      type_name () { return this.isEdit ? 'Edit' : 'Add' },
    },

    watch: { },

    mounted () { 
      this.getJobSites()
      this.resetGhost()
    },

    methods: {
      async getJobSites () {
        this.startLoading()

        const res = await this.$api.get(`/timesheet-api/job-sites/`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('get job site error', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          this.sites = res.data.results
        }
      },

      async addJobSite () {
        this.startLoading()
        this.ghost.business = this.user.business[0].business_id

        const res = await this.$api.post(`/timesheet-api/job-sites/`, this.ghost)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('Sorry', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          this.getJobSites()
          this.resetGhost()
          this.$swal.success('Confirmation', "New job site added successfuly !")
        }
      },

      async editJobSite () {
        this.startLoading()
        
        const editObject = {
          name: this.ghost.name,
          color_code: this.ghost.color_code,
          business: this.ghost.business.id
        }

        const res = await this.$api.put(`/timesheet-api/job-sites/${this.ghost.id}/`, editObject)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('Sorry', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          this.getJobSites()
          this.resetGhost()
          this.$swal.success('Confirmation', "Edit job site successfuly !")
        }
      },

      async deleteJobSite (site) {
        this.startLoading()

        const res = await this.$api.delete(`/timesheet-api/job-sites/${site.id}`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('Sorry', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          this.getJobSites()
          this.$swal.success('Confirmation', "Job site are deleted successfuly!")
        }
      },

      confirmDelete (site) {
        Swal.fire({
              text: this.$translate.text("Are you sure you want to delete the selected job site ?"),
              type: 'warning',
              showCancelButton: true,
              cancelButtonText: this.$translate.text('Cancel'),
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: this.$translate.text('Yes, delete!')
        }).then((result) => {
              if (result.value) {
                  this.deleteJobSite(site)
              }
        })
      },

      edit (site) {
        this.isEdit = true
        this.ghost = Object.assign({}, site)
      },

      resetGhost () {
        this.ghost = { name: '', color_code: '', business: '' }
      },
    }
}
</script>
