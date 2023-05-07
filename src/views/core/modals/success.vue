<template lang="html">
    <main-modal 
        :id="'successModal'"
        :title="''"
    >
        <div class="_success">
            <i class="feather icon-check-circle"></i>
            <p>Thanks <span>{{clientName}}</span>. Your booking with <span>{{practitionerName}}</span> was successful.</p>
            <button type="submit" class="btn btn-secondary pointer mt-20" @click="gotoDashboard()">Go to dashboard</button>
        </div>
    </main-modal>
</template>

<script>
export default {
    name: 'SignInModal',

    props: {
        clientName: { type: String, default: '' },
        practitionerName: { type: String, default: '' },
    },

    methods: {
        gotoDashboard () {
            this.closeAllModals()
            this.n('client-dashboard')
        },

        gotoForgot () {
            this.closeAllModals()
            this.n('password-forgot')
        },
    }
}
</script>
