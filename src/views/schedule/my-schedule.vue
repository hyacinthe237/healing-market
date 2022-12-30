<template lang="html">
  <div class="">
      <Header v-show="!isLoading" />
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'myschedule'" />

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
                </div>
                <div class="schedule-spacer"></div>
                <div class="btns">
                  <div class="action"><i class="ion-md-cloud-download"></i></div>
                  <div class="action"><i class="feather icon-plus"></i></div>
                </div>
                <div class="filter" @click="displayFilter()"><i class="feather icon-filter"></i></div>
              </div>

              <div class="_table mt-20">
                <table>
                  <thead>
                    <tr>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">MON</div>
                          <div :class="['day']">{{ displayDate('monday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">TUE</div>
                          <div :class="['day']">{{ displayDate('tuesday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">WED</div>
                          <div :class="['day']">{{ displayDate('wednesday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">THU</div>
                          <div :class="['day']">{{ displayDate('thursday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">FRI</div>
                          <div :class="['day']">{{ displayDate('friday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">SAT</div>
                          <div :class="['day']">{{ displayDate('saturday') }}</div>
                        </div>
                      </th>
                      <th class="th-10">
                        <div class="date">
                          <div class="week-day">SUN</div>
                          <div :class="['day']">{{ displayDate('sunday') }}</div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
                      <td class="th-10"></td>
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

    <addModal :sites="sites" :user="user"></addModal>
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
        events: [],
        sites: [],
        identifiant:'',
    }),

    components: { Header, Sidebar, addModal },

    computed: {
      date () {
        return 'March 26 - Apr 2, 2019'
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
      this.getAvailabilities()
    },

    methods: {
      displayFilter () {
        this.showFilter = !this.showFilter
        console.log('showfilter', this.showFilter)
      },

      selected (day) {
        window.eventBus.$emit('add-schedule', day)
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

      async getAvailabilities () {
        this.startLoading()

        const res = await this.$api.get(`/timesheet-api/availibilities/`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('get availabilities error', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          console.log(res.data.results)
          // this.sites = res.data.results
        }
      },
    }
}
</script>
