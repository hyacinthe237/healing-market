<template>
    <div id="my-container">
      <div class="my-3">
        <!-- Our triggering (target) element -->
        <b-button :id="`${id}`" variant="primary" ref="button" class="mt-10 more">
          Views details
        </b-button>
      </div>
  
      <!-- Output from the popover interaction -->
      <b-card title="Returned values:" v-if="input1Return && input2Return">
        <p class="card-text" style="max-width: 20rem;">
          Name: <strong>{{ input1Return }}</strong><br>
          Color: <strong>{{ input2Return }}</strong>
        </p>
      </b-card>
  
      <!-- Our popover title and content render container -->
      <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
      <!-- We specify the same container as the trigger button, so that popover is close to button -->
      <b-popover
        :target="`${id}`"
        triggers="hover"
        :show.sync="popoverShow"
        placement="auto"
        container="my-container"
        ref="popover"
        @show="onShow"
        @shown="onShown"
        @hidden="onHidden"
      >
        <template #title>
          <b-button @click="onClose" class="close" aria-label="Close">
            <span class="d-inline-block" aria-hidden="true">&times;</span>
          </b-button>
          Security officer
        </template>
  
        <div>
            <div>
                <span class="fs-14 bold">Time</span><br/>
                <span class="fs-12">{{ item.debut_time }}</span>
                <span class="ml-1 mr-1">-</span>
                <span class="fs-12">{{ item.end_time }}</span>
            </div>
            <div>
                <span class="fs-14 bold">Days</span><br/>
                <b-badge variant="light" class="mr-2" v-for="(d, index) in item.days_of_week" :key="index++">{{ d }}</b-badge>
            </div>

            <div class="mt-10">
                <span class="fs-14 bold">Shift Notes</span>
                <p class="fs-12">{{ item.notes }}</p>
            </div>
          
        </div>
      </b-popover>
    </div>
  </template>
  
  <script>
    export default {
        name: 'Popover',

        props: {
            id: {
                type: String,
                default: '',
            },
            item: {
                type: Object,
                default: () => {},
            },
        },
      data() {
        return {
          input1: '',
          input1state: null,
          input2: '',
          input2state: null,
          options: [{ text: '- Choose 1 -', value: '' }, 'Red', 'Green', 'Blue'],
          input1Return: '',
          input2Return: '',
          popoverShow: false
        }
      },
      watch: {
        input1(val) {
          if (val) {
            this.input1state = true
          }
        },
        input2(val) {
          if (val) {
            this.input2state = true
          }
        }
      },
      methods: {
        onClose() {
          this.popoverShow = false
        },
        onOk() {
          if (!this.input1) {
            this.input1state = false
          }
          if (!this.input2) {
            this.input2state = false
          }
          if (this.input1 && this.input2) {
            this.onClose()
            // Return our popover form results
            this.input1Return = this.input1
            this.input2Return = this.input2
          }
        },
        onShow() {
          // This is called just before the popover is shown
          // Reset our popover form variables
          this.input1 = ''
          this.input2 = ''
          this.input1state = null
          this.input2state = null
          this.input1Return = ''
          this.input2Return = ''
        },
        onShown() {
          // Called just after the popover has been shown
          // Transfer focus to the first input
          this.focusRef(this.$refs.input1)
        },
        onHidden() {
          // Called just after the popover has finished hiding
          // Bring focus back to the button
          this.focusRef(this.$refs.button)
        },
        focusRef(ref) {
          // Some references may be a component, functional component, or plain element
          // This handles that check before focusing, assuming a `focus()` method exists
          // We do this in a double `$nextTick()` to ensure components have
          // updated & popover positioned first
          this.$nextTick(() => {
            this.$nextTick(() => {
              (ref.$el || ref).focus()
            })
          })
        }
      }
    }
  </script>