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
      date () {
        return 'March 26 - Apr 2, 2019'
      }
    },

    watch: { },

    mounted () { },

    methods: {
      displayFilter () {
        this.showFilter = !this.showFilter
        console.log('showfilter', this.showFilter)
      }
    }
}
</script>
