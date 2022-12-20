//import _ from 'lodash'

export default {
    data: () => ({
        user_actions: [],
        more_actions: false,
        showGroup: false,
        isSelected: '',
        resetHost: {
            password: '',
            confirm_password: ''
        },
        genders: ['Other', 'Female', 'Male'],
        periods: ['/hour', '/month', '/year'],
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
