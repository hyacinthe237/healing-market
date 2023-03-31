<template lang="html">
    <main-modal 
        :id="'successModal'"
        :title="''"
    >
        <div class="_success">
            <i class="feather icon-clock"></i>
            <p>Account pending Awaiting admin validation.</p>
            <button type="submit" class="btn btn-secondary pointer mt-20" @click="good()">Thanks</button>
        </div>
    </main-modal>
</template>

<script>
export default {
    name: 'SuccessModal',

    methods: {
        good () {
            setTimeout(() => {
                $('#successModal').modal('hide')
            }, 0)
            this.$emit('good')
        },
    }
}
</script>
