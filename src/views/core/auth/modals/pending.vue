<template lang="html">
    <main-modal 
        :id="'pendingModal'"
        :title="''"
    >
        <div class="_success">
            <i class="feather icon-clock"></i>
            <p>Account pending Awaiting admin validation.</p>
            <button type="submit" class="btn btn-secondary pointer mt-20" @click="good()">Go to home</button>
        </div>
    </main-modal>
</template>

<script>
export default {
    name: 'PendingModal',

    methods: {
        good () {
            this.closeAllModals()
            this.n('landing')
        },
    }
}
</script>
