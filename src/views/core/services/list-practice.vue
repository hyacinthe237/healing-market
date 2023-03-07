<template lang="html">
    <section class="list-practice">
        <div class="g-page" v-show="!isLoading">
            <div class="overlay">
                <div class="link">Apply to feature your<br>practice on the #1 plateform<br>for
                     <span>holistic practitioners</span></div>
                <div class="b-text mt-40">
                    <div class="tle">two steps to apply:</div>
                    <div class="stp1">1) Fill Out Our Application Form</div>
                    <div class="stp2 mt-10">2) Select A Time For An Onboarding<br>Interview With A Member Of Our Team</div>
                </div>
            </div>
            <div class="profile-top-container">
                <div
                    class="profile-photo"
                >
                <img :src="logo" alt="" />                  
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
                    <img :src="logo" alt="" />
                    </div>
                </div>
            </div>

            <div class="_more">
                <div class="links">Apply to feature your practice on <br>the #1 plateform for
                    <span>holistic practitioners</span></div>
               <div class="b-texts mt-10">
                   <div class="tle">two steps to apply:</div>
                   <div class="stp1">1) Fill Out Our Application Form</div>
                   <div class="stp2">2) Select A Time For An Onboarding<br>Interview With A Member Of Our Team</div>
               </div>
            </div>

            <div class="form">
                <h4>Apply to feature your practice on<br>Healing Marketplace</h4>

                <form class="_form mt-20" @submit.prevent>
                    <div class="form-group">
                        <input type="text" name="first_name" v-model="ghost.first_name" placeholder="First name" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" name="last_name" v-model="ghost.last_name" placeholder="Last name" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" name="email" v-model="ghost.email" placeholder="Email" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="number" name="phone" v-model="ghost.phone" placeholder="Phone" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" name="url" v-model="ghost.url" placeholder="Website URL/Facebook or Instagram" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Apply Now</button>
                </form>
            </div>
        </div>
        <div class="_loader" v-show="isLoading">
            <Spinners></Spinners>
        </div>
    </section>
  </template>
  
  <script>
    import config from '@/services/config'
    import logo from '@/assets/img/healing/logo.svg'
  
  export default {
      name: 'PractitionerDetails',
  
      data: () => ({
        logo
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
  