<template>
    <div
        class="item-box"
        @click="check()"
    >
        <div class="check">
            <i :class="`feather icon-${isChecked ? 'check-square' : 'square'}`"></i>
        </div>

        <div v-show="labelValue===0" class="checkbox-content">
            {{ label }}
        </div>
    </div>
</template>

<script>

export default {
    name: 'checkbox',

    props: {
        label: { type: String, default: 'Checkbox name' },
        value: { type: [String, Number], default: '' },
        color: { type: String, default: '' },
        selectedColor: { type: String, default: '' },
        selected: { type: String, default: '' },
    },

    computed: {
        isChecked () {
            return this.selected === this.value
        },

        currentColour () {
            return this.isChecked ? this.selectedColor : this.color
        },

        labelValue () {
            return this.label === 'none' ? 1 : 0
        }
    },

    methods: {
        check () {
            this.$emit('changed', {
                action: this.isChecked ? 'remove' : 'add',
                value: this.value,
            })
        }
    }
}
</script>
