<template lang="html">
    <main-modal 
        :id="'previewOfferModal'"
        :title="'Offer detail'"
    >
        <div class="">
            <form class="_form" v-show="!isLoading">
                <div class="form-group">
                    <label for="title">Offer title</label><br/>
                    <label for="title">{{ ghost.title }}</label>
                </div>

                <div class="form-group">
                    <label for="description">Description</label><br/>
                    <label for="description">{{ ghost.description }}</label>
                </div>

                <div class="form-group">
                    <label for="price">Offer price</label><br/>
                    <label for="price">${{ ghost.price }}</label>
                </div>

                <div class="form-group">
                    <label for="category">Offer category</label><br/>
                    <label for="category">{{ ghost.category }}</label>
                </div>
            </form>
            <div class="_loader" v-show="isLoading">
                <Spinners></Spinners>
            </div>
        </div>
    </main-modal>
</template>

<script>
export default {
    name: 'EditOfferModal',

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
        offer: { type: Object, default:  () => {} },
    },

    watch: {
        offer: {
            handler: function (val) {
                if (val) {
                    this.ghost = Object.assign({}, val)
                }
            }
        }
    },

    methods: {
        closer () {
            this.$emit('closed')
            setTimeout(() => {
                $('#previewOfferModal').modal('hide')
            }, 150)
        },
    }
}
</script>
