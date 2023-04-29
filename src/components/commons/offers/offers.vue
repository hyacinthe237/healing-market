<template lang="html">
    <div class="blocks">
        <OfferItem 
            v-for="item in items" 
            :key="item.id" 
            :item="item"
            @preview="previewEvent"
            @edit="editEvent"
            @pause="pauseEvent"
            @statistics="statisticsEvent"
            @share="shareEvent"
        />
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
        },

        previewEvent (item) {
            this.$emit('previewEvent', item)
        },
        
        shareEvent (item) {
            this.$emit('shareEvent', item)
        },

        editEvent (item) {
            this.$emit('editEvent', item)
        },

        pauseEvent (item) {
            this.$emit('pauseEvent', item)
        },

        statisticsEvent (item) {
            this.$emit('statisticsEvent', item)
        },
    }
  }
  </script>
  