<template lang="html">
    <div class="month">
        <i class="feather icon-chevron-left pointer" @click="previous()"></i>
        <span>{{ toDayMonth }}</span>                            
        <i class="feather icon-chevron-right pointer" @click="next()"></i>
    </div>
</template>

<script>
import config from '@/services/config'
import moment from 'moment'
export default {
    name: 'MonthCarousel',

    props: {},

    data: () => ({
        currentMonth: moment().month()
    }),

    computed: {
        user () {
            return JSON.parse(localStorage.getItem(config.get('user')))
        },

        isConnected () {
            return !_.isEmpty(this.user)
        },

        toDayMonth () {
            return this.months_array[this.currentMonth]
        }
    },

    methods: {
        previous () {
            if(this.currentMonth>0) {
                this.currentMonth -= 1
                this.$emit('searchMonth', this.currentMonth)
            }
        },

        next () {
            if(this.currentMonth<11) {
                this.currentMonth += 1
                this.$emit('searchMonth', this.currentMonth)
            }
        },
    }
}
</script>

