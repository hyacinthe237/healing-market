<template lang="html">
    <div class="_add-schedule-modal modal animated fadeIn" id="addScheduleModal">
        <div class="modal-dialog" role="document" v-show="!isLoading">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title content" v-if="canDisplay">
                        <div class="avatar">{{ displayLetter }}</div>
                        <div class="name">{{ displayName }}</div>
                    </div>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-if="canDisplay">
                        <span aria-hidden="true">×</span>
                    </button>

                    <div type="button" class="closer" data-dismiss="modal" aria-label="Close" v-show="!canDisplay">
                        <span aria-hidden="true">×</span>
                    </div>

                    <div class="_tabs">
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="nav-custom-tab"
                                data-toggle="tab" href="#nav-custom" role="tab"
                                aria-controls="nav-custom">Custom</a>

                            <a class="nav-item nav-link" id="nav-common-tab"
                                data-toggle="tab" href="#nav-common" role="tab"
                                aria-controls="nav-common">Common</a>

                            <a class="nav-item nav-link" id="nav-timeoff-tab"
                                data-toggle="tab" href="#nav-timeoff" role="tab"
                                aria-controls="nav-timeoff" v-if="canDisplay">Time Off</a>
                        </div>
                    </div>
                </div>
                <div class="_modal-content">
                      <div>
                          <div class="tab-content" id="nav-tabContent">
                              <div class="tab-pane fade active show" id="nav-custom" role="tabpanel" aria-labelledby="nav-custom-tab">
                                <div class="custom-box _form">
                                  <div class="time-select">
                                    <select name="debut_time" v-model="ghost.debut_time">
                                        <option value="12:00am">12:00 AM</option><option value="12:15am">12:15 AM</option><option value="12:30am">12:30 AM</option><option value="12:45am">12:45 AM</option>
                                        <option value="1:00am">1:00 AM</option><option value="1:15am">1:15 AM</option><option value="1:30am">1:30 AM</option><option value="1:45am">1:45 AM</option>
                                        <option value="2:00am">2:00 AM</option><option value="2:15am">2:15 AM</option><option value="2:30am">2:30 AM</option><option value="2:45am">2:45 AM</option>
                                        <option value="3:00am">3:00 AM</option><option value="3:15am">3:15 AM</option><option value="3:30am">3:30 AM</option><option value="3:45am">3:45 AM</option>
                                        <option value="4:00am">4:00 AM</option><option value="4:15am">4:15 AM</option><option value="4:30am">4:30 AM</option><option value="4:45am">4:45 AM</option>
                                        <option value="5:00am">5:00 AM</option><option value="5:15am">5:15 AM</option><option value="5:30am">5:30 AM</option><option value="5:45am">5:45 AM</option>
                                        <option value="6:00am">6:00 AM</option><option value="6:15am">6:15 AM</option><option value="6:30am">6:30 AM</option><option value="6:45am">6:45 AM</option>
                                        <option value="7:00am">7:00 AM</option><option value="7:15am">7:15 AM</option><option value="7:30am">7:30 AM</option><option value="7:45am">7:45 AM</option>
                                        <option value="8:00am">8:00 AM</option><option value="8:15am">8:15 AM</option><option value="8:30am">8:30 AM</option><option value="8:45am">8:45 AM</option>
                                        <option value="9:00am">9:00 AM</option><option value="9:15am">9:15 AM</option><option value="9:30am">9:30 AM</option><option value="9:45am">9:45 AM</option>
                                        <option value="10:00am">10:00 AM</option><option value="10:15am">10:15 AM</option><option value="10:30am">10:30 AM</option><option value="10:45am">10:45 AM</option>
                                        <option value="11:00am">11:00 AM</option><option value="11:15am">11:15 AM</option><option value="11:30am">11:30 AM</option><option value="11:45am">11:45 AM</option>
                                        <option value="12:00pm">12:00 PM</option><option value="12:15pm">12:15 PM</option><option value="12:30pm">12:30 PM</option><option value="12:45pm">12:45 PM</option>
                                        <option value="1:00pm">1:00 PM</option><option value="1:15pm">1:15 PM</option><option value="1:30pm">1:30 PM</option><option value="1:45pm">1:45 PM</option>
                                        <option value="2:00pm">2:00 PM</option><option value="2:15pm">2:15 PM</option><option value="2:30pm">2:30 PM</option><option value="2:45pm">2:45 PM</option>
                                        <option value="3:00pm">3:00 PM</option><option value="3:15pm">3:15 PM</option><option value="3:30pm">3:30 PM</option><option value="3:45pm">3:45 PM</option>
                                        <option value="4:00pm">4:00 PM</option><option value="4:15pm">4:15 PM</option><option value="4:30pm">4:30 PM</option><option value="4:45pm">4:45 PM</option>
                                        <option value="5:00pm">5:00 PM</option><option value="5:15pm">5:15 PM</option><option value="5:30pm">5:30 PM</option><option value="5:45pm">5:45 PM</option>
                                        <option value="6:00pm">6:00 PM</option><option value="6:15pm">6:15 PM</option><option value="6:30pm">6:30 PM</option><option value="6:45pm">6:45 PM</option>
                                        <option value="7:00pm">7:00 PM</option><option value="7:15pm">7:15 PM</option><option value="7:30pm">7:30 PM</option><option value="7:45pm">7:45 PM</option>
                                        <option value="8:00pm">8:00 PM</option><option value="8:15pm">8:15 PM</option><option value="8:30pm">8:30 PM</option><option value="8:45pm">8:45 PM</option>
                                        <option value="9:00pm">9:00 PM</option><option value="9:15pm">9:15 PM</option><option value="9:30pm">9:30 PM</option><option value="9:45pm">9:45 PM</option>
                                        <option value="10:00pm">10:00 PM</option><option value="10:15pm">10:15 PM</option><option value="10:30pm">10:30 PM</option><option value="10:45pm">10:45 PM</option>
                                        <option value="11:00pm">11:00 PM</option><option value="11:15pm">11:15 PM</option><option value="11:30pm">11:30 PM</option><option value="11:45pm">11:45 PM</option>
                                    </select>
                                    <div class="midle"><i class="feather icon-minus"></i></div>
                                    <select name="end_time" v-model="ghost.end_time">
                                        <option value="12:00am">12:00 AM</option><option value="12:15am">12:15 AM</option><option value="12:30am">12:30 AM</option><option value="12:45am">12:45 AM</option>
                                        <option value="1:00am">1:00 AM</option><option value="1:15am">1:15 AM</option><option value="1:30am">1:30 AM</option><option value="1:45am">1:45 AM</option>
                                        <option value="2:00am">2:00 AM</option><option value="2:15am">2:15 AM</option><option value="2:30am">2:30 AM</option><option value="2:45am">2:45 AM</option>
                                        <option value="3:00am">3:00 AM</option><option value="3:15am">3:15 AM</option><option value="3:30am">3:30 AM</option><option value="3:45am">3:45 AM</option>
                                        <option value="4:00am">4:00 AM</option><option value="4:15am">4:15 AM</option><option value="4:30am">4:30 AM</option><option value="4:45am">4:45 AM</option>
                                        <option value="5:00am">5:00 AM</option><option value="5:15am">5:15 AM</option><option value="5:30am">5:30 AM</option><option value="5:45am">5:45 AM</option>
                                        <option value="6:00am">6:00 AM</option><option value="6:15am">6:15 AM</option><option value="6:30am">6:30 AM</option><option value="6:45am">6:45 AM</option>
                                        <option value="7:00am">7:00 AM</option><option value="7:15am">7:15 AM</option><option value="7:30am">7:30 AM</option><option value="7:45am">7:45 AM</option>
                                        <option value="8:00am">8:00 AM</option><option value="8:15am">8:15 AM</option><option value="8:30am">8:30 AM</option><option value="8:45am">8:45 AM</option>
                                        <option value="9:00am">9:00 AM</option><option value="9:15am">9:15 AM</option><option value="9:30am">9:30 AM</option><option value="9:45am">9:45 AM</option>
                                        <option value="10:00am">10:00 AM</option><option value="10:15am">10:15 AM</option><option value="10:30am">10:30 AM</option><option value="10:45am">10:45 AM</option>
                                        <option value="11:00am">11:00 AM</option><option value="11:15am">11:15 AM</option><option value="11:30am">11:30 AM</option><option value="11:45am">11:45 AM</option>
                                        <option value="12:00pm">12:00 PM</option><option value="12:15pm">12:15 PM</option><option value="12:30pm">12:30 PM</option><option value="12:45pm">12:45 PM</option>
                                        <option value="1:00pm">1:00 PM</option><option value="1:15pm">1:15 PM</option><option value="1:30pm">1:30 PM</option><option value="1:45pm">1:45 PM</option>
                                        <option value="2:00pm">2:00 PM</option><option value="2:15pm">2:15 PM</option><option value="2:30pm">2:30 PM</option><option value="2:45pm">2:45 PM</option>
                                        <option value="3:00pm">3:00 PM</option><option value="3:15pm">3:15 PM</option><option value="3:30pm">3:30 PM</option><option value="3:45pm">3:45 PM</option>
                                        <option value="4:00pm">4:00 PM</option><option value="4:15pm">4:15 PM</option><option value="4:30pm">4:30 PM</option><option value="4:45pm">4:45 PM</option>
                                        <option value="5:00pm">5:00 PM</option><option value="5:15pm">5:15 PM</option><option value="5:30pm">5:30 PM</option><option value="5:45pm">5:45 PM</option>
                                        <option value="6:00pm">6:00 PM</option><option value="6:15pm">6:15 PM</option><option value="6:30pm">6:30 PM</option><option value="6:45pm">6:45 PM</option>
                                        <option value="7:00pm">7:00 PM</option><option value="7:15pm">7:15 PM</option><option value="7:30pm">7:30 PM</option><option value="7:45pm">7:45 PM</option>
                                        <option value="8:00pm">8:00 PM</option><option value="8:15pm">8:15 PM</option><option value="8:30pm">8:30 PM</option><option value="8:45pm">8:45 PM</option>
                                        <option value="9:00pm">9:00 PM</option><option value="9:15pm">9:15 PM</option><option value="9:30pm">9:30 PM</option><option value="9:45pm">9:45 PM</option>
                                        <option value="10:00pm">10:00 PM</option><option value="10:15pm">10:15 PM</option><option value="10:30pm">10:30 PM</option><option value="10:45pm">10:45 PM</option>
                                        <option value="11:00pm">11:00 PM</option><option value="11:15pm">11:15 PM</option><option value="11:30pm">11:30 PM</option><option value="11:45pm">11:45 PM</option>
                                    </select>
                                  </div>
                                  <div class="select-line">
                                        <div id="color-picker" class="form-group mt-10">
                                            <div class="wrapper-dropdown">
                                                <span @click="toggleDropdown()" v-html="selector"></span>
                                                <ul class="dropdown" v-show="active">
                                                    <li>No job site</li>
                                                    <li 
                                                    v-for="site in sites" 
                                                    :key="site.id"
                                                    @click="setColor(site)"
                                                    >
                                                    <span :style="{background: site.color_code}"></span> {{site.name}}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                  </div>

                                  <div class="applies mt-10">
                                        <label for="apply">Apply to</label>
                                        <div class="days">
                                            <div 
                                                v-for="(d, index) in days" :key="index++"
                                                :class="['day', hasJour(d) ? 'active' : '']"
                                                @click="selectDay(d)"
                                            >{{ displayFirstLetter(d) }}</div>
                                        </div>
                                  </div>

                                  <div class="form-group mt-20">
                                    <label for="notes">Shift Notes</label>
                                    <textarea placeholder="Leave a note for your employee, like the address of a job site, and they'll see it when they clock in." name="description" v-model="ghost.description" id="description" cols="1" rows="2" class="form-control"></textarea>
                                  </div>

                                  <div class="save-button mt-20 pointer" @click="save()">
                                    <div class="text">Add</div>
                                    <div class="icon"><i class="feather icon-save"></i></div>
                                </div>
                                </div>
                              </div>

                              <div class="tab-pane fade" id="nav-common" role="tabpanel" aria-labelledby="nav-common-tab">

                              </div>

                              <div class="tab-pane fade" id="nav-timeoff" role="tabpanel" aria-labelledby="nav-timeoff-tab">

                              </div>
                          </div>
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
// import _ from 'lodash'

export default {

    props: {
        id: {
            type: String,
            default: '',
        },
        user: {
            type: Object,
            default: () => {},
        },
        sites: {
            type: Array,
            default: () => [],
        },
        canDisplay: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        active: false,
        selectedColor: '',
        selectedColorName: '',
        day: '',
        selected: [],
        ghost: {
            notes: '',
            job_site: '',
            end_time: '5:00pm',
            debut_time: '9:00am',
            business: '',
            employees: '',
            days_week: '',
            days: ''
        },
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    }),

    watch: {
        ghost () {
            this.initUserAvailabilities()
        },
    },

    computed: {
        selector () {
            if(!this.selectedColor) {
                return 'No job site';
            }
            else {
            return '<span style="background: ' + this.selectedColor + '"></span> ' + this.selectedColorName;
            }
        },

        displayLetter () {
            let str = ''
            if ((this.user.last_name !== '') && (this.user.first_name !== '')) str = this.user.last_name[0] + this.user.first_name[0]
            else str = this.user.username[0]
            return str
        },

        displayName () {
            let str = ''
            if ((this.user.last_name !== '') && (this.user.first_name !== '')) str = this.user.last_name + ' ' + this.user.first_name
            else str = this.user.username
            return str
        },

        userAvailabilities () {
            return this.user.availibilities
        },
    },

    mounted () {
        window.eventBus.$on('add-schedule', (result) => {
             if (result !== '') {
                this.initUserAvailabilities()
                this.resetGhost()
             }

             if (result == '') {
                this.selected = []
                this.resetGhost()
             }
        })
    },

    methods: {
        selectDay (value) {
            let exist_day = this.selected.filter(d => d == value)
            if (exist_day.length>0) {
                this.selected = this.selected.filter(d => d !== value)
                this.ghost.days_week = this.selected
            }
            
            if (exist_day.length==0) {
                this.selected.push(value)
                this.ghost.days_week = this.selected
            }
        },

        close () {
            window.$('.modal').modal('hide')
        },

        hasJour (id) {
            if (this.ghost) {
                return this.selected.filter(u => u === id).length>0
            }
        },

        displayFirstLetter (value) {
            return value[0]
        },

        initUserAvailabilities () {
            if (this.userAvailabilities) {
                this.userAvailabilities.forEach(u => this.selected.push(u.day_cut))
            }
            this.ghost.days_week = this.selected
        },

        resetGhost () {
            this.ghost = {
                notes: '',
                job_site: '',
                end_time: '5:00pm',
                debut_time: '9:00am',
                business: '',
                employees: '',
                days_week: '',
                days: ''
            }
        },

        setColor (site) {
            this.selectedColor = site.color_code
            this.selectedColorName = site.name
            this.active = false
            this.ghost.job_site = site.id
        },

        toggleDropdown () {
            this.active = !this.active
        },

        async save () {
            this.startLoading()
            this.ghost.business = this.user.business[0].business_id

            const response = await this.$api.post('schedule-api/events/', this.ghost)
            .catch(error => {
                console.log('error', error.response.data)
                this.stopLoading()
            })
            if (response) {
                this.stopLoading()
                this.$swal.success('Confirmation', 'Schedule Event added successfuly')
                this.$emit('scheduleAdded')
                this.closeAllModals()
            }
        }
    }
}
</script>
