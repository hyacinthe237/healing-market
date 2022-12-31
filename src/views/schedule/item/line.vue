<template lang="html">
    <div class="client-box">
        <div class="elt-p">{{ item.day }}</div>
        <div class="elt-p">{{ item.start_time }}</div>
        <div class="elt-p">{{ item.end_time }}</div>
        <div class="elt-p btns">
            <i class="feather icon-x" @click="del()"></i>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'ItemLine',

    props: { item: { type: Object, default: () => {} } },

    data: () => ({}),

    methods: {
        del () { this.$emit('deleted', this.item) },
        edit () { this.$emit('edited', this.item.id) },
    },
}
</script>
