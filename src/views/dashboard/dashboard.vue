<template lang="html">
  <div class="">
      <Header />
    <div id="wrapper">
        <Sidebar />

        <div id="page-content-wrapper">
            <div class="dashboard">
              <div class="cards">

                <div class="card">
                  <div class="gauche">
                    <div class="number">45</div>
                    <div class="name">Team members</div>
                  </div>
                  <div class="droite"><i class="feather icon-users"></i></div>
                </div>

                <div class="card">
                  <div class="gauche">
                    <div class="number">45</div>
                    <div class="name">Clocked in</div>
                  </div>
                  <div class="droite"><i class="feather icon-user"></i></div>
                </div>
              </div>

              <div>
                  <div class="_tabs mt-20">
                      <div class="nav nav-tabs" id="nav-tab" role="tablist">
                          <a class="nav-item nav-link" id="nav-upcoming-tab"
                              data-toggle="tab" href="#nav-upcoming" role="tab"
                              aria-controls="nav-upcoming">Now & Upcoming (1)</a>

                          <a class="nav-item nav-link" id="nav-completed-tab"
                              data-toggle="tab" href="#nav-completed" role="tab"
                              aria-controls="nav-completed">Completed (0)</a>
                      </div>
                  </div>

                  <div class="tab-content" id="nav-tabContent">
                      <div class="tab-pane fade" id="nav-upcoming" role="tabpanel" aria-labelledby="nav-upcoming-tab">
                          <div class="upcoming-box">
                            <div class="upcoming-item">
                              <div class="hour">5 pm</div>
                              <div class="avatar">AH</div>
                              <div class="content">
                                <div class="name">
                                  Abanda Hyacinthe
                                  <div class="time">Starts in 1hr 32m / 4:45 pm - 9:45 am</div>
                                </div>
                                <div class="more"><i class="feather icon-more-vertical"></i></div>
                              </div>
                            </div>
                          </div>
                      </div>

                      <div class="tab-pane fade" id="nav-completed" role="tabpanel" aria-labelledby="nav-completed-tab">
                        <div class="upcoming-box">
                          <div class="upcoming-item">
                            <div class="hour">5 pm</div>
                            <div class="avatar">AH</div>
                            <div class="content">
                              <div class="name">
                                Abanda Hyacinthe
                                <div class="time">Starts in 1hr 32m / 4:45 pm - 9:45 am</div>
                              </div>
                              <div class="more"><i class="feather icon-more-vertical"></i></div>
                            </div>
                          </div>
                        </div>
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
import _ from 'lodash'

export default {
    data: () => ({
        payload: {}
    }),

    components: { Header, Sidebar },

    computed: { },

    watch: { },

    mounted () { },

    methods: { }
}
</script>
