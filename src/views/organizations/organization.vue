<template lang="html">
    <div class="">
        <section class="dashboard" v-show="!isLoading">

        </section>

        <div v-show="isLoading" class="mt-40 pb-40 text-center">
            <izy-hollow-loading loading />
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import _ from 'lodash'

export default {
    components: { },

    data: () => ({
        ghost: {},
        filteredOrganizations: [],
        languages: [],
        language: '',
        tableau: [],
        type_preview: '',
        subscription: {},
        setting: {},
    }),

    watch: { },

    computed: { },

    mounted () {
        this.makeLanguages()
    },

    methods: {
        makeLanguages () {
            this.languages = [
                { name: 'French', value: 'fr' },
                { name: 'English', value: 'en' },
                { name: 'Germany', value: 'de' },
                { name: 'Spanish', value: 'es' },
                { name: 'Portuguese', value: 'pt' },
            ]
        },

        async getOrganization () {
            this.startLoading()
            const response = await this.$api.get(`api/admin/organisations/${this.org_id}/update`)
                .catch(error => console.log(error))
            this.stopLoading()

            if (response) {
                this.$store.commit('organizations/SET_ORGANIZATION', response.data)
            }
        },

        selectedLanguage (lang) {
            let str = ''
            if (lang === "fr") str = 'French'
            if (lang === "en") str = 'English'
            if (lang === "ge" || lang === 'de') str = 'Germany'
            if (lang === "sp" || lang === 'es') str = 'Spanish'
            if (lang === "pt") str = 'Portuguese'

            if (str != '') {
                this.language = str
            }
        },

        async getDashboard () {
            this.startLoading()
            let payload = {
                "organisation": this.routeParams
            }
            const response = await this.$api.get(`api/organisation/statistics`, { params: payload })
                .catch(error => console.log(error))
            this.stopLoading()

            if (response) {
                this.$store.commit('organizations/SET_DASHBOARD', response.data)
                this.selectedLanguage(response.data.language)
            }
        },

        confirm () {
            Swal.fire({
                title: this.$translate.text('Are you sure ?'),
                text: this.$translate.text("You won't be able to revert this!"),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: this.$translate.text('Yes, delete it!')
            }).then((result) => {
                if (result.value) {
                    this.deleteOrg()
                } else {
                    this.closeAllModals()
                }
            })
        },
    }
}
</script>
