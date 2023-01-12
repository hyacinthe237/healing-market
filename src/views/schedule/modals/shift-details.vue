<template lang="html">
    <div class="_add-schedule-modal modal animated fadeIn" id="showShiftDetailsModal">
        <div class="modal-dialog" role="document" v-show="!isLoading">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Shift Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>

                    <!--<div class="_tabs">
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="nav-custom-tab"
                                data-toggle="tab" href="#nav-custom" role="tab"
                                aria-controls="nav-custom">Current</a>
                        </div>
                    </div>-->
                </div>
                <div class="_modal-content">
                      <div>
                          <div class="tab-content" id="nav-tabContent">
                              <div class="tab-pane fade active show" id="nav-custom" role="tabpanel" aria-labelledby="nav-custom-tab">
                                <div class="custom-box _form">
                                  <div class="time-select">
                                    <select name="debut_time" v-model="ghost.debut_time">
                                        <option v-for="(h, index) in tab_hours" :value="h.value" :key="index++">{{ h.option }}</option>
                                    </select>
                                    <div class="midle"><i class="feather icon-minus"></i></div>
                                    <select name="end_time" v-model="ghost.end_time">
                                        <option v-for="(h, index) in tab_hours" :value="h.value" :key="index++">{{ h.option }}</option>
                                    </select>
                                  </div>
                                  <div class="select-line">
                                        <select name="jobsite_id" v-model="ghost.jobsite_id">
                                            <option value="">Select a job site</option>
                                            <option v-for="site in sites" :value="site.id" :key="site.id" @click="changeColor(site)">
                                                {{ site.name }}
                                            </option>
                                        </select>
                                        <div @click="openPalette()" class="label" :style="{background: colors}"></div>
                                        <twitter-picker v-model="colors" @input="updateValue" v-if="showPalette" />
                                  </div>

                                  <div class="mt-10 applies">
                                        <label for="apply">Apply to</label>
                                        <div class="days">
                                            <div 
                                                v-for="(d, index) in days" :key="index++"
                                                :class="['day', hasJour(d) ? 'active' : '']"
                                                @click="selectDay(d)"
                                            >{{ displayFirstLetter(d) }}</div>
                                        </div>
                                  </div>

                                  <div class="mt-20 form-group">
                                    <label for="notes">Shift Notes</label>
                                    <textarea placeholder="Leave a note for your employee, like the address of a job site, and they'll see it when they clock in." 
                                    name="description" v-model="ghost.notes" id="notes" cols="1" rows="2" class="form-control"></textarea>
                                  </div>

                                  <div class="mt-20 save-button pointer">
                                    <div class="mr-5 icon" @click="confirmDelete()">Delete</div>
                                    <div class="text" @click="save()">Edit</div>
                                 </div>
                                </div>
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
import Swal from 'sweetalert2'
import _ from 'lodash'

export default {
    props: {
        user: {
            type: Object,
            default: () => {},
        },
        shift: {
            type: Object,
            default: () => {},
        },
        sites: {
            type: Array,
            default: () => [],
        },
        businessId: {
            type: Number,
            default: 0,
        },
    },

    data: () => ({
        active: false,
        selectedColor: '',
        selectedColorName: '',
        day: '',
        colors: '#000000',
        showPalette: false,
        selected: [],
        selected_days: [],
        ghost: {
            notes: '',
            jobsite_id: '',
            end_time: '17:00',
            debut_time: '9:00',
            business_id: '',
            employees: '',
            days_of_week: '',
            days_of_calendar: ''
        },
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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

    watch: {
        ghost () {
            this.initUserAvailabilities()
        },

        shift: {
            immediate: true,
            handler: function (val) {
                if (!_.isEmpty(val)) {
                    this.ghost = Object.assign({}, val)
                    this.ghost.debut_time = this.displayHourValue(val.debut_time)
                    this.ghost.end_time = this.displayHourValue(val.end_time)
                    this.ghost.jobsite_id = val.job_site.id
                }
            }
        }
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
        window.eventBus.$on('shift-details', (result) => {
             if (!_.isEmpty(result)) {
                this.ghost = Object.assign({}, result)
                this.ghost.debut_time = this.displayHourValue(result.debut_time)
                this.ghost.end_time = this.displayHourValue(result.end_time)
                this.ghost.jobsite_id = result.job_site.id
                console.log('result', this.ghost)
             }
        })
    },

    methods: {
        selectDay (value) {
            let exist_day = this.selected.filter(d => d == value)
            /*if (exist_day.length>0) {
                this.selected = this.selected.filter(d => d !== value)
                this.ghost.days_week = this.selected
            }*/
            
            if (exist_day.length==0) {
                //this.selected.push(value)
                //this.ghost.days_week = this.selected
                this.$swal.error('Sorry', `"${this.displayName}" are not available on "${value}"`)
            }
        },

        changeColor (site) {
            this.colors = site.color_code
        },

        openPalette () {
            this.showPalette = !this.showPalette
        },

        updateValue (color) {
            console.log('updateValue', color)
            this.colors = color.hex
            this.openPalette()
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
            let elt = ''
            if (this.userAvailabilities) {
                this.userAvailabilities.forEach(u => {
                    this.selected.push(u.day_cut)
                    elt = this.displayFormatedDate(u.day_cut)
                    this.selected_days.push(elt)
                })
            }
            this.ghost.days_of_week = this.selected
        },

        resetGhost () {
            this.ghost = {
                notes: '',
                jobsite_id: '',
                end_time: '17:00',
                debut_time: '9:00',
                business_id: '',
                employees: '',
                days_of_week: '',
                days: ''
            }
        },

        setColor (site) {
            this.selectedColor = site.color_code
            this.selectedColorName = site.name
            this.active = false
            this.ghost.jobsite_id = site.id
        },

        toggleDropdown () {
            this.active = !this.active
        },

        async save () {
            this.startLoading()
            this.ghost.days_of_calendar = this.selected_days
            this.ghost.business_id = this.businessId
            this.ghost.employees = [this.user.id]
            this.ghost.days_of_week = this.selected
            console.log(this.ghost)

            const response = await this.$api.put(`/timesheet-api/shifts/${this.ghost.id}/`, this.ghost)
            .catch(error => {
                console.log('error', error.response.data)
                this.stopLoading()
            })
            if (response) {
                this.stopLoading()
                this.$swal.success('Confirmation', 'Shift edited successfuly')
                this.$emit('shiftAdded')
                this.closeAllModals()
                this.selected_days = []
                this.selected = []
            }
        },

        confirmDelete () {
             Swal.fire({
                 // title: this.$translate.text('Are you sure ?'),
                 text: this.$translate.text("Are you sure you want to delete the selected shift ?"),
                 type: 'warning',
                 showCancelButton: true,
                 cancelButtonText: this.$translate.text('Cancel'),
                 confirmButtonColor: '#890000',
                 cancelButtonColor: '#000000',
                 confirmButtonText: this.$translate.text('Yes, delete!')
             }).then((result) => {
                 if (result.value) {
                    this.closeModal('showShiftDetailsModal')
                     this.deleteShift()
                 }
             })
         },

        async deleteShift () {
            this.startLoading()

            const response = await this.$api.delete(`/timesheet-api/shifts/${this.ghost.id}/`)
            .catch(error => {
                console.log('error', error.response.data)
                this.stopLoading()
            })
            if (response) {
                this.stopLoading()
                this.$swal.success('Confirmation', 'Shift deleted successfuly')
                this.$emit('shiftAdded')
                this.closeAllModals()
                this.selected_days = []
                this.selected = []
            }
        },
    }
}
</script>
