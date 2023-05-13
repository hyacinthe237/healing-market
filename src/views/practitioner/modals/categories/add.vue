<template lang="html">
    <main-modal 
        :id="'addCategoryModal'"
        :title="'Fill your language'"
    >
        <div class="">
            <form class="_form" v-show="!isLoading" @submit.prevent="saveCategory()">
                <div class="form-group mt-20">
                    <label for="tags">Language</label>
                    <input-tag v-model="ghost.languages" placeholder="Add a language" class="form-control-modal"></input-tag>
                </div>
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
        therapistId: { type: Number, default: 1 }
    },

    data: () => ({
        ghost: {
            languages: []
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
            if (this.ghost.languages == '') {
                this.$swal.error('Validation warning', 'Please select one category before saving')
            }

            if (this.ghost.languages !== '') {
                this.isLoading = true
                
                const response = await this.$api.post(`/user-api/therapists/${this.therapistId}/add-languages`, this.ghost)
                    .catch(error => {
                        this.isLoading = false
                        console.log('error => ', error.response.data.error)
                        this.$swal.error('Sorry', error.response.data.error.message)
                    })
                
                
                if (response) {
                    this.isLoading = false
                    this.$swal.success('Success', 'New language added')
                    this.closer()                  
                }
            }            
        },
    }
}
</script>
