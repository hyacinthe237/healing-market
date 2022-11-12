<template lang="html">
    <div class="_side-modal modal animated fadeIn upload" id="addScheduleModal">
        <div class="modal-dialog" role="document" v-show="!isLoading">
            <div class="modal-content">
                <div class="_modal-content">
                    <!-- <button class="btn btn-grey mr-10" @click="close()">
                        <i class="feather icon-x"></i></button> -->

                      <div class="content">
                        <div class="avatar">AH</div>
                        <div class="name">Abanda Hyacinthe</div>
                      </div>

                      <div>
                          <div class="_tabs mt-20">
                              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                  <a class="nav-item nav-link" id="nav-custom-tab"
                                      data-toggle="tab" href="#nav-custom" role="tab"
                                      aria-controls="nav-custom">Custom</a>

                                  <a class="nav-item nav-link" id="nav-common-tab"
                                      data-toggle="tab" href="#nav-common" role="tab"
                                      aria-controls="nav-common">Common</a>

                                  <a class="nav-item nav-link" id="nav-timeoff-tab"
                                      data-toggle="tab" href="#nav-timeoff" role="tab"
                                      aria-controls="nav-timeoff">Time Off</a>
                              </div>
                          </div>

                          <div class="tab-content" id="nav-tabContent">
                              <div class="tab-pane fade" id="nav-custom" role="tabpanel" aria-labelledby="nav-custom-tab">
                                <div class="custom-box">
                                  <div class="time-select">
                                    <select name="am"><option value="09:00">09:00</option></select>
                                    <i class="feather icon-minus"></i>
                                    <select name="pm"><option value="08:00">08:00</option></select>
                                  </div>
                                </div>
                              </div>

                              <div class="tab-pane fade" id="nav-common" role="tabpanel" aria-labelledby="nav-common-tab">

                              </div>

                              <div class="tab-pane fade" id="nav-timeoff" role="tabpanel" aria-labelledby="nav-timeoff-tab">

                              </div>
                          </div>
                      </div>
                </div>

                <div class="_modal-content">

                </div>
            </div>
        </div>

        <div v-show="isLoading" class="mt-40 pb-40 text-center">
            <izy-hollow-loading loading />
        </div>
    </div>
</template>

<script>
// import _ from 'lodash'

export default {

    props: {
        id: {
            type: String,
            default: '',
        }
    },

    data: () => ({ }),

    computed: { },

    watch: {},

    mounted () {
        // window.eventBus.$on('preview-file', (result) => {
        //     if (result == 'previewfile') {
        //         this.resetGhost()
        //         this.initPayload()
        //         this.getOrgMetadatas()
        //         this.setDeleteParams()
        //     }
        // })
    },

    methods: {
        close () {
            window.$('.modal').modal('hide')
        },
    }
}
</script>
