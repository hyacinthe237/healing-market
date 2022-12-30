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
                            <a class="nav-item nav-link" id="nav-custom-tab"
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
                              <div class="tab-pane fade" id="nav-custom" role="tabpanel" aria-labelledby="nav-custom-tab">
                                <div class="custom-box _form">
                                  <div class="time-select">
                                    <select name="am">
                                        <option value="00:00">00:00 AM</option>
                                        <option value="01:00">01:00 AM</option>
                                        <option value="02:00">02:00 AM</option>
                                        <option value="03:00">03:00 AM</option>
                                        <option value="04:00">04:00 AM</option>
                                        <option value="05:00">05:00 AM</option>
                                        <option value="06:00">06:00 AM</option>
                                        <option value="07:00">07:00 AM</option>
                                        <option value="08:00">08:00 AM</option>
                                        <option value="09:00">09:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="12:00">12:00 AM</option>
                                    </select>
                                    <div class="midle"><i class="feather icon-minus"></i></div>
                                    <select name="pm">
                                        <option value="00:00">00:00 PM</option>
                                        <option value="01:00">01:00 PM</option>
                                        <option value="02:00">02:00 PM</option>
                                        <option value="03:00">03:00 PM</option>
                                        <option value="04:00">04:00 PM</option>
                                        <option value="05:00">05:00 PM</option>
                                        <option value="06:00">06:00 PM</option>
                                        <option value="07:00">07:00 PM</option>
                                        <option value="08:00">08:00 PM</option>
                                        <option value="09:00">09:00 PM</option>
                                        <option value="10:00">10:00 PM</option>
                                        <option value="11:00">11:00 PM</option>
                                        <option value="12:00">12:00 PM</option>
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
                                            <div :class="['day', day=='monday' ? 'active' : '']" @click="selectDay('monday')">M</div>
                                            <div :class="['day', day=='tuesday' ? 'active' : '']" @click="selectDay('tuesday')">T</div>
                                            <div :class="['day', day=='wednesday' ? 'active' : '']" @click="selectDay('wednesday')">W</div>
                                            <div :class="['day', day=='thursday' ? 'active' : '']" @click="selectDay('thursday')">T</div>
                                            <div :class="['day', day=='friday' ? 'active' : '']" @click="selectDay('friday')">F</div>
                                            <div :class="['day', day=='saturday' ? 'active' : '']" @click="selectDay('saturday')">S</div>
                                            <div :class="['day', day=='sunday' ? 'active' : '']" @click="selectDay('sunday')">S</div>
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
    }),

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
    },

    watch: {},

    mounted () {
        window.eventBus.$on('add-schedule', (result) => {
             if (result !== '') {
                this.day = result
                $('#nav-custom').addClass("active")
                $('#nav-custom').click()
             }
        })
    },

    methods: {
        selectDay (value) {
            this.day = value
        },
        close () {
            window.$('.modal').modal('hide')
        },

        setColor (site) {
            this.selectedColor = site.color_code
            this.selectedColorName = site.name
            this.active = false
            this.ghost.color_code = site.color_code
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
