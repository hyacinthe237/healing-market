<template lang="html">
  <div class="">
      <Header />
    <div id="wrapper">
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
                <div class="filter-table"><i class="ion-ios-tool"></i> filter table</div>
                <div class="btns">
                  <div class="action"><i class="ion-ios-print"></i></div>
                  <div class="action"><i class="ion-md-cloud-download"></i></div>
                </div>

                <div class="lg-btns">
                  <div class="lg-btn-outline">Add Time Card</div>
                  <div class="lg-btn-primary">Download</div>
                </div>
              </div>
              <div class="filter" @click="displayFilter()"><i class="feather icon-more-vertical"></i></div>
            </div>

            <div class="filter-box" v-if="showFilter">
              <div class="title">
                <select name="last">
                  <option value="">Last 7 days: Fri Oct 28 - Fri Nov 4</option>
                </select>
                <div class="lg-btns">
                  <div class="lg-btn-outline">View Totals</div>
                </div>
              </div>
              <div class="reste">
                <div class="filter-table"><i class="feather icon-tool"></i> filter table</div>
                <div class="btns">
                  <div class="action"><i class="ion-ios-print"></i></div>
                  <div class="action"><i class="ion-md-cloud-download"></i></div>
                </div>

                <div class="lg-btns">
                  <div class="lg-btn-outline">Add Time Card</div>
                  <div class="lg-btn-primary">Download</div>
                </div>
              </div>
            </div>

            <!-- List Box code -->
            <div class="grey-box">
              <div class="grey-head">
                <i class="feather icon-chevron-down"></i>
                <i class="feather icon-chevron-up"></i>
                Filter Timesheets
              </div>

              <div class="inputs">
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
        </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'
import moment from 'moment'

export default {
    data: () => ({
        payload: {},
        showFilter: false
    }),

    components: { Header, Sidebar },

    computed: {
      last_seven_day () {
        let today = moment().format('ddd MMM d')
        let lastdat = moment().subtract(7, 'days').format('ddd MMM d')

        return `${lastdat} - ${today}`
      }
    },

    watch: { },

    mounted () {
      console.log(this.last_seven_day)
    },

    methods: {
      displayFilter () { this.showFilter = !this.showFilter }
    }
}
</script>
