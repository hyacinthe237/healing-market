<template lang="html">
    <div class="block">
        <div class="sharebox">
            <div class="share">
                <i class="feather icon-share-2"></i>
            </div>
        </div>
        <div class="bg-img"></div>
        <p>{{ item.description }}</p>
        <div class="footer">
            <div class="dropdown">
                <i 
                    class="dropdown-toggle feather icon-more-horizontal" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                ></i>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item pointer" @click="emitEvent('preview')"><i class="feather icon-eye"></i> Preview</a>
                  <a class="dropdown-item pointer" @click="emitEvent('edit')"><i class="feather icon-edit-2"></i> Edit</a>
                  <a class="dropdown-item pointer" @click="emitEvent('pause')"><i class="feather icon-pause"></i> Pause</a>
                  <a class="dropdown-item pointer" @click="emitEvent('statistics')"><i class="feather icon-pie-chart"></i> Statistics</a>
                </div>
              </div>
            
            <span class="secondary bold">$ {{ item.price }}</span>
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'OfferItem',
    props: {
        item: { type: Object, default: () => {} }
    },
        
    data: () => ({}),

    methods: {
        emitEvent (event) {
            this.$emit(event, this.item)
        },
    }
  }
  </script>
  