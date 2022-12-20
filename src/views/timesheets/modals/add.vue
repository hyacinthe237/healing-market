<template lang="html">
    <div class="_side-modal modal animated fadeIn upload" id="addCardTimeModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <!-- Uninstalling -->
                <div class="_modal-content">
                    <div class="primary fs-20">
                        {{ t('Add Card Time') }}
                    </div>
                    <div class="close" @click="closeModal()">
                        <i class="feather icon-x"></i>
                    </div>

                    <form @submit.prevent class="_form mt-20" v-show="!isLoading">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="role" v-translate>Employee Name</label>
                                    <select
                                        name="employee"
                                        id="employee"
                                        v-model="ghost.employee"
                                        class="form-control form-control-lg"
                                    >
                                        <option value="">Employee Name</option>
                                        <option
                                            v-for="member in members"
                                            :key="member.id"
                                            :value="member.id"
                                        >
                                            {{ member.fullname }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="date" v-translate>Date</label>
                                    <input type="date"
                                        name="date"
                                        v-model="ghost.date"
                                        class="form-control form-control-lg"
                                        v-validate="'required'"
                                        :data-vv-as="t('Date')"
                                        :placeholder="t('Date')"
                                    >
                                    <v-error :name="'date'" :err="errors" :show="showErrors"></v-error>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="job_site" v-translate>Job site</label>
                                    <select
                                        name="job_site"
                                        id="job_site"
                                        v-model="ghost.job_site"
                                        class="form-control form-control-lg"
                                    >
                                        <option value="">Job site</option>
                                        <option
                                            v-for="site in sites"
                                            :key="site.id"
                                            :value="site.id"
                                        >
                                            {{ site.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div class="buttons mt-20" v-show="!isLoading">
                        <button class="btn btn-grey mr-20" @click="resetGhost()">
                            <i class="feather icon-x"></i>
                            {{ t('Cancel') }}
                        </button>

                        <button class="btn-primary btn" @click.prevent="save()">
                            <i class="feather icon-save mr-10"></i>
                            {{ t('Save') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="isLoading" class="_loader">
            <Spinners></Spinners>
        </div>
    </div>
</template>

<script>
import usersMixins from './mixins'

export default {
    mixins: [usersMixins],

    props: {
        sites: {
            type: Array,
            default: () => []
        },
        members: {
            type: Array,
            default: () => []
        },
    },

    mounted () {
        window.eventBus.$on('addcard', (result) => {
          if (result == 'time') {
              this.resetGhost()
          }
      })
    },

    methods: {
        async save () {
            this.showErrors = true
            const isValid = await this.$validator.validate()
            if (!isValid) return false

            this.startLoading()

            const res = await this.$api.post('/user-api/add-member-team', this.ghost)
                .catch(error => {
                    this.stopLoading()
                    this.$swal.error('Add card error', error.response.data.error_message)
                })
                if (res) {
                    this.stopLoading()
                    this.showErrors = false
                    this.closeModal()
                    this.$emit('cardTimeAdded')
                    this.$swal.success('Confirmation', this.$translate.text('Member created successfully !'))
                }
        },

        closeModal () {
            this.resetGhost()
            this.closeAllModals()
        },

        resetGhost () {
            this.ghost = {
                employee: '',
                date: '',
                job_site: '',
            }
        }
    }
}
</script>
