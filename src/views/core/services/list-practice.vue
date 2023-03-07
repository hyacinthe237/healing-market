<template lang="html">
    <section class="signup-page">
        <div class="g-page" v-show="!isLoading">
            <div class="overlay">
                <div class="link">Already have an account? <span @click="n('signin')" class="pointer">Sign In</span></div>
            </div>
            <div class="profile-top-container">
                <div
                    class="profile-photo"
                >
                  
                </div>
            </div>
        </div>
        <div class="d-page" v-show="!isLoading">
            <div class="profile-top">
                <div class="overlay"></div>
                <div class="profile-top-container">
                    <div
                        class="profile-photo"
                    >
                      
                    </div>
                </div>
            </div>
             <div class="dhead mt-20">
                <div class="step-title">step 1 of 4</div>
                <div class="progress"><div class="step-1"></div></div>
                <div class="message-big">Hi, We're <br> NOGODA 360</div>
            </div>

            <form class="_form s-form mt-10" @submit.prevent>
                <div class="form-group">
                    <label>What's your name?</label>
                    <input type="text" name="username" v-model="ghost.username" placeholder="e.g. Art Paul" class="form-control mt-20">
                    <div class="check-form">
                        <div class="smaller">Try everything free for 14 days. No credit card required. Basic plan is free forever.</div>
                        <input type="checkbox" name="is_free" class="checkbox" checked>
                    </div>
                </div>
                <div class="bottom-form" @click="save()">
                    <div class="notyet"></div>
                    <div class="button mt-20 pointer">
                        <div class="text">Get Started</div>
                        <div class="icon"><i class="feather icon-chevron-right"></i></div>
                    </div>
                </div>
            </form>

            <div class="link">Already have an account? <span @click="n('signin')" class="pointer">Sign In</span></div>
        </div>
        <div class="_loader" v-show="isLoading">
            <Spinners></Spinners>
        </div>
    </section>
  </template>
  
  <script>
    import config from '@/services/config'
  
  export default {
      name: 'PractitionerDetails',
  
      data: () => ({
      }),
  
      components: { },
  
      computed: {
          user () {
              return JSON.parse(localStorage.getItem(config.get('user')))
          },
  
          isConnected () {
              return !_.isEmpty(this.user)
          }
      },
  
      methods: {
          openPreviewModal (text) {
              this.selectedText = text
              this.showBtn = false
              this.openModal({ id: 'previewModal' })
          },
      },
  }
  </script>
  