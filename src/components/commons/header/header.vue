<template lang="html">
      <section class="_header">
          <div class="container-fluid">
              <div class="row">
                  <div class="col-sm-6">
                  </div>

                  <div class="col-sm-6">
                      <div class="buttons text-right">
                          <button class="btn btn-dark mr-2">
                              <i class="feather icon-arrow-left"></i> {{ t('Back') }}
                          </button>

                          <button class="btn btn-secondary mr-2">
                              <i class="feather icon-edit"></i>
                          </button>

                          <button class="btn btn-warning mr-2">
                              <i class="feather icon-settings"></i>
                          </button>

                          <button class="btn btn-danger">
                              <i class="feather icon-trash-2"></i>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </section>
</template>

<script>
import _ from 'lodash'
import logo from '@/assets/img/logo-nogada-foot.png'

export default {
    props: {
        root: {
            type: Object,
            default: () => {}
        }
    },

    data: () => ({
        role: 1,
        sizecss: 0,
        logo
    }),

    computed: {
        user () {
           return this.$store.state.users.user
        }
    },

    mounted () {

    },

    methods: {
        signout () {
            this.$auth.logout()
            this.$store.commit('SET_TOGGLE_ICON', false)
        }
    }
}
</script>
