<template lang="html">
    <breeding-rhombus-spinner
        :animation-duration="2000"
        :size="65"
        :color="colour"
    />
</template>

<script>
import { BreedingRhombusSpinner  } from 'epic-spinners'

export default {
    components: {
        BreedingRhombusSpinner 
    },

    props: {
        colour: {
            type: String,
            default: '#FF6900'
        },

        size: {
            type: Number,
            default: 14
        },

        dots: {
            type: Number,
            default: 6
        },

        duration: {
            type: Number,
            default: 1000
        }
    }
}
</script>

<style lang="css" scoped>
.hollow-dots-spinner {
    margin: 0 auto;
}
</style>
