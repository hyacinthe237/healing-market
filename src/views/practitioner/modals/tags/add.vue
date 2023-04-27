<template lang="html">
    <main-modal 
        :id="'addTagModal'"
        :title="'Add your tag'"
    >
        <div class="">
            <form class="_form" v-show="!isLoading" @submit.prevent="addTag()">
                <div class="form-group">
                    <label for="title">Tag name</label>
                    <input type="text" name="tag" v-model="host.tag" placeholder="Tag name" class="form-control-modal">
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
import config from '@/services/config'
export default {    
    name: 'AddTagModal',

    data: () => ({
        host: {
            tag: '',
            therapist: ''
        },
    }),

    computed: {
        auth () {
            return JSON.parse(localStorage.getItem(config.get('user')))
        },
    },

    methods: {
        async addTag () {
            if (this.host.tag == '') {
                this.$swal.error('Validation warning', 'Please fill the tag name')
            }

            if (this.host.tag !== '') {
                this.isLoading = true
            
                this.host.therapist = this.auth.therapist_id

                const response = await this.$api.post('/market-api/tag-providers/', this.host)
                    .catch(error => {
                        this.isLoading = false
                        this.$swal.error('Sorry', error.response.data.message)
                    })
                
                
                if (response) {
                    this.isLoading = false
                    this.$swal.success('Success', 'New tag added')
                    this.closer()                
                }
            }
        },

        closer () {
            this.$emit('added')
            setTimeout(() => {
                $('#addTagModal').modal('hide')
            }, 150)
        }
    }
}
</script>
