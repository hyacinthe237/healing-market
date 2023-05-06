<template lang="html">
    <main-modal 
        :id="'selectTimeModal'"
        :title="'Select time'"
    >
        <div class="main-container">
             <div class="select-date">
                <VueDatePicker
                    v-model="ghost.date"
                    format="YYYY-MM-DD"
                    inline
                />
             </div>
             <div class="content">
                <div class="times" v-show="ghost.date != ''">
                    <div
                        class="time" 
                        v-for="(time, index) in times" 
                        :key="index++" 
                        @click="selectTime(time)"
                    >
                        {{ time }}
                    </div>
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
export default {
    name: 'SelectTimeModal',

    data: () => ({
        ghost: {
            date: '',
            time: ''
        },
        times: ['9:00 am', '10:00 am', '11:00 am', '12:00 am', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm'],
    }),

    mounted () {
       
    },

    methods: {
        selectTime (time) {
            this.ghost.time = time
        },

        selected () {
            this.$emit('continue', this.ghost)
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
                date: '',
                time: ''
            }
        }
    }
}
</script>
