<template lang="html">
    <main-modal 
        :id="'addAvailabilityModal'"
        :title="'Which day(s) are you available ?'"
    >
        <div class="">
            <form class="_form" @submit.prevent="save()" v-show="!isLoading">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="form-group">
                            <label for="day_cut">Select a day</label>
                            <select name="day_cut" id="day" class="form-control-modal" v-model="line.day_cut">
                                <option value="">Select a day</option>
                                <option v-for="(day, index) in days" :value="day" :key="index++">{{ day }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label for="max_people">Max people</label>
                            <input type="number" name="max_people" v-model="line.max_people" class="form-control-modal">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="time_cut_start">Select start time</label>
                            <select name="time_cut_start" v-model="line.time_cut_start" class="form-control-modal">
                                <option v-for="(h, index) in tab_hours" :value="h.value" :key="index++">{{ h.option }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="time_cut_end">Select end time</label>
                            <select name="time_cut_end" v-model="line.time_cut_end" class="form-control-modal">
                                <option v-for="(h, index) in tab_hours" :value="h.value" :key="index++">{{ h.option }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="mt-20 text-right">
                    <button type="submit" class="btn btn-secondary uppercase">Save</button>
                </div>
              </form>
              <div class="a-lists">

              </div>
                <div class="_loader" v-show="isLoading">
                    <Spinners></Spinners>
                </div>
        </div>
    </main-modal>
</template>

<script>

export default {
    name: 'AddAvailability',
    props: {
        therapistId: { type: Number, default: 1 },
    },

    data: () => ({
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        items: [],
        line: {
            therapist: '',
            day_cut: '',
            max_people: 1,
            time_cut_start: '9:00',
            time_cut_end: '17:00',
        },
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
                therapist: '',
                day_cut: '',
                max_people: 1,
                time_cut_start: '9:00',
                time_cut_end: '17:00',
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
            this.line.therapist = this.therapistId

            const response = await this.$api.post('/booking-api/availibilities/', this.line)
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
