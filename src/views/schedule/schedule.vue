<template lang="html">
  <div class="">
      <Header />
    <div id="wrapper">
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
                  <div class="action"><i class="ion-ios-settings"></i></div>
                  <div class="action"><i class="ion-ios-print"></i></div>
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
                  <div class="action"><i class="ion-ios-settings"></i></div>
                  <div class="action"><i class="ion-ios-print"></i></div>
                  <div class="action"><i class="ion-md-cloud-download"></i></div>
                </div>
              </div>

              <div class="_table">
                <table>
                  <thead>
                    <tr>
                      <th class="th-40">All employees (20)</th>
                      <th class="th-12">
                        <div class="date">
                          <div class="week-day">MON</div>
                          <div :class="['day', current_day=='monday'? 'active' : '']">{{ displayDate('monday') }}</div>
                        </div>
                      </th>
                      <th class="th-12">
                        <div class="date">
                          <div class="week-day">TUE</div>
                          <div :class="['day', current_day=='tuesday'? 'active' : '']">{{ displayDate('tuesday') }}</div>
                        </div>
                      </th>
                      <th class="th-12">
                        <div class="date">
                          <div class="week-day">WED</div>
                          <div :class="['day', current_day=='wednesday'? 'active' : '']">{{ displayDate('wednesday') }}</div>
                        </div>
                      </th>
                      <th class="th-12">
                        <div class="date">
                          <div class="week-day">THU</div>
                          <div :class="['day', current_day=='thursday'? 'active' : '']">{{ displayDate('thursday') }}</div>
                        </div>
                      </th>
                      <th class="th-12">
                        <div class="date">
                          <div class="week-day">FRI</div>
                          <div :class="['day', current_day=='friday'? 'active' : '']">{{ displayDate('friday') }}</div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg">
                      <td class="th-40">Events</td>
                      <td class="th-12"></td>
                      <td class="th-12"></td>
                      <td class="th-12"></td>
                      <td class="th-12"></td>
                      <td class="th-12"></td>
                    </tr>
                    <tr class="bg">
                      <td class="th-40">
                        Open Shifts
                        <div class="hour">0.00 Hrs</div>
                      </td>
                      <td class="th-12"></td>
                      <td class="th-12"></td>
                      <td class="th-12"></td>
                      <td class="th-12"></td>
                      <td class="th-12"></td>
                    </tr>
                    <tr>
                      <td class="th-40">
                        <div class="profile">
                          <i class="feather icon-more-vertical"></i>
                          <div class="avatar">VI</div>
                          <div class="content">
                            <div class="name">Victor I.</div>
                            <div class="hrs">0.00 Hrs / $0.00 </div>
                          </div>
                        </div>
                      </td>
                      <td class="th-12"><div class="add" @click="selected('mondayId')"><i class="feather icon-plus"></i> <span>Add</span></div></td>
                      <td class="th-12"><div class="add" @click="selected('tuesdayId')"><i class="feather icon-plus"></i> <span>Add</span></div></td>
                      <td class="th-12"><div class="add" @click="selected('wednesdayId')"><i class="feather icon-plus"></i> <span>Add</span></div></td>
                      <td class="th-12"><div class="add" @click="selected('thursdayId')"><i class="feather icon-plus"></i> <span>Add</span></div></td>
                      <td class="th-12"><div class="add" @click="selected('fridayId')"><i class="feather icon-plus"></i> <span>Add</span></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
    </div>

    <addModal></addModal>
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'
import moment from 'moment'
import addModal from './modals/add'

export default {
    data: () => ({
        payload: {},
        showFilter: false,
        events: [],
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
    },

    watch: { },

    mounted () { },

    methods: {
      displayFilter () {
        this.showFilter = !this.showFilter
        console.log('showfilter', this.showFilter)
      },

      selected (id) {
        this.identifiant = id
        window.$(`#addScheduleModal`).modal('show')
      }
    }
}
</script>
