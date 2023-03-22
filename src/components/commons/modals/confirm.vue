<template>
    <div
        class="modal fade"
        tabindex="-1" role="dialog"
        aria-hidden="true"
        :id="id"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <h2 class="modal-confirm">{{ title }}</h2>
                    <h4 class="modal-message">{{ message }}</h4>

                    <div class="mt-40 text-center">
                        <div class="row">
                            <div class="col-sm-12">
                                <button
                                    class="btn btn-lg btn-block btn-secondary"
                                    @click="confirmAll()"
                                >{{ confirmAllBtnText }}</button>
                            </div>

                            <div class="col-sm-6 mt-10">
                                <button
                                    class="btn btn-lg btn-block btn-primary"
                                    @click="confirm()"
                                >{{ confirmBtnText }}</button>
                            </div>

                            <div class="col-sm-6 mt-10">
                                <button
                                    class="btn btn-lg btn-block btn-secondary"
                                    @click="cancel()"
                                >{{ cancelBtnText }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConfirmModal',
    emits: ['confirmed', 'confirmedAll', 'cancelled'],

    props: {
        id: { type: String, default: 'confirmModal' },
        title: { type: String, default: 'Etes-vous sûr de vouloir continuer ?' },
        message: { type: String, default: '...' },
        resource: { type: Object, default: () => {} },
        page: { type: Number, default: 0 },
        confirmBtnText: { type: String, default: 'Oui' },
        confirmAllBtnText: { type: String, default: 'Oui' },
        cancelBtnText: { type: String, default: 'Non' },
    },

    methods: {
        confirm () {
            if (this.resource) {
                this.$emit('confirmed', this.resource)
            }

            this.close()
        },

        confirmAll () {
            if (this.resource) {
                this.$emit('confirmedAll', this.resource)
            }

            this.close()
        },

        close () {
            window.$('.modal').modal('hide')
        },

        cancel () {
            this.$emit('cancelled')
            this.close()
        }
    }
}
</script>
