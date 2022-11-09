<template lang="html">
    <div class="_side-modal modal animated fadeIn upload" id="addScheduleModal">
        <div class="modal-dialog" role="document" v-show="!isLoading">
            <div class="modal-content">
                <div class="_modal-content bordered">
                    <button class="btn btn-grey mr-10" @click="close()">
                        <i class="feather icon-x"></i>
                        {{ t('Close') }}
                    </button>
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
