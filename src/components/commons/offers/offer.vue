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
            <i class="feather icon-more-horizontal"></i>
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
  }
  </script>
  