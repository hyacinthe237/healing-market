<template lang="html">
    <main-modal 
        :id="'addCategoryModal'"
        :title="'Select your category'"
    >
        <div class="">
            <form class="_form">
                <!-- <div class="form-group">
                    <label for="title">Category label</label>
                    <input type="text" name="title" v-model="ghost.label" placeholder="Category label" class="form-control-modal">
                </div>                 -->
                <div class="form-group">
                    <label for="category">Select your category</label>
                    <select name="category[]" id="parentCategory" class="form-control-modal" v-model="ghost.category" multiple>
                        <option v-for="c in categories" :value="c.id" :key="c.id">{{ c.label }}</option>
                    </select>
                </div>
                <!-- <div class="form-group">
                    <label for="description">Description</label>
                    <textarea name="description" id="description" v-model="ghost.description" cols="30" rows="5" class="form-control-modal"></textarea>
                </div> -->
                <button type="submit" class="btn btn-secondary uppercase" @submit.prevent="add()">Save</button>
            </form>
        </div>
    </main-modal>
</template>

<script>
export default {    
    name: 'AddCategoryModal',

    props: {
        categories: { type: Array, default: () => [] }
    },

    data: () => ({
        ghost: {
            category: []
        },
    }),

    computed: {},

    methods: {
        add () {
            if (this.ghost.category == '') {
                this.$swal.error('Validation warning', 'Please select one category before saving')
            }

            if (this.ghost.label !== '') {
                this.$emit('added', this.ghost)
                setTimeout(() => {
                    $('#addCategoryModal').modal('hide')
                }, 150)
            }
        },
    }
}
</script>
