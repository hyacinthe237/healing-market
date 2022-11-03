<template lang="html">
  <div class="">
      <Header />
    <div id="wrapper">
        <Sidebar :current="'team'" />

        <div id="page-content-wrapper">
          <div class="team">
            <div class="header-box">
              <div class="title">
                <span>Team (3)</span>
                <div class="_show">
                  <label><input type="checkbox"> Show Terminated</label>
                </div>
              </div>
              <div class="reste">
                <input type="text" placeholder="Enter name">
                <select name="date">
                  <option>Select...</option>
                </select>
                <select name="date">
                  <option>By Access Level</option>
                </select>
                <select name="date">
                  <option>By Status</option>
                </select>
                <div class="btns">
                  <div class="action"><i class="ion-ios-print"></i></div>
                  <div class="action"><i class="ion-md-cloud-download"></i></div>
                </div>

                <div class="lg-btns">
                  <div class="lg-btn-outline">Bulk Action</div>
                  <div class="lg-btn-primary">Add Team Member</div>
                </div>
              </div>
              <div class="filter" @click="displayFilter()"><i class="feather icon-more-vertical"></i></div>
            </div>

            <div class="filter-box" v-if="showFilter">
              <div class="reste">
                <input type="text" placeholder="Enter name">
                <select name="date">
                  <option>Select...</option>
                </select>
                <select name="date">
                  <option>By Access Level</option>
                </select>
                <select name="date">
                  <option>By Status</option>
                </select>
                <div class="btns">
                  <div class="action"><i class="ion-ios-print"></i></div>
                  <div class="action"><i class="ion-md-cloud-download"></i></div>
                  <div class="lg-btns">
                    <div class="lg-btn-outline">Bulk Action</div>
                    <div class="lg-btn-primary"><i class="feather icon-plus"></i></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- List Box code -->
            <div class="list-box">
              <table class="table">
                  <thead>
                      <tr>
                          <th class="w30">Name</th>
                          <th class="w20 no-column">Position</th>
                          <th class="w20 no-column">Account status</th>
                          <th class="w20 no-column">Availability</th>
                          <th class="w10"></th>
                      </tr>
                  </thead>

                  <tbody>
                      <tr>
                          <td class="w30">
                            <div class="name">
                              <div class="avatar">AH</div>
                              Abanda Hyacinthe
                            </div>
                          </td>
                          <td class="w20 no-column">
                            <div class="position"></div>
                          </td>
                          <td class="w20 no-column">
                            <div class="status"></div>
                          </td>
                          <td class="w20 no-column">
                            <div class="availability"></div>
                          </td>
                          <td class="w10">
                            <div class="actions pointer">
                              <div class="icons">
                                <i class="feather icon-edit-2"></i>
                                <i class="feather icon-more-vertical"></i>
                              </div>
                            </div>
                          </td>
                      </tr>
                      <tr>
                          <td class="w30">
                            <div class="name">
                              <div class="avatar">AH</div>
                              Abanda Hyacinthe
                            </div>
                          </td>
                          <td class="w20 no-column">
                            <div class="position"></div>
                          </td>
                          <td class="w20 no-column">
                            <div class="status"></div>
                          </td>
                          <td class="w20 no-column">
                            <div class="availability"></div>
                          </td>
                          <td class="w10">
                            <div class="actions pointer">
                              <div class="icons">
                                <i class="feather icon-edit-2"></i>
                                <i class="feather icon-more-vertical"></i>
                              </div>
                            </div>
                          </td>
                      </tr>
                      <tr>
                          <td class="w30">
                            <div class="name">
                              <div class="avatar">AH</div>
                              Abanda Hyacinthe
                            </div>
                          </td>
                          <td class="w20 no-column">
                            <div class="position"></div>
                          </td>
                          <td class="w20 no-column">
                            <div class="status"></div>
                          </td>
                          <td class="w20 no-column">
                            <div class="availability"></div>
                          </td>
                          <td class="w10">
                            <div class="actions pointer">
                              <div class="icons">
                                <i class="feather icon-edit-2"></i>
                                <i class="feather icon-more-vertical"></i>
                              </div>
                            </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'

export default {
    data: () => ({
        payload: {},
        showFilter: false
    }),

    components: { Header, Sidebar },

    computed: { },

    watch: { },

    mounted () { },

    methods: {
      displayFilter () {
        this.showFilter = !this.showFilter
      }
    }
}
</script>
