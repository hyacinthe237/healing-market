<template lang="html">
    <main-modal 
        :id="'addCategoryModal'"
        :title="'Select your category'"
    >
        <div class="">
            <form class="_form" v-show="!isLoading" @submit.prevent="saveCategory()">
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
                <button type="submit" class="btn btn-secondary uppercase">Save</button>
            </form>
            <div class="_loader" v-show="isLoading">
                <Spinners></Spinners>
            </div>
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
        closer () {
            this.$emit('added')
            setTimeout(() => {
                $('#addCategoryModal').modal('hide')
            }, 150)
        },

        async saveCategory () {              
            if (this.ghost.category == '') {
                this.$swal.error('Validation warning', 'Please select one category before saving')
            }

            if (this.ghost.label !== '') {
                this.isLoading = true

                const response = await this.$api.post('/market-api/therapists/add-categories', this.ghost)
                    .catch(error => {
                        this.isLoading = false
                        console.log('error => ', error.response.data.error)
                        this.$swal.error('Sorry', error.response.data.error.message)
                    })
                
                
                if (response) {
                    this.isLoading = false
                    this.$swal.success('Success', 'New category added')
                    this.closer()                  
                }
            }            
        },
    }
}
</script>
