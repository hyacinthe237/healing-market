<template lang="html">
    <div class="gauche">
        <div class="card">
            <div class="profil">
                <img :src="profil" alt="" style="width:75px; height:75px; border-radius:75px;margin-right:10px;">
                <div class="available pointer" @click="setAvailibility()">
                    Availability 
                    <i class="feather icon-toggle-right" v-show="isVisible"></i>
                    <i class="feather icon-toggle-left" v-show="!isVisible"></i>
                </div>
            </div>
            <div class="card-head mt-20">
                <h5 class="nowrap">{{ name }}</h5>
                <div class="elevatedbox" @click="n('practitioner-settings')">
                    <div class="edit">
                        <i class="feather icon-edit-2"></i>
                    </div>
                </div>
            </div>

            <div class="mt-20" @click="n('practitioner-settings')">
                <button class="btn btn-outline-secondary btn-block">Edit profile</button>
            </div>

            <div class="mt-20">
                <div class="location">
                    <div class="icon nowrap">
                        <i class="feather icon-map-pin"></i> {{ address }}
                    </div>
                </div>
                <div class="location">
                    <div class="icon nowrap">
                        <i class="feather icon-user-check"></i> Member since 
                    </div>
                    <span class="nowrap">{{ created_at }}</span></div>
            </div>

            <div class="mt-20 pointer" @click="manageCalendar()">
                <button class="btn btn-secondary btn-block">Manage calendar</button>
            </div>

        </div>

        <div class="card">
            <div class="card-head">
                <h5 class="nowrap">Profile description</h5>
                <div class="elevatedbox">
                    <div class="edit">
                        <i class="feather icon-edit-2"></i>
                    </div>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

            <div class="card-head mt-10">
                <h5 class="nowrap">Language</h5>
                <a href="" class="secondary pointer nowrap">Add new</a>
            </div>
            <p>English</p>
        </div>

        <div class="card">
            <div class="card-head">
                <h5 class="nowrap">Specialities</h5>
                <a class="secondary pointer nowrap" @click="addNewSpeciality()">Add new</a>
            </div>
            <div class="skills mt-20" v-if="specialities.length>0">
                <div class="skill" v-for="c in specialities" :key="c.id">
                    <span class="nowrap">{{ c.label }}</span>
                </div>
            </div>
            <div class="skills mt-20" v-else>
                <div><span class="nowrap">No speciality found</span></div>
            </div>
        </div>

        <div class="card">
            <div class="card-head">
                <h5 class="nowrap">Categories</h5>
                <a class="secondary pointer nowrap" @click="addNewCategory()">Add new</a>
            </div>
            <div class="skills mt-20" v-if="categories.length>0">
                <div class="skill" v-for="(c, index) in categories" :key="index++">
                    <span class="nowrap">{{ c }}</span>
                </div>
            </div>
            <div class="skills mt-20" v-else>
                <div><span class="nowrap">No category found</span></div>
            </div>
        </div>

        <div class="card">
            <div class="card-head">
                <h5 class="nowrap">Tags</h5>
                <a class="secondary pointer nowrap" @click="addNewTag()">Add new</a>
            </div>
            <div class="skills mt-20" v-if="tags.length>0">
                <div class="pointer mr-3" v-for="tag in tags" :key="tag.id" @click="selectedTag(tag)">
                    <span class="nowrap">{{ tag.tag }}</span>
                </div>
            </div>
            <div class="skills mt-20" v-else>
                <div><span class="nowrap">No tags found</span></div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import config from '@/services/config'
  import _ from 'lodash'
  import profil from '@/assets/img/healing/profil-homme.png'
  import moment from 'moment'
  
  export default {
    name: 'PractitionerSideBar',
      data: () => ({
          isVisible: true,
          profil
      }),

      props: {
        categories: { type: Array, default: () => [] },
        specialities: { type: Array, default: () => [] },
        tags: { type: Array, default: () => [] },
        currentUser: { type: Object, default: () => {} }
      },
  
      components: {  },
  
      computed: {
         user () {
            return JSON.parse(localStorage.getItem(config.get('user')))
         },
  
        isConnected () {
              return !_.isEmpty(this.user)
        },

        name () {
            return this.currentUser.first_name || '...'
        },

        address () {
            return this.currentUser.address || '...'
        },

        created_at () {
            return moment(this.currentUser.created_at).fromNow() || '...'
        },

      },
      
      watch: { },
  
      mounted () {

      },
  
      methods: {
        setAvailibility () {
            this.isVisible = !this.isVisible
        },

        addNewCategory () {
            this.$emit('addCategory')
        },

        addNewSpeciality () {
            this.$emit('addSpeciality')
        },

        addNewTag () {
            this.$emit('addTag')
        },

        selectedTag (tag) {
            this.$emit('selectedTag', tag)
        },

        manageCalendar () {
            this.$emit('manageCalendar')
        }
      }
  }
  </script>
  