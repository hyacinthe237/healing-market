<template lang="html">
    <main-modal 
        :id="'selectTimeModal'"
        :title="'Select date and time'"
    >
        <div class="main-container">
             <div class="select-date">
                <vue-datepicker
                    v-model="ghost.date"
                    :inline="true"
                ></vue-datepicker>
             </div>
             <div class="content" v-show="showTime">
                <h4>Select a time</h4>
                <div class="times mt-10">
                    <div 
                        :class="['time', ghost.start_time == time ? 'selected' : '']"
                        v-for="(time, index) in tab_times"
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
        showTime: false,
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
                        this.tab_times.push(i + ':00')
                    }
                    this.showTime = true
                }
                if (!filter) {
                    this.resetGhost()
                    this.$swal.error('Sorry', `The practitioner is not available on the selected day. The practitioner are available on ${available}`)
                }
            }
       },
    },

    computed: {
        availibilities () {
            return this.therapist.availibilities || []
        }
    },

    methods: {
        selectedTime (time) {
            this.ghost.start_time = time
        },

        selected () {
            this.ghost.offer = this.offer.id
            this.ghost.booker = this.clientId
            this.ghost.therapist = this.therapistId
            delete this.ghost.date
            this.$emit('continue', this.ghost)
            this.resetGhost()
            setTimeout(() => {
                $('#selectTimeModal').modal('hide')
            }, 150)
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
