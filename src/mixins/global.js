import moment from 'moment'
import _ from 'lodash'

export default {
    data: () => ({
        ghost: {},
        intervalIndex: null,
        isLoading: false,
        isOffline: false,
        showErrors: true,
        breadcrumb: [],
        keywords: ''
    }),

    created () {
        this.$on('online', () => { this.isOffline = false })
        this.$on('offline', () => { this.isOffline = true })
        this.makeBreadcrumb()
    },

    methods: {
        async validateForm () {
            const isValid = await this.$validator.validate()

            if (!isValid) {
                const firstError = this.$validator.errors.items[0].msg

                if (firstError) {
                    this.$swal.error(firstError)
                }

                return false
            }

            return true
        },

        startLoading () {
            this.isLoading = true
        },

        stopLoading () {
            this.isLoading = false
        },

        initBreadcrumb () {
            this.breadcrumb = []
        },

        closeAllModals () {
            window.$('.modal').modal('hide')
        },

        closeModal (id) {
            if (!id) {
                return this.closeAllModals()
            }
            window.$('#' + id).modal('hide')
        },

        openModal (params) {
            setTimeout(() => {
                window.$('#' + params.id).modal('show')
            }, params.timeout ? params.timeout : 100)
        },

        truncateString (str, num) {
            // If the length of str is less than or equal to num
            // just return str--don't truncate it.
            if (str.length <= num) {
              return str
            }
            // Return str truncated with '...' concatenated to the end of str.
            return str.slice(0, num) + '...'
        },

        /*
        ** Object params { name, params }
        ** navigate est plus fexible parce qon peut y passer plusieurs parametres
        */
        navigate (params) {
            this.$router.push(params)
        },

        /*
        * Navigate to route by name
        *
        * @params String name
        * @return void
        */
        n (name) {
            this.$router.push({ name }) // equivaut a { name: name}
        },

        /*
        * Navigate to route by name
        *
        * @params String name
        * @return void
        */
        r (name) {
            this.$router.replace({ name }) // equivaut a { name: name}
        },

        /**
         * Navigate one step back
         *
         * @return void
         */
        goBack () {
            this.$router.go(-1)
        },

        /**
         * Navigate one step in front
         *
         * @return void
         */
        goForward () {
            this.$router.go(1)
        },

        /**
         * Make view breadcrumb
         *
         * @return void
         */
        makeBreadcrumb () {
            this.breadcrumb = []
        },

        /**
         * Enlever tous les caractères sauf
         * les lettres minuscules et les chiffres
         *
         * @return void
         */
        regexp (text) {
            return text.replace(new RegExp("[^(a-z0-9)]", "g"), '')
        },

        precise (nb) {
            let num = Number.parseFloat(nb)
            let size = ''
            if (num >= 1000) {
                let d = num/1000
                size = d.toFixed(2) + ' GB'
            } else { size = num.toFixed(2) + ' MB' }

            return size
        },

        sans_tirets (string) {
            return string.split('-').join('');
        },

        /*Remove duplicates Items in Array*/
        removeDuplicates (data) {
            return data.filter((value, index) => data.indexOf(value) === index)
        },

        addTokenBeforeOpen (url, token) {
            let request = new XMLHttpRequest()

            request.open('GET', url)
            request.setRequestHeader('Authorization', 'Token ' + token)
        },

        displayLanguage (lang) {
            let str = ''
            if (lang == 'fr') {
                str = 'French'
            } else if (lang == 'en') {
                str = 'English'
            } else if (lang == 'de') {
                str = 'Germany'
            } else if (lang == 'es') {
                str = 'Spanish'
            } else if (lang == 'pt') {
                str = 'Portuguese'
            }

            return str
        },

        makeLang (lang) {
            let str = ''
            if (lang == 'fr') {
                str = 'fr-FR'
            } else if (lang == 'en') {
                str = 'en-EN'
            } else if (lang == 'de') {
                str = 'de-DE'
            } else if (lang == 'es') {
                str = 'es-ES'
            } else {
                str = 'pt-PT'
            }

            return str
        },

        /**
         * afficher la date en fonction du jour de visite
         *
         * @param  {string} jourDeVisite
         */
        displayDate (jourDeVisite) {
            let day = moment().format('dddd')
            let today = moment().format('YYYY-MM-DD')
            let dt = moment()
            let tab_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            let day_l =  day.toLowerCase()
            let nb_jdv = tab_days.indexOf(jourDeVisite)+1
            let nb_l = tab_days.indexOf(day_l)+1

            // si le jourDeVisite égal au jour courant
            if (nb_jdv == nb_l) {
                dt = today
            }

            if (nb_jdv < nb_l) {
                let s = nb_l - nb_jdv
                dt = moment().subtract(s, "days")
            }

            if (nb_jdv > nb_l) {
                let s = nb_jdv - nb_l
                dt = moment().add(s, "days")
            }

            return moment(dt).format('DD')
        },

        displayFullDate (jourDeVisite) {
            let day = moment().format('dddd')
            let today = moment().format('YYYY-MM-DD')
            let dt = moment()
            let tab_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            let day_l =  day.toLowerCase()
            let nb_jdv = tab_days.indexOf(jourDeVisite)+1
            let nb_l = tab_days.indexOf(day_l)+1

            // si le jourDeVisite égal au jour courant
            if (nb_jdv == nb_l) {
                dt = today
            }

            if (nb_jdv < nb_l) {
                let s = nb_l - nb_jdv
                dt = moment().subtract(s, "days")
            }

            if (nb_jdv > nb_l) {
                let s = nb_jdv - nb_l
                dt = moment().add(s, "days")
            }

            return moment(dt).format('YYYY-MM-DD')
        },
        displayDateFromDay (jourDeVisite) {
            let day = moment().format('dddd')
            let today = moment().format('YYYY-MM-DD')
            let dt = moment()
            let tab_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            let day_l =  day.toLowerCase()
            let nb_jdv = tab_days.indexOf(jourDeVisite)+1
            let nb_l = tab_days.indexOf(day_l)+1

            // si le jourDeVisite égal au jour courant
            if (nb_jdv == nb_l) {
                dt = today
            }

            if (nb_jdv < nb_l) {
                let s = nb_l - nb_jdv
                dt = moment().subtract(s, "days")
            }

            if (nb_jdv > nb_l) {
                let s = nb_jdv - nb_l
                dt = moment().add(s, "days")
            }

            return moment(dt).format('MMM DD')
        },

        displayFormatedDate (jourDeVisite) {
            let day = moment().format('dddd')
            let today = moment().format('YYYY-MM-DD')
            let dt = moment()
            let tab_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            let day_l =  day.toLowerCase()
            let nb_jdv = tab_days.indexOf(jourDeVisite.toLowerCase())+1
            let nb_l = tab_days.indexOf(day_l)+1

            // si le jourDeVisite égal au jour courant
            if (nb_jdv == nb_l) {
                dt = today
            }

            if (nb_jdv < nb_l) {
                let s = nb_l - nb_jdv
                dt = moment().subtract(s, "days")
            }

            if (nb_jdv > nb_l) {
                let s = nb_jdv - nb_l
                dt = moment().add(s, "days")
            }

            return moment(dt).format('YYYY-MM-DD')
        },

        displayHourValue (hour) {
            let selected_item = {}
            let tab_hours =[
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
            
            if (!_.isEmpty(hour)) {
                selected_item = tab_hours.filter(h => h.option.toLowerCase() == hour)
                console.log('selected item', selected_item)
                console.log('hour', hour)
                return selected_item.value
            }

            if (_.isEmpty(hour)) {
                return '9:00'
            }
        }
    }
}
