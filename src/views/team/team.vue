<template lang="html">
  <div class="">
    <Header v-show="!isLoading" />
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'team'" />

        <div id="page-content-wrapper">
          <div class="team">
            <div class="header-box">
              <div class="title">
                <span>Team ({{ members.length }})</span>
                <div class="_show">
                  <label><input type="checkbox"> Show Terminated</label>
                </div>
              </div>
              <div class="reste">
                <input type="text" placeholder="Enter name">
                <select name="date">
                  <option>Select...</option>
                </select>
                <select name="date">
                  <option>By Access Level</option>
                </select>
                <select name="status" v-model="status">
                  <option value="">By Status</option>
                  <option value="activated">Activated</option>
                  <option value="pending">Pending</option>
                </select>
                <div class="btns">
                  <div class="action"><i class="ion-ios-print"></i></div>
                  <div class="action" @click="downloadMembers()"><i class="ion-md-cloud-download"></i></div>
                </div>

                <div class="lg-btns">
                  <div class="lg-btn-outline" @click="openBulkActionsModal()">Bulk Action</div>
                  <div class="lg-btn-primary" @click="addTeamModal()">Add Team Member</div>
                </div>
              </div>
              <div class="filter" @click="displayFilter()"><i class="feather icon-more-vertical"></i></div>
            </div>

            <div class="filter-box" v-if="showFilter">
              <div class="reste">
                <input type="text" placeholder="Enter name">
                <select name="job_site">
                  <option value="">Select...</option>
                </select>
                <select name="access">
                  <option value="">By Access Level</option>
                </select>
                <select name="status" v-model="status">
                  <option value="">By Status</option>
                  <option value="activated">Activated</option>
                  <option value="pending">Pending</option>
                </select>
                <div class="btns">
                  <div class="action"><i class="ion-ios-print"></i></div>
                  <div class="action" @click="downloadMembers()"><i class="ion-md-cloud-download"></i></div>
                  <div class="lg-btns">
                    <div class="lg-btn-outline" @click="openBulkActionsModal()">Bulk Action</div>
                    <div class="lg-btn-primary" @click="addTeamModal()"><i class="feather icon-plus"></i></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- List Box code -->
            <div class="list-box">
              <table class="table">
                  <thead>
                      <tr>
                          <th class="w30">Name</th>
                          <th class="w20">Email</th>
                          <th class="w20">Phone</th>
                          <th class="w20">Position</th>
                          <th class="w20">Wage</th>
                          <th class="w20">Status</th>
                          <th class="w10"></th>
                      </tr>
                  </thead>

                  <tbody>
                      <tr v-for="m in members" :key="m.id">
                          <td class="w30">
                            <div class="name">
                              <div class="avatar">{{ displayLetter(m) }}</div>
                              {{ displayName(m) }}
                            </div>
                          </td>
                          <td class="w20">
                            <div class="position">{{ m.email }}</div>
                          </td>
                          <td class="w20">
                            <div class="status">{{ m.phone }}</div>
                          </td>
                          <td class="w20">
                            <div class="availability">{{ displayPosition(m) }}</div>
                          </td>
                          <td class="w20">
                            <div class="position">${{ m.wage }}</div>
                          </td>
                          <td class="w20">
                            <div class="availability">{{ m.status }}</div>
                          </td>
                          <td class="w10">
                            <div class="actions pointer">
                              <div class="icons">
                                <i class="feather icon-edit-2" @click="editTeamModal(m)"></i>
                                <i class="feather icon-more-vertical"></i>
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
    <div class="_loader" v-show="isLoading">
      <Spinners></Spinners>
    </div>
    <AddTeamMember 
      @memberAdded="getMembers" 
      :sites="sites"
    ></AddTeamMember>
    <EditTeamMember 
      @memberModified="getMembers" 
      :member="selectedMember"
      :sites="sites"
    ></EditTeamMember>
    <BulkActionsModal></BulkActionsModal>
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'
import config from '../../services/config'
import AddTeamMember from './modals/add.vue'
import EditTeamMember from './modals/edit.vue'
import BulkActionsModal from './modals/bulk-actions.vue'
import Swal from 'sweetalert2'

export default {
    data: () => ({
        payload: {},
        selectedMember: {},
        showFilter: false,
        members: [],
        sites: [],
        status: ''
    }),

    components: { Header, Sidebar, AddTeamMember, EditTeamMember, BulkActionsModal },

    computed: {
      user () { return JSON.parse(localStorage.getItem(config.get('user'))) },
    },

    watch: {
      'status': function (val) {
        if (val !== '') {
          this.members = this.members.filter(m => m.status == val)
        }

        if (val == '') {
          this.members = this.members
        }
      },
    },

    mounted () { 
      this.getMembers()
      this.getJobSites()
    },

    methods: {
      displayFilter () {
        this.showFilter = !this.showFilter
      },

      addTeamModal () {
        this.openModal({ id: 'addUserModal' })
      },

      openBulkActionsModal () {
        this.openModal({ id: 'bulkActionsModal' })
      },

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

      editTeamModal (member) {
        this.selectedMember = {
          id: member.id,
          sex: member.sex,
          email: member.email,
          first_name: member.first_name,
          last_name: member.last_name,
          birthday: member.birthday,
          phone: member.phone,
          wage: member.wage,
          is_employee: member.is_employee,
          is_manager: member.is_manager,
        }

        this.openModal({ id: 'editUserModal' })
      },

      displayLetter (member) {
        let str = ''
        if ((member.last_name !== '') && (member.first_name !== '')) str = member.last_name[0] + member.first_name[0]
        else str = member.username[0]
        return str
      },

      displayName (member) {
        let str = ''
        if ((member.last_name !== '') && (member.first_name !== '')) str = member.last_name + ' ' + member.first_name
        else str = member.username
        return str
      },

      displayPosition (member) {
        let position = ''
        if (member.is_employee) position = 'Employee'
        if (member.is_manager) position = 'Manager'
        return position
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

      async downloadMembers () {
        this.startLoading()

        const res = await this.$api.get(`/user-api/download-team-member`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('get members error', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          this.download(res.data)
        }
      },

      download (data) {
      
          // Creating a Blob for having a csv file format
          // and passing the data with type
          const blob = new Blob([data], { type: 'text/csv' });

          // Creating an object for downloading url
          const url = window.URL.createObjectURL(blob)

          // Creating an anchor(a) tag of HTML
          const a = document.createElement('a')

          // Passing the blob downloading url
          a.setAttribute('href', url)

          // Setting the anchor tag attribute for downloading
          // and passing the download file name
          a.setAttribute('download', 'list_of_member.csv');

          // Performing a download with click
          a.click()
      },

      async deleteTeamMember (site) {
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

      confirmDelete (member) {
        Swal.fire({
              text: this.$translate.text("Are you sure you want to delete the selected team member ?"),
              type: 'warning',
              showCancelButton: true,
              cancelButtonText: this.$translate.text('Cancel'),
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: this.$translate.text('Yes, delete!')
        }).then((result) => {
              if (result.value) {
                  this.deleteTeamMember(member)
              }
        })
      },
    }
}
</script>
