<template lang="html">
    <div class="_side-modal modal animated fadeIn upload" id="addUserModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <!-- Uninstalling -->
                <div class="_modal-content">
                    <div class="primary fs-20">
                        {{ t('Add a team member') }}
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
                                    <input type="number"
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
                                    <label for="password" v-translate>Password</label>
                                    <input type="password"
                                        name="password"
                                        v-model="ghost.password1"
                                        class="form-control form-control-lg"
                                        v-validate="'required|min:6'"
                                        ref="password"
                                        :data-vv-as="t('Password')"
                                        :placeholder="t('Password')"
                                    >
                                    <v-error :name="'password'" :err="errors" :show="showErrors"></v-error>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="password2" v-translate>Confirm Password</label>
                                    <input type="password"
                                        name="password2"
                                        v-model="ghost.password2"
                                        class="form-control form-control-lg"
                                        v-validate="'required|confirmed:password'"
                                        :data-vv-as="t('Confirm Password')"
                                        :placeholder="t('Confirm Password')"
                                    >
                                    <v-error :name="'confirm password'" :err="errors" :show="showErrors"></v-error>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div class="buttons mt-20" v-show="!isLoading">
                        <button class="btn-primary btn mr-20" @click.prevent="create()">
                            <i class="feather icon-save mr-10"></i>
                            {{ t('Save member') }}
                        </button>

                        <button class="btn btn-grey" @click="closeAllModals()" :disabled="isLoading">
                            <i class="feather icon-x"></i>
                            {{ t('Close') }}
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

    methods: {
        async create () {
            this.showErrors = true
            const isValid = await this.$validator.validate()
            if (!isValid) return false

            this.startLoading()
            this.ghost.is_employee = true

            const res = await this.$api.post('/user-api/add-member-team', this.ghost)
                .catch(error => {
                    this.stopLoading()
                    this.$swal.error('Add member error', error.response.data.error_message)
                })
                if (res) {
                    this.stopLoading()
                    this.showErrors = false
                    this.closeAllModals()
                    this.$emit('memberAdded')
                    this.$swal.success('Confirmation', this.$translate.text('Member created successfully !'))
                }
        }
    }
}
</script>
