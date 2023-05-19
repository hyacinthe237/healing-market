<template lang="html">
    <main-modal 
        :id="'selectTimeModal'"
        :title="'Select date and time'"
    >
        <div class="main-container" v-show="!isLoading">
             <div class="select-date">
                <vue-datepicker
                    v-model="ghost.date"
                    :inline="true"
                    :highlighted="highlightedDays"
                    :disabled-dates="disablePastDates"
                ></vue-datepicker>
             </div>
             <div class="content" v-show="showTime">
                <h4>Select a time</h4>
                <div class="times mt-10">
                    <div 
                        :class="['time', ghost.start_time == time ? 'selected' : '']"
                        v-for="(time, index) in start_times"
                        :key="index++"
                        @click="selectedTime(time)"
                    >{{ time | amPm }}</div>
                </div>
                <div class="buttons mt-20">                    
                    <button class="btn btn-outline-primary" @click="resetGhost()">Cancel</button>
                    <button class="btn btn-primary" @click="selected()">Continue</button>
                </div>
             </div>
        </div>
        <div class="_loader" v-show="isLoading">
            <Spinners></Spinners>
        </div>
    </main-modal>
</template>

<script>
import moment from 'moment'
export default {
    name: 'SelectTimeModal',

    props: {
        therapist: { type: Object, default: () => {} },
        offer: { type: Object, default: () => {} },
        clientId: { type: Number, default: 1 },
        therapistId: { type: Number, default: 1 },
    },

    data: () => ({
        ghost: {
            offer: '',
            booker: '',
            therapist: '',
            start_date: '',
            start_time: '',
            date: ''
        },
        tab_times: [],
        highlightedDays: {
            days: [],
            dates: [],
            custom: ''
        },
        disablePastDates: {
            dates: [],
            days: [],
            ranges: []
        },
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        showTime: false,
        startOfMonth: moment().startOf('month').format('YYYY-MM-DD'),
        endOfMonth: moment().endOf('month').format('YYYY-MM-DD'),
        today: moment().format('YYYY-MM-DD'),
        currentTime: moment().format('HH')
    }),

    watch: {
       'ghost.date' (val) {
            if (val) {
                this.tab_times = new Array()
                let day = moment(val).format('dddd')
                this.ghost.start_date = moment(val).format('YYYY-MM-DD')
                let filter = this.availibilities.filter(a => a.day_cut == day)[0]
                let available = this.availibilities.map(a => a.day_cut)
                if (filter) {
                    let start = filter.time_cut_start.split(':')
                    let end = filter.time_cut_end.split(':')
                    for(var i=start[0]; i<=end[0]; i++) {
                        if (i>this.currentTime && i<=end[0]) {
                            this.tab_times.push(i + ':00')
                        }                        
                    }
                    this.showTime = true
                }

                if (!filter) {
                    this.resetGhost()
                    this.$swal.error('Warning', `The practitioner are only available on ${available}`)
                }

            }
       },
    },

    mounted () {
        window.eventBus.$on('therapist', (data) => {
            if (data) {
                let tab = data.availibilities.map(a => a.day_cut)
                for (var i = 0; i < tab.length; i++) {
                    var index = this.days.indexOf(tab[i]);
                    tab[i] = index;
                }

                for (var j = 0; j < this.days.length; j++) {
                    var ind = this.days.indexOf(this.days[j]);
                    this.days[j] = ind;
                }

                for (var k = 0; k < tab.length; k++) {
                    var inde = this.days.indexOf(tab[k]);
                    if (inde > -1) {
                        this.days = this.days.filter(d => d != inde)
                    }
                }

                this.highlightedDays.days = tab
                this.highlightedDays.dates.push(new Date())            
                this.disablePastDates.dates = this.start_dates
                this.disablePastDates.days = this.days

                if (moment(this.today).isAfter(this.startOfMonth)) {
                    let yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
                    let dt = { from: new Date(this.startOfMonth), to: new Date(yesterday) }
                    this.disablePastDates.ranges.push(dt)
                }
            }
        })
    },

    computed: {
        availibilities () {
            return this.therapist.availibilities || []
        },

        bookings () {
            return this.therapist.bookings || []
        },

        start_dates () {
            let tab = this.bookings.map(d => d.start_date)
            for(var i=0; i<tab.length; i++) {
                tab[i] = new Date(tab[i])
            }
            return tab
        },

        start_times () {
            let tab = this.bookings.map(d => d.start_time)
            const uniqueArr = [...new Set(tab)]            
            for(var i=0; i<uniqueArr.length; i++) {
                let end = uniqueArr[i].split(':')
                uniqueArr[i] = end[0] + ':00'
            }

            let arr = [...uniqueArr, ...this.tab_times]
            const uniqueTab = [...new Set(arr)]
            return uniqueTab
        },
    },

    methods: {
        selectedTime (time) {
            this.ghost.start_time = time
        },

        disableDates (date) {
            const today = new Date()
            return date < today
        },

        async selected () {
            this.ghost.offer = this.offer.id
            this.ghost.booker = this.clientId
            this.ghost.therapist = this.therapistId
            delete this.ghost.date

            this.startLoading()
    
            const res = await this.$api.post(`/booking-api/bookings/`, this.ghost)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })

            if (res) {
            this.stopLoading()
            localStorage.setItem('booking', JSON.stringify(res.data))
            this.getBookingClientKey({payment_method: 'stripe'})
            }
        },

        async getBookingClientKey (data) {
            this.startLoading()
            let booking = JSON.parse(localStorage.getItem('booking'))
            const res = await this.$api.post(`/booking-api/bookings/${booking.id}/pay`, data)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.detail)
            })
    
            if (res) {
              this.stopLoading()
              this.stripe = res.data
              this.$emit('continue', booking)
                this.resetGhost()
                setTimeout(() => {
                    $('#selectTimeModal').modal('hide')
                }, 150)
            }
        },

        gotoForgot () {
            this.closeAllModals()
            this.n('password-forgot')
        },

        resetGhost () {
            this.ghost = {
                offer: this.offer.id,
                booker: this.clientId,
                therapist: this.therapistId,
                start_date: '',
                date: '',
                start_time: ''
            }
            this.showTime = false
            this.tab_times = new Array()
        }
    }
}
</script>
