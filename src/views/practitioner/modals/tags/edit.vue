<template lang="html">
    <main-modal 
        :id="'editTagModal'"
        :title="'Edit your speciality'"
    >
        <div class="">
            <form class="_form" v-show="!isLoading" @submit.prevent="addTag()">
                <div class="form-group">
                    <label for="title">Speciality name</label>
                    <input type="text" name="tag" v-model="ghost.tag" placeholder="Speciality name" class="form-control-modal">
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
    name: 'EditTagModal',

    data: () => ({
        host: {
            tag: '',
            therapist: ''
        },
    }),

    props: {
        tag: { type: Object, default: () => {} }
    },

    computed: {
        auth () {
            return JSON.parse(localStorage.getItem(config.get('user')))
        },
    },

    watch:{
        tag: {
            immediate: true,
            handler: function (val) {
                if (val) {
                    this.ghost = Object.assign({}, val)
                }
            }
        }
    },

    methods: {
        async addTag () {
            if (this.ghost.tag == '') {
                this.$swal.error('Validation warning', 'Please fill the tag name')
            }

            if (this.ghost.tag !== '') {
                this.isLoading = true

                const payload = {
                    tag: this.ghost.tag
                }

                const response = await this.$api.put(`/market-api/tag-providers/${this.tag.id}/`, payload)
                    .catch(error => {
                        this.isLoading = false
                        this.$swal.error('Sorry', error.response.data.message)
                    })
                
                
                if (response) {
                    this.isLoading = false
                    this.$swal.success('Success', 'Tag edited')
                    this.closer()                
                }
            }
        },

        closer () {
            this.$emit('edited')
            setTimeout(() => {
                $('#editTagModal').modal('hide')
            }, 150)
        }
    }
}
</script>
