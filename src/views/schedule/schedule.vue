<template lang="html">
  <div class="">
      <Header v-show="!isLoading" />
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'schedule'" />

        <div id="page-content-wrapper">
            <div class="schedule">
              <div class="header-box">
                <div class="actions-gauche">
                  <div class="gauche"><i class="ion-ios-skip-backward"></i></div>
                  <div class="droite"><i class="ion-ios-skip-forward"></i></div>
                  <div class="date">{{ date }}</div>
                </div>
                <div class="select">
                  <select name="date">
                    <option>Week</option>
                  </select>
                  <select name="date">
                    <option>Employee view</option>
                  </select>
                </div>
                <div class="schedule-spacer"></div>
                <div class="btns">
                  <!-- <div class="action"><i class="ion-ios-settings"></i></div>
                  <div class="action"><i class="ion-ios-print"></i></div> -->
                  <div class="action"><i class="ion-md-cloud-download"></i></div>
                </div>
                <div class="filter" @click="displayFilter()"><i class="feather icon-filter"></i></div>
              </div>

              <div class="filter-box" v-if="showFilter">
                <div class="actions-haut">
                  <div class="gauche"><i class="ion-ios-skip-backward"></i></div>
                  <div class="date">{{ date }}</div>
                  <div class="droite"><i class="ion-ios-skip-forward"></i></div>
                </div>
                <div class="select">
                  <select name="date">
                    <option>Week</option>
                  </select>
                  <select name="date">
                    <option>Employee view</option>
                  </select>
                </div>
                <div class="schedule-spacer"></div>
                <div class="btns">
                  <!-- <div class="action"><i class="ion-ios-settings"></i></div>
                  <div class="action"><i class="ion-ios-print"></i></div> -->
                  <div class="action"><i class="ion-md-cloud-download"></i></div>
                </div>
              </div>

              <div class="mt-20 _table">
                <table>
                  <thead>
                    <tr>
                      <th class="th-30">All employees ({{ members.length }})</th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">MON</div>
                          <div :class="['day', current_day=='monday'? 'active' : '']">{{ displayDate('monday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">TUE</div>
                          <div :class="['day', current_day=='tuesday'? 'active' : '']">{{ displayDate('tuesday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">WED</div>
                          <div :class="['day', current_day=='wednesday'? 'active' : '']">{{ displayDate('wednesday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">THU</div>
                          <div :class="['day', current_day=='thursday'? 'active' : '']">{{ displayDate('thursday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">FRI</div>
                          <div :class="['day', current_day=='friday'? 'active' : '']">{{ displayDate('friday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">SAT</div>
                          <div :class="['day', current_day=='saturday'? 'active' : '']">{{ displayDate('saturday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">SUN</div>
                          <div :class="['day', current_day=='sunday'? 'active' : '']">{{ displayDate('sunday') }}</div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="th-30"></td>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
                    </tr>
                    <tr class="bg">
                      <td class="th-30">
                        Open Shifts
                        <div class="hour">0.00 Hrs</div>
                      </td>
                      <td class="th-10"><div class="add" @click="selected('Monday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('Tuesday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('Wednesday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('Thursday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('Friday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('Saturday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('Sunday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                    </tr>
                    <tr v-for="m in members" :key="m.id">
                      <td class="th-30">
                        <div class="profile">
                          <i class="feather icon-more-vertical"></i>
                          <div class="avatar">{{ displayLetter(m) }}</div>
                          <div class="content">
                            <div class="name">{{ displayName(m) }}</div>
                            <div class="hrs">0.00 Hrs / $0.00 </div>
                          </div>
                        </div>
                      </td>
                      <td 
                        :class="['th-10', isAvailable(m, 'Monday')]" 
                        @click="selectedUser('monday', m)"
                      >{{ displayAvailableText(m, 'Monday') }}</td>
                      <td 
                        :class="['th-10', isAvailable(m, 'Tuesday')]"
                        @click="selectedUser('tuesday', m)"
                      >{{ displayAvailableText(m, 'Tuesday') }}</td>
                      <td 
                        :class="['th-10', isAvailable(m, 'Wednesday')]"
                        @click="selectedUser('wednesday', m)"
                      >{{ displayAvailableText(m, 'Wednesday') }}</td>
                      <td 
                        :class="['th-10', isAvailable(m, 'Thursday')]"
                        @click="selectedUser('thursday', m)"
                      >{{ displayAvailableText(m, 'Thursday') }}</td>
                      <td 
                        :class="['th-10', isAvailable(m, 'Friday')]"
                        @click="selectedUser('friday', m)"
                      >{{ displayAvailableText(m, 'Friday') }}</td>
                      <td 
                        :class="['th-10', isAvailable(m, 'Saturday')]"
                        @click="selectedUser('saturday', m)"
                      >{{ displayAvailableText(m, 'Saturday') }}</td>
                      <td 
                        :class="['th-10', isAvailable(m, 'Sunday')]"
                        @click="selectedUser('sunday', m)"
                      >{{ displayAvailableText(m, 'Sunday') }}</td>
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

    <addModal 
      :sites="sites" 
      :user="payload" 
      :canDisplay="canDisplay"
      :id="identifiant"
      :businessId="businessId"
      @shiftAdded="getMembers"
    ></addModal>

    <shiftDetailsModal 
      :sites="sites" 
      :user="payload"
      :shift="selectedShift"
      :businessId="businessId"
    ></shiftDetailsModal>
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'
import moment from 'moment'
import addModal from './modals/add'
import shiftDetailsModal from './modals/shift-details'
import config from '../../services/config'

export default {
    data: () => ({
        payload: {},
        selectedShift: {},
        showFilter: false,
        canDisplay: false,
        events: [],
        sites: [],
        members: [],
        dispos: [],
        identifiant:'',
    }),

    components: { Header, Sidebar, addModal, shiftDetailsModal },

    computed: {
      date () {
        return this.displayDateFromDay('monday') + ' - ' + this.displayDateFromDay('sunday')
      },

      current_day () {
        let d = moment().format('dddd')
        return d.toLowerCase()
      },

      user () { return JSON.parse(localStorage.getItem(config.get('user'))) },

      businessId () { return this.user.business[0].business_id }
    },

    watch: { },

    mounted () {
      this.getScheduleEvents()
      this.getJobSites()
      this.getMembers()
    },

    methods: {
      displayFilter () {
        this.showFilter = !this.showFilter
        console.log('showfilter', this.showFilter)
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

      isAvailable (member, day) {
        if (member.availibilities.length>0) {
          let availability = member.availibilities.filter(f=>f.day_cut == day)
          return availability.length>0 ? member.shifts.length>0 ? 'assigned' :'applicable' : 'not-applicable'
        }

        if (member.availibilities.length==0) { return 'not-applicable' }
      },

      displayAvailableText (member, day) {
        if (member.availibilities.length>0) {
          let availability = member.availibilities.filter(f=>f.day_cut == day)
          return availability.length>0 ? member.shifts.length>0 ? 'Assigned' : 'A' : 'N.A'
        }

        if (member.availibilities.length==0) { return 'N.A' }
      },

      async getAvailabilities () {
        this.startLoading()

        const res = await this.$api.get(`/timesheet-api/employee/${this.user.id}/availibilities`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('get availabilities error', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          console.log(res.data.results)
          this.dispos = res.data.results
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

      selectedUser (day, user) {
        if (user.shifts.length==0) {
          window.eventBus.$emit('add-schedule', day)
          this.identifiant = day
          this.payload = user
          this.canDisplay = true
          window.$(`#addScheduleModal`).modal('show')
        }
        if (user.shifts.length>0) {
          window.eventBus.$emit('shift-details', user.shifts[0])
          this.payload = user
          this.selectedShift = user.shifts[0]
          window.$(`#showShiftDetailsModal`).modal('show')
        }
      },

      selected (day) {
        window.eventBus.$emit('add-schedule', 'another')
        this.identifiant = day
        this.canDisplay = false
        this.payload = {}
        window.$(`#addScheduleModal`).modal('show')
      },

      async getScheduleEvents () {
        this.startLoading()

        const res = await this.$api.get(`/schedule-api/events/`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('get schedule events error', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          console.log('getScheduleEvents', res.data)
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
