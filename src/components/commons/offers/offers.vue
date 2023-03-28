<template lang="html">
    <div class="blocks">
        <OfferItem v-for="item in items" :key="item.id" :item="item" />
    </div>
</template>
  
  <script>
  import OfferItem from './offer'
  
  export default {
    name: 'Offers',
    props: {
        items: { type: Array, default: () => [] }
    },

    components: {
        OfferItem
    },
        
    data: () => ({}),

    methods: {
        openAddOfferModal () {
            setTimeout(() => {
                $('#addOfferModal').modal('show')
            }, 150)
        }
    }
  }
  </script>
  