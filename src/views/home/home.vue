<template lang="html">
    <div class="">

    </div>
</template>

<script>
import _ from 'lodash'

export default {
    data: () => ({
        payload: {}
    }),

    computed: {
        auth () {
            return AuthService.getUser()
        },
    },

    watch: { },

    mounted () {
        setTimeout(() => {
            $('#query').focus()
        }, 0)
    },

    methods: {

    }
}
</script>
