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
                  <select name="date" v-model="period">
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
                <div class="schedule-spacer"></div>
                <div class="btns">
                  <div class="action"><i class="ion-md-cloud-download"></i></div>
                  <div class="action-bg pointer" @click="openModal()"><i class="feather icon-plus"></i> Set day(s)</div>
                </div>
                <div class="mb-5 filter" @click="displayFilter()"><i class="feather icon-filter"></i></div>
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
                </div>
                <div class="schedule-spacer"></div>
                <div class="btns">
                  <div class="action-bg pointer" @click="openModal()"><i class="feather icon-plus"></i> Set day(s)</div>
                  <div class="action"><i class="ion-md-cloud-download"></i></div>
                </div>
              </div>

              <div class="mt-20 _table" v-if="period == 'week'">
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
                      <td class="th-10">
                        <div class="date">
                          <div class="bold fs-10">Times</div>
                          <div class="text-light fs-10">Hrs</div>
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="date">
                          <div class="bold fs-10">Times</div>
                          <div class="text-light fs-10">Hrs</div>
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="date">
                          <div class="bold fs-10">Times</div>
                          <div class="text-light fs-10">Hrs</div>
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="date">
                          <div class="bold fs-10">Times</div>
                          <div class="text-light fs-10">Hrs</div>
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="date">
                          <div class="bold fs-10">Times</div>
                          <div class="text-light fs-10">Hrs</div>
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="date">
                          <div class="bold fs-10">Times</div>
                          <div class="text-light fs-10">Hrs</div>
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="date">
                          <div class="bold fs-10">Times</div>
                          <div class="text-light fs-10">Hrs</div>
                        </div>
                      </td>
                    </tr>

                    <tr class="bg-red">
                      <td class="th-10 fs-10 bold center primary">10PM - 6AM</td>
                      <td class="th-10 fs-10 bold center">10PM - 6AM</td>
                      <td class="th-10 fs-10 bold center">10PM - 6AM</td>
                      <td class="th-10 fs-10 bold center">10PM - 6AM</td>
                      <td class="th-10 fs-10 bold center">10PM - 6AM</td>
                      <td class="th-10 fs-10 bold center">10PM - 6AM</td>
                      <td class="th-10 fs-10 bold center">10PM - 6AM</td>
                    </tr>
                    <tr v-for="(shift, index) in events" :key="shift.id">
                      <td class="th-10">
                        <div class="schedule-item" v-if="displayMonday(shift.days_of_week, 'Monday')">
                          <div class="label">Security officer</div>
                          <popover-vue :id="`popover-active-monday-${index}-${shift.id}`" :item="shift" />
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="schedule-item" v-if="displayMonday(shift.days_of_week, 'Tuesday')">
                          <div class="label">Security officer</div>
                          <popover-vue :id="`popover-active-tuesday-${index}-${shift.id}`" :item="shift" />
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="schedule-item" v-if="displayMonday(shift.days_of_week, 'Wednesday')">
                          <div class="label">Security officer</div>
                          <popover-vue :id="`popover-active-wednesday-${index}-${shift.id}`" :item="shift" />
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="schedule-item" v-if="displayMonday(shift.days_of_week, 'Thursday')">
                          <div class="label">Security officer</div>
                          <popover-vue :id="`popover-active-thursday-${index}-${shift.id}`" :item="shift" />
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="schedule-item" v-if="displayMonday(shift.days_of_week, 'Friday')">
                          <div class="label">Security officer</div>
                          <popover-vue :id="`popover-active-friday-${index}-${shift.id}`" :item="shift" />
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="schedule-item" v-if="displayMonday(shift.days_of_week, 'Saturday')">
                          <div class="label">Security officer</div>
                          <popover-vue :id="`popover-active-saturday-${index}-${shift.id}`" :item="shift" />
                        </div>
                      </td>
                      <td class="th-10">
                        <div class="schedule-item" v-if="displayMonday(shift.days_of_week, 'Sunday')">
                          <div class="label">Security officer</div>
                          <popover-vue :id="`popover-active-sunday-${index}-${shift.id}`" :item="shift" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <izy-calendar v-if="period == 'month'"/>
            </div>
        </div>
    </div>

    <div class="_loader" v-show="isLoading">
      <Spinners></Spinners>
    </div>

    <addModal :user="user" @added="getAvailabilities"></addModal>
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'
import moment from 'moment'
import addModal from './modals/add-availability'
import config from '../../services/config'

export default {
    data: () => ({
        payload: {},
        showFilter: false,
        events: [],
        sites: [],
        period:'week',
        identifiant:'',
        tab_hours: [
        {value: "1:00", option: "1:00 AM"}, {value: "1:15", option: "1:15 AM"}, {value: "1:30", option: "1:30 AM"}, {value: "1:45", option: "1:45 AM"},
        {value: "2:00", option: "2:00 AM"}, {value: "2:15", option: "2:15 AM"}, {value: "2:30", option: "2:30 AM"}, {value: "2:45", option: "2:45 AM"},
        {value: "3:00", option: "3:00 AM"}, {value: "3:15", option: "3:15 AM"}, {value: "3:30", option: "3:30 AM"}, {value: "3:45", option: "3:45 AM"},
        {value: "4:00", option: "4:00 AM"}, {value: "4:15", option: "4:15 AM"}, {value: "4:30", option: "4:30 AM"}, {value: "4:45", option: "4:45 AM"},
        {value: "5:00", option: "5:00 AM"}, {value: "5:15", option: "5:15 AM"}, {value: "5:30", option: "5:30 AM"}, {value: "5:45", option: "5:45 AM"},
        {value: "6:00", option: "6:00 AM"}, {value: "6:15", option: "6:15 AM"}, {value: "6:30", option: "6:30 AM"}, {value: "6:45", option: "6:45 AM"},
        {value: "7:00", option: "7:00 AM"}, {value: "7:15", option: "7:15 AM"}, {value: "7:30", option: "7:30 AM"}, {value: "7:45", option: "7:45 AM"},
        {value: "8:00", option: "8:00 AM"}, {value: "8:15", option: "8:15 AM"}, {value: "8:30", option: "8:30 AM"}, {value: "8:45", option: "8:45 AM"},
        {value: "9:00", option: "9:00 AM"}, {value: "9:15", option: "9:15 AM"}, {value: "9:30", option: "9:30 AM"}, {value: "9:45", option: "9:45 AM"},
        {value: "10:00", option: "10:00 AM"}, {value: "10:15", option: "10:15 AM"}, {value: "10:30", option: "10:30 AM"}, {value: "10:45", option: "10:45 AM"},
        {value: "11:00", option: "11:00 AM"}, {value: "11:15", option: "11:15 AM"}, {value: "11:30", option: "11:30 AM"}, {value: "11:45", option: "11:45 AM"},
        {value: "12:00", option: "12:00 AM"}, {value: "12:15", option: "12:15 AM"}, {value: "12:30", option: "12:30 AM"}, {value: "12:45", option: "12:45 AM"},
        {value: "13:00", option: "1:00 PM"}, {value: "13:15", option: "1:15 PM"}, {value: "13:30", option: "1:30 PM"}, {value: "13:45", option: "1:45 PM"},
        {value: "14:00", option: "2:00 PM"}, {value: "14:15", option: "2:15 PM"}, {value: "14:30", option: "2:30 PM"}, {value: "14:45", option: "2:45 PM"},
        {value: "15:00", option: "3:00 PM"}, {value: "15:15", option: "3:15 PM"}, {value: "15:30", option: "3:30 PM"}, {value: "15:45", option: "3:45 PM"},
        {value: "16:00", option: "4:00 PM"}, {value: "16:15", option: "4:15 PM"}, {value: "16:30", option: "4:30 PM"}, {value: "16:45", option: "4:45 PM"},
        {value: "17:00", option: "5:00 PM"}, {value: "17:15", option: "5:15 PM"}, {value: "17:30", option: "5:30 PM"}, {value: "17:45", option: "5:45 PM"},
        {value: "18:00", option: "6:00 PM"}, {value: "18:15", option: "6:15 PM"}, {value: "18:30", option: "6:30 PM"}, {value: "18:45", option: "6:45 PM"},
        {value: "19:00", option: "7:00 PM"}, {value: "19:15", option: "7:15 PM"}, {value: "19:30", option: "7:30 PM"}, {value: "19:45", option: "7:45 PM"},
        {value: "20:00", option: "8:00 PM"}, {value: "8:15", option: "8:15 PM"}, {value: "8:30", option: "8:30 PM"}, {value: "8:45", option: "8:45 PM"},
        {value: "21:00", option: "9:00 PM"}, {value: "21:15", option: "9:15 PM"}, {value: "21:30", option: "9:30 PM"}, {value: "21:45", option: "9:45 PM"},
        {value: "22:00", option: "10:00 PM"}, {value: "22:15", option: "10:15 PM"}, {value: "22:30", option: "10:30 PM"}, {value: "22:45", option: "10:45 PM"},
        {value: "23:00", option: "11:00 PM"}, {value: "23:15", option: "11:15 PM"}, {value: "23:30", option: "11:30 PM"}, {value: "23:45", option: "11:45 PM"},
        {value: "00:00", option: "12:00 PM"}, {value: "00:15", option: "12:15 PM"}, {value: "00:30", option: "12:30 PM"}, {value: "00:45", option: "12:45 PM"}]
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
      this.getAvailabilities()
    },

    methods: {
      displayFilter () {
        this.showFilter = !this.showFilter
        console.log('showfilter', this.showFilter)
      },

      openModal () {
        window.eventBus.$emit('add-availability', 'added')
        window.$(`#addAvailabilityModal`).modal('show')
      },

      displayMonday(days, day) {
        if (days.length>0) {
          return days.includes(day)
        }

        if (days.length ==0) {
          return false
        }
      },

      async getScheduleEvents () {
        this.startLoading()
        const payload = {
          start_date: this.displayFullDate('monday'),
          end_date: this.displayFullDate('sunday')
        }

        const res = await this.$api.get(`/timesheet-api/employee/${this.user.id}/shifts-per-period`, { params: payload })
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
