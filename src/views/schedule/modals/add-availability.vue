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
                        <div class="form-group">
                            <select name="day_cut" id="day" class="form-control" v-model="line.day_cut">
                                <option value="">Select a day</option>
                                <option v-for="(day, index) in days" :value="day" :key="index++">{{ day }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-6">
                                    <select name="time_cut_start" v-model="line.time_cut_start" class="form-control">
                                        <option v-for="(h, index) in tab_hours" :value="h.value" :key="index++">{{ h.option }}</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <select name="time_cut_end" v-model="line.time_cut_end" class="form-control">
                                        <option v-for="(h, index) in tab_hours" :value="h.value" :key="index++">{{ h.option }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="save-button mt-20 pointer" @click="save()">
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
            day_cut: '',
            time_cut_start: '9h00',
            time_cut_end: '17h00',
        },
        tab_hours: [
        {value: "1h00", option: "1:00 AM"}, {value: "1h15", option: "1:15 AM"}, {value: "1h30", option: "1:30 AM"}, {value: "1h45", option: "1:45 AM"},
        {value: "2h00", option: "2:00 AM"}, {value: "2h15", option: "2:15 AM"}, {value: "2h30", option: "2:30 AM"}, {value: "2h45", option: "2:45 AM"},
        {value: "3h00", option: "3:00 AM"}, {value: "3h15", option: "3:15 AM"}, {value: "3h30", option: "3:30 AM"}, {value: "3h45", option: "3:45 AM"},
        {value: "4h00", option: "4:00 AM"}, {value: "4h15", option: "4:15 AM"}, {value: "4h30", option: "4:30 AM"}, {value: "4:45am", option: "4:45 AM"},
        {value: "5h00", option: "5:00 AM"}, {value: "5h15", option: "5:15 AM"}, {value: "5h30", option: "5:30 AM"}, {value: "5h45", option: "5:45 AM"},
        {value: "6h00", option: "6:00 AM"}, {value: "6h15", option: "6:15 AM"}, {value: "6h30", option: "6:30 AM"}, {value: "6h45", option: "6:45 AM"},
        {value: "7h00", option: "7:00 AM"}, {value: "7h15", option: "7:15 AM"}, {value: "7h30", option: "7:30 AM"}, {value: "7h45", option: "7:45 AM"},
        {value: "8h00", option: "8:00 AM"}, {value: "8h15", option: "8:15 AM"}, {value: "8h30", option: "8:30 AM"}, {value: "8h45", option: "8:45 AM"},
        {value: "9h00", option: "9:00 AM"}, {value: "9h15", option: "9:15 AM"}, {value: "9h30", option: "9:30 AM"}, {value: "9h45", option: "9:45 AM"},
        {value: "10h00", option: "10:00 AM"}, {value: "10h15", option: "10:15 AM"}, {value: "10h30", option: "10:30 AM"}, {value: "10h45", option: "10:45 AM"},
        {value: "11h00", option: "11:00 AM"}, {value: "11h15", option: "11:15 AM"}, {value: "11h30", option: "11:30 AM"}, {value: "11h45", option: "11:45 AM"},
        {value: "12h00", option: "12:00 AM"}, {value: "12h15", option: "12:15 AM"}, {value: "12h30", option: "12:30 AM"}, {value: "12h45", option: "12:45 AM"},
        {value: "13h00", option: "1:00 PM"}, {value: "13h15", option: "1:15 PM"}, {value: "13h30", option: "1:30 PM"}, {value: "13h45", option: "1:45 PM"},
        {value: "14h00", option: "2:00 PM"}, {value: "14h15", option: "2:15 PM"}, {value: "14h30", option: "2:30 PM"}, {value: "14h45", option: "2:45 PM"},
        {value: "15h00", option: "3:00 PM"}, {value: "15h15", option: "3:15 PM"}, {value: "15h30", option: "3:30 PM"}, {value: "15h45", option: "3:45 PM"},
        {value: "16h00", option: "4:00 PM"}, {value: "16h15", option: "4:15 PM"}, {value: "16h30", option: "4:30 PM"}, {value: "16h45", option: "4:45 PM"},
        {value: "17h00", option: "5:00 PM"}, {value: "17h15", option: "5:15 PM"}, {value: "17h30", option: "5:30 PM"}, {value: "17h45", option: "5:45 PM"},
        {value: "18h00", option: "6:00 PM"}, {value: "18h15", option: "6:15 PM"}, {value: "18h30", option: "6:30 PM"}, {value: "18h45", option: "6:45 PM"},
        {value: "19h00", option: "7:00 PM"}, {value: "19h15", option: "7:15 PM"}, {value: "19h30", option: "7:30 PM"}, {value: "19h45", option: "7:45 PM"},
        {value: "20h00", option: "8:00 PM"}, {value: "82015", option: "8:15 PM"}, {value: "8h200", option: "8:30 PM"}, {value: "8h420", option: "8:45 PM"},
        {value: "21h00", option: "9:00 PM"}, {value: "21h15", option: "9:15 PM"}, {value: "21h30", option: "9:30 PM"}, {value: "21h45", option: "9:45 PM"},
        {value: "22h00", option: "10:00 PM"}, {value: "22h15", option: "10:15 PM"}, {value: "22h30", option: "10:30 PM"}, {value: "22h45", option: "10:45 PM"},
        {value: "23h00", option: "11:00 PM"}, {value: "23h15", option: "11:15 PM"}, {value: "23h30", option: "11:30 PM"}, {value: "23h45", option: "11:45 PM"},
        {value: "00h00", option: "12:00 PM"}, {value: "00h15", option: "12:15 PM"}, {value: "00h30", option: "12:30 PM"}, {value: "00h45", option: "12:45 PM"}]
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
                day_cut: '',
                time_cut_start: '9h00',
                time_cut_end: '17h00',
            }
        },

        boucleDispo () {
            for (let index = 0; index < this.items.length; index++) {
                const element = this.items[index]
                element.day_cut = element.day
                element.time_cut_start = element.start_time
                element.time_cut_end = element.end_time
                this.items = this.items.filter(p=>p.day != element.day)
                delete element.day
                delete element.start_time
                delete element.end_time
                this.save(element)
            }
        },

        async save () {
            this.startLoading()
            this.line.employee = this.user.id

            const response = await this.$api.post('/timesheet-api/availibilities/', this.line)
            .catch(error => {
                console.log('error', error.response.data.error_message)
                this.$swal.error('Warning', error.response.data.error_message)
                this.stopLoading()
            })
            if (response) {
                this.stopLoading()
                this.$swal.success('Confirmation', 'Availibilities added successfuly')
                this.$emit('added')
                this.closeAllModals()
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
