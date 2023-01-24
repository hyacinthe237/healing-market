<template lang="html">
  <div class="">
      <Header v-show="!isLoading" />
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'mytimesheet'" />

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
                </div>
              </div>

              <div class="_table mt-20">
                <table>
                  <thead>
                    <tr class="bg">
                      <td class="th-10">Date</td>
                      <td class="th-10">Role</td>
                      <td class="th-10">Hourly rate</td>
                      <td class="th-10">Number of shift</td>
                      <td class="th-10">Est earning</td>
                      <td class="th-10">Completed shift</td>
                      <td class="th-10">Acc</td>
                      <td class="th-10">Issus</td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="e in events" :key="e.id">
                      <td class="th-10">
                        <span class="txtdt">{{ formatedDayTxt(e.created_at) }}</span>
                        <span class="chdt">{{ formatedDayChiffre(e.created_at) }}</span>
                      </td>
                      <td class="th-10">{{ displayRole() }}</td>
                      <td class="th-10">{{ displayRate() }}</td>
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
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'
import moment from 'moment'
import config from '../../services/config'

export default {
    data: () => ({
        payload: {},
        showFilter: false,
        events: [],
        sites: [],
        identifiant:'',
    }),

    components: { Header, Sidebar },

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
      this.getAvailabilities()
    },

    methods: {
      displayFilter () {
        this.showFilter = !this.showFilter
        console.log('showfilter', this.showFilter)
      },

      displayRole () {
        let str = ''
        if (this.user.is_employee) str = 'Employee'
        if (this.user.is_manager) str = 'Manager'
        return str
      },

      displayRate () {
        return '$ ' + this.user.wage
      },

      formatedDayTxt (dt) {
        let txtdt = moment(dt).format('dddd')
        return txtdt.slice(0, 3)
      },

      formatedDayChiffre (dt) {
        return moment(dt).format('DD')
      },

      openModal () {
        window.$(`#addAvailabilityModal`).modal('show')
      },

      async getScheduleEvents () {
        this.startLoading()

        const res = await this.$api.get(`/timesheet-api/employee/${this.user.id}/shifts`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('get schedule events error', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          this.events = res.data.results
        }
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
          // this.sites = res.data.results
        }
      },
    }
}
</script>
