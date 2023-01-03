<template lang="html">
    <div class="_add-schedule-modal modal animated fadeIn" id="addAvailabilityModal">
        <div class="modal-dialog" role="document" v-show="!isLoading">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Which day(s) are you available ?</h5>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="_modal-content">
                      <form class="_form">
                        <div class="form-group" v-if="days.length>0">
                            <select name="day" id="day" class="form-control" v-model="line.day">
                                <option value="">Select a day</option>
                                <option v-for="(day, index) in days" :value="day" :key="index++">{{ day }}</option>
                            </select>
                        </div>
                        <div class="form-group" v-if="days.length>0">
                            <div class="row">
                                <div class="col-5">
                                    <select name="start_time" v-model="line.start_time" class="form-control">
                                        <option value="">Select start time</option>
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
                                <div class="col-5">
                                    <select name="end_time" v-model="line.end_time" class="form-control">
                                        <option value="">Select start time</option>
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
                                <div class="col-2">
                                    <div class="save-button pointer" @click="add()">
                                        <div class="text"><i class="feather icon-plus"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="abanda-list mt-20" v-if="items.length>0">
                            <div class="abanda-head">
                                <div class="ht-p">Day</div>
                                <div class="ht-p">Start time</div>
                                <div class="ht-p">End time</div>
                                <div class="ht-p">Actions</div>
                            </div>
        
                            <div class="m-body">
                                <div class="m-box">
                                  <div
                                      class="client-box"
                                      v-for="d in items"
                                      :key="d.day"
                                  >
                                      <div class="elt-p">{{ d.day }}</div>
                                      <div class="elt-p">{{ d.start_time }}</div>
                                      <div class="elt-p">{{ d.end_time }}</div>
                                      <div class="elt-p btns pointer">
                                          <i class="feather icon-x" @click="del(d)"></i>
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <div class="save-button mt-20 pointer" @click="boucleDispo()" v-if="items.length>0">
                            <div class="text">Save</div>
                            <div class="icon"><i class="feather icon-save"></i></div>
                        </div>
                      </form>
                </div>
            </div>
        </div>

        <div class="_loader" v-show="isLoading">
            <Spinners></Spinners>
          </div>
    </div>
</template>

<script>

export default {

    props: {
        user: {
            type: Object,
            default: () => {},
        },
    },

    data: () => ({
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        items: [],
        line: {
            day: '',
            start_time: '9:00am',
            end_time: '5:00pm',
        },
    }),

    computed: {
        canAdd () { return this.line.day !== '' && this.line.start_time !== '' && this.line.end_time !== '' }
    },

    mounted () {
        window.eventBus.$on('add-availability', (result) => {
             if (result !== '') {
                this.resetGhost()
                this.items = []
             }
        })
    },

    methods: {
        close () {
            this.resetGhost()
            this.items = []
            window.$('.modal').modal('hide')
        },

        resetGhost () {
            this.line = {
                day: '',
                start_time: '9:00am',
                end_time: '5:00pm',
            }
        },

        boucleDispo () {
            for (let index = 0; index < this.items.length; index++) {
                const element = this.items[index]
                element.day_cut = element.day
                element.time_cut = element.start_time + ' - ' + element.end_time
                this.items = this.items.filter(p=>p.day != element.day)
                delete element.day
                delete element.start_time
                delete element.end_time
                this.save(element)
            }
        },

        async save (object) {
            this.startLoading()
            object.employee = this.user.id

            const response = await this.$api.post('/timesheet-api/availibilities/', object)
            .catch(error => {
                console.log('error', error.response.data)
                this.stopLoading()
            })
            if (response) {
                this.stopLoading()
                this.$swal.success('Confirmation', 'Availibilities added successfuly')
                this.$emit('added')
            }
        },

        add () {
            if (this.line.day !== '' && this.line.start_time !== '' && this.line.end_time !== '') {
                let obj = Object.assign({}, this.line)

                this.days = this.days.filter(d => d != obj.day)
                this.items.push(obj)
                this.resetGhost()
            } else {
                this.$swal.error('Sorry', 'Please select empty inputs')
            }
        },

        del (elt) {
            this.items = this.items.filter(p=>p.day != elt.day)
            this.days.push(elt.day)
            this.resetGhost()
        },
    }
}
</script>
