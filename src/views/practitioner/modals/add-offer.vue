<template lang="html">
    <main-modal 
        :id="'addOfferModal'"
        :title="'Add a new offer'"
    >
        <div class="">
            <form class="_form" @submit.prevent="saveOffer()" v-show="!isLoading">
                <div class="form-group">
                    <label for="title">Offer title</label>
                    <input type="text" name="title" v-model="ghost.title" placeholder="Offer title" class="form-control-modal">
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea name="description" id="description" v-model="ghost.description" cols="30" rows="5" class="form-control-modal"></textarea>
                </div>

                <div class="form-group">
                    <label for="price">Offer price</label>
                    <input type="number" name="price" v-model="ghost.price" placeholder="Offer price" class="form-control-modal">
                </div>

                <div class="form-group">
                    <label for="category">Offer category</label>
                    <select name="category" id="category" v-model="ghost.category" class="form-control-modal">
                        <option value="">Select category</option>
                        <option v-for="c in categories" :value="c.id" :key="c.id">{{ c.label }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="image">Upload offer image</label>
                    <input type="file" name="image" id="image" class="form-control-modal" @change="handleFile($event)">
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
    name: 'AddOfferModal',

    data: () => ({
        ghost: {
            title: '',
            description: '',
            price: '',
            category: '',
            image: '',
        },
    }),

    props: {
        categories: { type: Array, default: () => [] },
        therapistId: { type: Number, default: 1 },
    },

    computed: {},

    methods: {
        async saveOffer () {
            if (this.ghost.title == '' || this.ghost.description == '' || this.ghost.price == '' || this.ghost.image == '') {
                this.$swal.error('Validation warning', 'Inputs are mandatory')
            }

            if (this.ghost.title !== '' && this.ghost.description !== '' && this.ghost.price !== '' && this.ghost.image !== '') {
                this.isLoading = true
                let formData = new FormData()
                formData.append('title', this.ghost.title)
                formData.append('description', this.ghost.description)
                formData.append('price', this.ghost.price)
                formData.append('category', this.ghost.category)
                formData.append('therapist', this.therapistId)
                formData.append('image', this.ghost.image)
    
                const response = await this.$api.post('/market-api/offers/', formData)
                    .catch(error => {
                        this.isLoading = false
                        console.log('error => ', error.response.data.error)
                        this.$swal.error('Sorry', error.response.data.message)
                    })
                
                
                if (response) {
                    this.isLoading = false
                    this.$swal.success('Success', 'New offer added')
                    this.closer()                  
                }
            }
        },

        closer () {
            this.$emit('added')
            setTimeout(() => {
                $('#addOfferModal').modal('hide')
            }, 150)
        },

        /**
         * User signs in
         * @return {void}
         */
        handleFile (e) {
            console.log(e)
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;

            var reader = new FileReader()

            reader.onloadend = function () {
                $('.image').attr('src', reader.result)
            }
            reader.readAsDataURL(files[0])
            this.ghost.image = files[0]
        }
    }
}
</script>
