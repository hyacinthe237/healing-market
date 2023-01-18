<template lang="html">
    <div class="_side-modal modal animated fadeIn upload" id="editUserModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <!-- Uninstalling -->
                <div class="_modal-content">
                    <div class="primary fs-20">
                        {{ t('Edit member') }}
                    </div>
                    <div class="close" @click="closeAllModals()">
                        <i class="feather icon-x"></i>
                    </div>

                    <form @submit.prevent class="_form mt-20" v-show="!isLoading">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="first_name" v-translate>First name</label>
                                    <input type="text"
                                        name="first_name"
                                        v-model="ghost.first_name"
                                        class="form-control form-control-lg"
                                        v-validate="'required'"
                                        :data-vv-as="t('First name')"
                                        :placeholder="t('First name')"
                                    >
                                    <v-error :name="'first_name'" :err="errors" :show="showErrors"></v-error>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="last_name" v-translate>Last name</label>
                                    <input type="text"
                                        name="last_name"
                                        v-model="ghost.last_name"
                                        class="form-control form-control-lg"
                                        v-validate="'required'"
                                        :data-vv-as="t('Last name')"
                                        :placeholder="t('Last name')"
                                    >
                                    <v-error :name="'last_name'" :err="errors" :show="showErrors"></v-error>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="role" v-translate>Gender</label>
                                    <select
                                        name="sex"
                                        id="sex"
                                        v-model="ghost.sex"
                                        class="form-control form-control-lg"
                                    >
                                        <option
                                            v-for="(sex, index) in genders"
                                            :key="index+1"
                                            :value="sex"
                                        >
                                            {{ t(sex) }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="email" v-translate>Email</label>
                                    <input type="email"
                                        name="email"
                                        v-model="ghost.email"
                                        class="form-control form-control-lg"
                                        v-validate="'required|email'"
                                        :data-vv-as="t('Email')"
                                        :placeholder="t('Email')"
                                    >
                                    <v-error :name="'email'" :err="errors" :show="showErrors"></v-error>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="birthday" v-translate>Birthday</label>
                                    <input type="date"
                                        name="birthday"
                                        v-model="ghost.birthday"
                                        class="form-control form-control-lg"
                                        v-validate="'required'"
                                    >
                                    <v-error :name="'birthday'" :err="errors" :show="showErrors"></v-error>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="phone" v-translate>Phone number</label>
                                    <input type="text"
                                        name="phone"
                                        v-model="ghost.phone"
                                        class="form-control form-control-lg"
                                        v-validate="'required'"
                                    >
                                    <v-error :name="'phone'" :err="errors" :show="showErrors"></v-error>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="role" v-translate>Wage hourly</label>
                                    <input type="number"
                                        name="wage"
                                        v-model="ghost.wage"
                                        class="form-control form-control-lg"
                                        v-validate="'required'"
                                        placeholder="$"
                                    >
                                    <v-error :name="'wage'" :err="errors" :show="showErrors"></v-error>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="role" v-translate>Access level</label>
                                    <div class="levels">
                                        <div :class="['level', isSelected == 'employee' ? 'selected' : '']" @click="selecteEmployee()">Employee</div>
                                        <div :class="['level', isSelected == 'manager' ? 'selected' : '']" @click="selecteManager()">Manager</div>
                                    </div>
                                </div>
                            </div>

                            <!--<div class="col-sm-12">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="role" v-translate>Job sites</label>
                                            <select
                                                name="job_site"
                                                id="job_site"
                                                v-model="ghost.job_site"
                                                class="form-control form-control-lg"
                                            >
                                                <option
                                                    v-for="site in sites"
                                                    :key="site.id"
                                                    :value="site.id"
                                                >
                                                    {{ site. name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
    
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label for="role" v-translate>Wage</label>
                                            <input type="number"
                                                name="wage"
                                                v-model="ghost.wage"
                                                class="form-control form-control-lg"
                                                v-validate="'required'"
                                                placeholder="$"
                                            >
                                            <v-error :name="'wage'" :err="errors" :show="showErrors"></v-error>
                                        </div>
                                    </div>
    
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label for="role" v-translate>Period</label>
                                            <select
                                                name="period"
                                                id="period"
                                                v-model="ghost.period"
                                                class="form-control form-control-lg"
                                            >
                                                <option
                                                    v-for="(p, index) in periods"
                                                    :key="index+1"
                                                    :value="p"
                                                >
                                                    {{ t(p) }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>-->
                        </div>
                    </form>

                    <div class="buttons mt-20" v-show="!isLoading">
                        <button class="btn-primary btn mr-20" @click.prevent="updateUser()">
                            <i class="feather icon-save mr-10"></i>
                            {{ t('Update member') }}
                        </button>
                    </div>

                    <div v-show="isLoading" class="_loader">
                        <Spinners></Spinners>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import usersMixins from './mixins'

export default {
    mixins: [usersMixins],

    props: {
        member: {
            type: Object,
            default: () => {}
        },

        sites: {
            type: Array,
            default: () => []
        },
    },

    watch: {
        member: {
            immediate: true,
            handler: function (val) {
                if (!_.isEmpty(val)) {
                    this.showErrors = false
                    this.ghost = Object.assign({}, val)
                    if (val.is_manager) {
                        this.isSelected = 'manager'
                    }
                    if (val.is_employee) {
                        this.isSelected = 'employee'
                    }
                }
            }
        }
    },

    mounted () {
        window.eventBus.$on('editUserOnReset', (result) => {
            if (!_.isEmpty(result)) {
                this.showErrors = false
                this.ghost = Object.assign({}, result)
                if (result.is_manager) {
                    this.isSelected = 'manager'
                }
                if (result.is_employee) {
                    this.isSelected = 'employee'
                }
            }
        })
    },

    methods: {
        async updateUser () {
            this.showErrors = true
            const isValid = await this.$validator.validate()
            if (!isValid) return false

            this.startLoading()

            const res = await this.$api.put(`user-api/users/${this.member.id}/`, this.ghost)
                .catch(error => {
                    this.stopLoading()
                    this.$swal.error(this.$translate.text('Error'), this.$translate.text(error.response.data.errors))
                })

            if (res) {
                this.stopLoading()
                this.showErrors = false
                this.closeAllModals()
                this.$emit('memberModified')
                this.$swal.success(this.$translate.text('Member updated successfully !'))
            }
        },

        reset () {
            window.$('#editUserModal').modal('hide')
            window.eventBus.$emit('reset', 'password')
            this.$emit('reset', this.person)
        },

        selecteEmployee () {
            this.isSelected = 'employee'
            this.ghost.is_employee = true
            this.ghost.is_manager = false
        },

        selecteManager () {
            this.ghost.is_employee = false
            this.ghost.is_manager = true
            this.isSelected = 'manager'
        },
    }
}
</script>
