<template lang="html">
  <div class="">
      <Header v-show="!isLoading" />
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'timesheets'" />

        <div id="page-content-wrapper">
          <div class="timesheets">
            <div class="header-box">
              <div class="title">
                <select>
                  <option>Last 7 days: Fri Oct 28 - Fri Nov 4</option>
                </select>
                <div class="lg-btns">
                  <div class="lg-btn-outline">View Totals</div>
                </div>
              </div>
              <div class="reste">
                <div class="btns">
                  <div class="action"><i class="ion-ios-print"></i></div>
                  <div class="action"><i class="ion-md-cloud-download"></i></div>
                </div>
              </div>
              <div class="filter" @click="displayFilter()"><i class="feather icon-more-vertical"></i></div>
            </div>

            <div class="filter-box" v-if="showFilter">
              <div class="reste">
                <div class="lg-btns">
                  <div class="lg-btn-outline">View Totals</div>
                  <div class="lg-btn-outline"><i class="ion-ios-print"></i></div>
                  <div class="lg-btn-primary">Download</div>
                </div>
              </div>
            </div>

            <!-- List Box code -->
            <div class="grey-box">
              <div class="grey-head pointer" @click="displayFilterGrey()">
                <i class="feather icon-chevron-up" v-show="showFilterGrey"></i>
                <i class="feather icon-chevron-down" v-show="!showFilterGrey"></i>
                Filter Timesheets
              </div>

              <div class="inputs" v-if="showFilterGrey">
                <div class="input">
                  <div class="label">Filter By</div>
                  <select>
                    <option>All employees</option>
                  </select>
                </div>
                <div class="input">
                  <div class="label">Sort Employees By</div>
                  <select>
                    <option>First Name</option>
                  </select>
                </div>
                <div class="input">
                  <div class="label">Group By</div>
                  <select>
                    <option>Employee</option>
                  </select>
                </div>
                <div class="input">
                  <div class="label">Show/Hide Columns</div>
                  <select>
                    <option>12/22 Column</option>
                  </select>
                </div>
                <div class="input-line">
                  <input type="checkbox" checked>
                  <h4>Hide Employees Without Hours</h4>
                </div>
              </div>
            </div>
          </div>

          <div class="_table">
            <table>
              <thead>
                <tr>
                  <th>Date<i class="feather icon-chevron-down"></i></th>
                  <th class="no-column">Role<i class="feather icon-chevron-down"></i></th>
                  <th class="no-column">Wage<i class="feather icon-chevron-down"></i></th>
                  <th class="no-column">Time Card<i class="feather icon-chevron-down"></i></th>
                  <th class="no-column">Issues<i class="feather icon-chevron-down"></i></th>
                  <th class="no-column">Scheduled<i class="feather icon-chevron-down"></i></th>
                  <th class="no-column">Actual vs. Scheduled<i class="feather icon-chevron-down"></i></th>
                  <th>Total Paid <i class="feather icon-chevron-down"></i></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td class="no-column"></td>
                  <td class="no-column"></td>
                  <td class="no-column"></td>
                  <td class="no-column"></td>
                  <td class="no-column"></td>
                  <td class="no-column"></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div class="add pointer" @click="addTeamModal()"><i class="feather icon-plus-circle"></i> Add an Employee</div>
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

    <AddCardTimeModal 
      @timeAdded="getMembers" 
      :sites="sites"
      :members="members"
    ></AddCardTimeModal>
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'
import moment from 'moment'
import AddTeamMember from '../team/modals/add.vue'
import AddCardTimeModal from './modals/add.vue'

import config from '../../services/config'

export default {
    data: () => ({
        payload: {},
        showFilter: false,
        showFilterGrey: false,
        members: [],
        sites: [],
    }),

    components: { Header, Sidebar, AddTeamMember, AddCardTimeModal },

    computed: {
      last_seven_day () {
        let today = moment().format('ddd MMM d')
        let lastdat = moment().subtract(7, 'days').format('ddd MMM d')

        return `${lastdat} - ${today}`
      },

      user () { return JSON.parse(localStorage.getItem(config.get('user'))) },
    },

    watch: { },

    mounted () {
      this.getJobSites()
      this.getMembers()
    },

    methods: {
      displayFilter () { this.showFilter = !this.showFilter },
      displayFilterGrey () { this.showFilterGrey = !this.showFilterGrey },

      addTeamModal () {
        this.openModal({ id: 'addUserModal' })
      },

      addCardTimeModal () {
        window.eventBus.$emit('addcard', 'time')
        this.openModal({ id: 'addCardTimeModal' })
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
          console.log('members', res.data.message.teamates)
          this.members = res.data.message.teamates.filter(m => m.id!== this.user.id)
        }
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
    }
}
</script>
