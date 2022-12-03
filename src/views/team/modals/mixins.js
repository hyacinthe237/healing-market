//import _ from 'lodash'

export default {
    data: () => ({
        user_actions: [],
        more_actions: false,
        showGroup: false,
        resetHost: {
            password: '',
            confirm_password: ''
        },
        genders: ['Other', 'Female', 'Male']
    }),

    computed: {
        auth () {
            return JSON.parse(localStorage.getItem('user'))
        },

        account () {
            return this.auth.account
        },
    },
}
