<template lang="html">
    <form class="form-inline">
        <div class="input-icons">            
            <div class="icon">
                <i class="feather icon-search"></i>
            </div>
            <input 
                type="text" 
                id="query" 
                name="query" 
                v-model="ghost.query" 
                class="input-field" 
                placeholder="Try massage, backpain, etc" 
            />
        </div>

        <div class="input-icons">            
            <div class="icon">
                <i class="feather icon-map-pin"></i>
            </div>
            <input 
                type="text" 
                class="input-field" 
                placeholder="Enter ZIP Code"
                name="zipcode"
                id="zipcode"
                v-model="ghost.zipcode"
            />
        </div>

        <button 
            type="submit" 
            class="btn btn-secondary" 
            @click="emitSearch()"
        > Search</button>
    </form>
</template>

<script>
import config from '@/services/config'
export default {
    name: 'InlineForm',

    props: {
        isSearching: {  type: Boolean, default: false },
        search: { type: Object, default: () => {}  },
    },

    watch: {
        search: {
            immediate: true,
            handler: function (val) {
                if(val) {
                    this.ghost = Object.assign({}, val)
                }
            }
        }
    },

    computed: {
        user () {
            return JSON.parse(localStorage.getItem(config.get('user')))
        },

        isConnected () {
            return !_.isEmpty(this.user)
        },
    },

    mounted () {
        setTimeout(() => {
            $('#query').focus()
        }, 0)
    },

    methods: {
        emitSearch () {
            this.$emit('search', this.ghost)
        },
    }
}
</script>

