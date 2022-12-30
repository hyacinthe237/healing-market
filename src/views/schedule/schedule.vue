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

              <div class="_table mt-20">
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
                      <td class="th-10"><div class="add" @click="selected('monday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('thuesday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('wednesday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('thursday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('friday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('saturday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
                      <td class="th-10"><div class="add" @click="selected('sunday')"><span>Create open shift</span> <i class="feather icon-plus"></i></div></td>
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
                      <td class="th-10 applicable" @click="selectedUser('monday', m)">A</td>
                      <td class="th-10 not-applicable">N.A</td>
                      <td class="th-10 applicable">A</td>
                      <td class="th-10 not-applicable">N.A</td>
                      <td class="th-10 applicable">A</td>
                      <td class="th-10 not-applicable">N.A</td>
                      <td class="th-10 not-applicable">N.A</td>
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

    <addModal :sites="sites" :user="payload" :canDisplay="canDisplay"></addModal>
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'
import moment from 'moment'
import addModal from './modals/add'
import config from '../../services/config'

export default {
    data: () => ({
        payload: {},
        showFilter: false,
        canDisplay: false,
        events: [],
        sites: [],
        members: [],
        identifiant:'',
    }),

    components: { Header, Sidebar, addModal },

    computed: {
      date () {
        return this.displayDateFromDay('monday') + ' - ' + this.displayDateFromDay('sunday')
      },

      current_day () {
        let d = moment().format('dddd')
        return d.toLowerCase()
      },

      user () { return JSON.parse(localStorage.getItem(config.get('user'))) },
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
        window.eventBus.$emit('add-schedule', day)
        this.payload = user
        this.canDisplay = true
        window.$(`#addScheduleModal`).modal('show')
      },

      selected (day) {
        window.eventBus.$emit('add-schedule', day)
        this.canDisplay = false
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
