<template lang="html">
    <main-modal 
        :id="'successModal'"
        :title="''"
    >
        <div class="_success">
            <i class="feather icon-clock"></i>
            <p>Thanks for signing up with us. An email has been sent to you please check to complete your onboarding process.</p>
            <button type="submit" class="btn btn-secondary pointer mt-20" @click="good()">Thanks</button>
        </div>
    </main-modal>
</template>

<script>
export default {
    name: 'SuccessModal',

    methods: {
        good () {
            this.closeAllModals()
            this.n('signin')
        },
    }
}
</script>
