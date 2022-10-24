<template lang="html">
    <div class="">
        <section class="_header">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="buttons text-right">
                            <button
                                :disabled="isLoading"
                                @click.prevent="navigate({ name: 'advanced-search' })"
                                class="btn btn-grey mr-2"
                            >
                                <i class="feather icon-search"></i> {{ t('Advanced Search') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="home-page">
            <div class="home-container">
                <div class="logo" v-show="!isLoading">
                    <span>Izy</span>Search
                    <div class="slogan">
                        {{ t('Easy access to your documents') }}
                    </div>
                </div>
                <form class="_form mt-20" @submit.prevent="search()" v-show="!isLoading">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="feather icon-search"></i></span>
                        </div>
                        <input
                            type="text"
                            class="search-query form-control form-control-lg"
                            id="query"
                            name="query"
                            v-model="ghost.query"
                            :placeholder="t('Search')"
                        >
                        <div class="input-group-append pointer" @click="openVocalSearch()">
                            <span class="input-group-text"><i class="feather icon-mic"></i></span>
                        </div>
                    </div>
                </form>

                <div v-show="isLoading" class="mt-40 pb-40 text-center">
                    <izy-hollow-loading loading />
                </div>
                <div class="buttons text-center mt-40" v-show="!isLoading">
                    <button class="btn btn-primary" :disabled="isLoading" @click="search()">{{ t('Search') }}</button>
                </div>
            </div>
        </section>

        <VocalSearchModal @speechend="speechEnd" :text="'Bonjour'" :lang="lang"></VocalSearchModal>

        <div class="_main-footer toggled" id="footer">
            IzySearch : {{ t('Don\'t waste your time anymore, we do the job')}}
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import AuthService from '@/services/auth'
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        payload: {}
    }),

    computed: {
        auth () {
            return AuthService.getUser()
        },

        account () {
            return this.auth.account
        },

        isSuperAdmin () {
            return this.auth.account.role.id === 1
        },

        isAdmin () {
            return this.auth.account.role.id === 2
        },

        isUser () {
            return this.auth.account.role.id === 3
        },

        ...mapGetters('filters', {
            searchable: 'getSearchable'
        }),

        org () {
            return JSON.parse(localStorage.getItem('user')).organisation
        },

        textSearch () {
            return localStorage.getItem('textSearch')
        },

        lang () {
            return this.makeLang(this.org.language)
        }
    },

    watch: {
        searchable () {
            return this.$store.state.organizations.searchable
        },

        textSearch: {
          immediate: true,
          handler: function (val) {
              if (!_.isEmpty(val)) {
                  this.ghost.query = val
                  this.search()
              }
          }
        }
    },

    mounted () {
        this.payload = {
            "organisation": this.org.uuid
        }

        if (this.isSuperAdmin) {
            this.$store.dispatch('organizations/getOrganizations')
        }

        if (this.isSuperAdmin || this.isAdmin) {
            this.$store.dispatch('organizations/getRoot')
            this.$store.dispatch('users/getUsers')
        }

        this.getMetadatas()
        this.$store.dispatch('filters/getSearchable')
        this.$store.dispatch('filters/getQueries')
        this.$store.commit('filters/SET_SHOW_FILTERS', false)
        this.initGhost()

        setTimeout(() => {
            $('#query').focus()
        }, 0)
    },

    methods: {
        openVocalSearch() {
            window.eventBus.$emit('vocal', 'search')
            window.$('#VocalSearchModal').modal('show')
        },

        initGhost () {
            this.ghost = {
                query: ''
            }
        },

        speechEnd ({sentences, text}) {
            this.ghost.query = text
            if (!_.isEmpty(this.ghost.query)) {
                this.search()
            }

            if (_.isEmpty(this.ghost.query)) {
                window.eventBus.$off('vocal')
            }
        },

        getMetadatas () {
            if (this.isSuperAdmin) {
                this.$store.dispatch('metadatas/getOrgMetadatas', this.payload)
            }

            if (this.isAdmin) {
                this.$store.dispatch('metadatas/getMetadatas')
            }
        },

        /**
         * Apply Search
         *
         * @return {void} [description]
         */
        async search () {
            if (this.isAdmin) {
                this.ghost.folder = [localStorage.getItem('organisation')]
            }

            if (this.ghost.query != '') {
                window.eventBus.$emit('loading:show')

                const response = await this.$api.post('api/pages/filter', this.ghost)
                    .catch(error => {
                        console.log(error.response.data.errors)
                        this.$swal.error(this.$translate.text('Error'), error.response.data.errors)
                    })

                if (response) {
                    this.$store.commit('filters/SET_PAGE_FILTERS', response.data['pages'])
                    this.$store.commit('filters/SET_DOCUMENT_FILTERS', response.data['docs'])
                    this.$store.commit('filters/SET_QUERY', this.ghost.query)
                    this.$store.commit('filters/SET_INITIAL_SLIDE')
                    this.$store.commit('filters/SET_SHOW_FILTERS', true)
                    this.$router.push({ name: 'advanced-search' })
                    window.eventBus.$off('vocal')
                }

                window.eventBus.$emit('loading:hide')
            } else {
                this.$swal.error(this.$translate.text('Empty Query'), this.$translate.text('Please fill the query !'))
            }
        },
    }
}
</script>
