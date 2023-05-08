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
                    <vue-datepicker
                        v-model="ghost.time"
                        :inline="true"
                        :time-picker-options="timeOptions"
                        :type="'time'"
                        :format="'hh:mm'"
                        :placeholder="'Select hour'"
                    ></vue-datepicker>
                </div>
                <div class="buttons mt-20">
                    <button class="btn btn-primary" @click="selected()">Continue</button>
                    <button class="btn btn-outline-primary" @click="resetGhost()">Cancel</button>
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
            date: '',
            time: ''
        },
        showTime: false,
        timeOptions: {
            start: '00:00', 
            step:'00:59' , 
            end: '23:30', 
            format: 'HH:mm'
        }
    }),

    watch: {
       'ghost.date' (val) {
            if (val) {
                let day = moment(val).format('dddd')
                this.ghost.start_date = moment(val).format('YYYY-MM-DD')
                let filter = this.availibilities.filter(a => a.day_cut == day)[0]
                let available = this.availibilities.map(a => a.day_cut)
                if (filter) {
                    this.timeOptions = {
                        start: filter.time_cut_start, 
                        step:'01:00' , 
                        end: filter.time_cut_end, 
                        format: 'HH:mm'
                    }
                    this.showTime = true
                }
                if (!filter) {
                    this.resetGhost()
                    this.$swal.error('Sorry', `The practitioner is not available on the selected day. The practitioner are available on ${available}`)
                }
            }
       },
       'ghost.time' (val) {
            if (val) {
                this.ghost.start_time = moment(val).format('HH:mm')
            }
       },
    },

    computed: {
        availibilities () {
            return this.therapist.availibilities || []
        }
    },

    methods: {
        selectTime (time) {
            this.ghost.start_time = time
        },

        selected () {
            this.ghost.offer = this.offer.id
            this.ghost.booker = this.clientId
            this.ghost.therapist = this.therapistId
            delete this.ghost.date
            delete this.ghost.time
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
                start_time: ''
            }
            this.showTime = false
        }
    }
}
</script>
