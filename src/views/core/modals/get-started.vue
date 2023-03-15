<template lang="html">
    <div class="_preview-modal modal animated fadeIn" id="GetStartedModal">
        <div class="_preview-dialog" role="document">
            <div class="_preview-content">
                <div class="close" @click="closeAllModals()">
                    <i class="feather icon-x"></i>
                </div>

                <div class="started-container">
                    <div class="gauche">
                        <h3>Welcome to Healing marketplace</h3>

                        <p>Just answer a few questions and we'll match you to practitioners who can help you achieve your wellness goals</p>
                    </div>
                    <div class="carousel">
                        <VueSlickCarousel v-bind="settings" id="carousel1">
                            <div class="content">
                                <img :src="startedImage" alt="" srcset="">
                            </div>
                            <div class="content">
                                <img :src="startedImage" alt="" srcset="">
                            </div>
                            <div class="content">
                                <img :src="startedImage" alt="" srcset="">
                            </div>
                            <div class="content">
                                <img :src="startedImage" alt="" srcset="">
                            </div>
                            <div class="content">
                                <img :src="startedImage" alt="" srcset="">
                            </div>
                            <div class="content">
                                <img :src="startedImage" alt="" srcset="">
                            </div>
                            <div class="content">
                                <img :src="startedImage" alt="" srcset="">
                            </div>
                            <div class="content">
                                <img :src="startedImage" alt="" srcset="">
                            </div>
                            <div class="content">
                                <img :src="startedImage" alt="" srcset="">
                            </div>
                        </VueSlickCarousel>
                    </div>
                    <div class="droite">
                        <div class="header">
                            <h3>Welcome to Healing marketplace</h3>
    
                            <p>Just answer a few questions and we'll match you to practitioners who can help you achieve your wellness goals</p>
                        </div>
                        <form class="_form">
                            <div class="question">
                                <h5>On a scale of 1-10, where would you rank your health today?</h5>
                                <div class="content mt-10">
                                    <div class=" _checkbox">
                                        <izy-checkbox 
                                            v-for="(c, index) in checks" 
                                            :key="index+1" 
                                            :label="`${index+1}. ${c}`" 
                                            :value="c"
                                            :selected="selectedRange"
                                            @changed="selectRange" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="question mt-20">
                                <h5>I’m looking for a practitioner to help me with...</h5>
                                <div class="content">
                                    <div class="form-group">
                                        <label class="typo__label">Select all that apply</label>
                                        <multiselect
                                            v-model="values"
                                            track-by="name"
                                            placeholder="Select all that apply"
                                            :options="lookings"
                                            :multiple="true"
                                            :taggable="true"
                                        ></multiselect>
                                    </div>
                                    <div class="form-group">
                                        <label for="other">Other (please specify)</label>
                                        <input type="text" name="other_looking" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="question mt-20">
                                <h5>What's important to you in a wellness practitioner?</h5>
                                <div class="content">
                                    <div class="form-group">
                                        <label class="typo__label">Select as many as you would like</label>
                                        <multiselect
                                            v-model="value"
                                            track-by="name"
                                            placeholder="Select as many"
                                            :options="importantOptions"
                                            :multiple="true"
                                            :taggable="true"
                                        ></multiselect>
                                    </div>
                                </div>
                            </div>
                            <div class="question mt-20">
                                <h5>What is your sex?</h5>
                                <div class="content">
                                    <div class=" _checkbox">
                                        <izy-checkbox 
                                            v-for="(sex, index) in genders" 
                                            :key="index+1" 
                                            :label="sex" 
                                            :value="sex"
                                            :selected="selectedGender"
                                            @changed="selectGender" 
                                        />
                                    </div>
                                    <div class="form-group" v-if="selectedGender==''">
                                        <label for="other">Other (please specify)</label>
                                        <input type="text" name="other_looking" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="question mt-20">
                                <h5>Do you have a preference for the sex of your practitioner?</h5>
                                <div class="content">
                                    <div class=" _checkbox">
                                        <izy-checkbox 
                                            v-for="(p, index) in preferences" 
                                            :key="index+1" 
                                            :label="p" 
                                            :value="p"
                                            :selected="selectedPreference"
                                            @changed="selectPreference" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="question mt-20">
                                <h5>What age group are you in?</h5>
                                <div class="content">
                                    <div class=" _checkbox">
                                        <izy-checkbox 
                                            v-for="(g, index) in groups" 
                                            :key="index+1" 
                                            :label="g" 
                                            :value="g"
                                            :selected="selectedGroup"
                                            @changed="selectGroup" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="question mt-20">
                                <h5>Where would you like to find a practitioner?</h5>
                                <div class="content form-group">
                                    <label for="zip_code">Your Zip code or City</label>
                                    <input type="text" name="zip_code" class="form-control">
                                </div>
                            </div>
                            <div class="question mt-20 button">
                                <button type="submit" class="btn btn-primary">Get started</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import startedImage from '@/assets/img/healing/get-started.jpg'
export default {
    name: 'GetStartedModal',

    data: () => ({
        settings: {
            "dots": false,
            "edgeFriction": 0.35,
            "infinite": true,
            "speed": 500,
            "slidesToShow": 1,
            "slidesToScroll": 1
        },
        startedImage,
        genders: ['Male', 'Female'],
        preferences: ['Male', 'Female', 'No preference'],
        groups: ['Under 18', '30 - 39', '50 - 59', '70+', '18 - 29', '40 - 49', '60 - 69', 'Prefer not to say'],
        importantOptions: ['Close to my location', 'Years of experience', 'Well-reviewed', 'License & credentials'],
        selectedGender: '',
        selectedPreference: '',
        selectedGroup: '',
        selectedRange: '',
        value: [],
        values: [],
        checks: ['Really Bad','Bad','So so','Not too bad','Ok','Average','Good','Healthy','Pretty Good','Perfect'],
        lookings: ['Addiction','Anxiety','Autism','Depression','Brain Fog','Cancer','Headaches','Insomnia','Autoimmune Disease','Digestive Disorders', 
        'Stress', 'Pregnancy', 'Sleep', 'Trauma', 'Weight Loss', 'Diabetes', 'Nutrition', 'Fatigue', 'Relationship Issues', 'Irritable Bowel Syndrome (IBS)',
        'Lyme Disease', 'Chronic Pain', 'Joint Pain'],
    }),

    mounted () {
        this.initForm()
    },

    components: { VueSlickCarousel },
    methods: {
        selectGender (item) {
            this.selectedGender = item.value
        },

        selectPreference (item) {
            this.selectedPreference = item.value
        },

        selectGroup (item) {
            this.selectedGroup = item.value
        },

        selectRange (item) {
            this.selectedRange = item.value
        },

        /**
         * Fonction d'initialisation du formulaire get started
        */
        initForm () {
            this.selectedGender = ''
            this.selectedPreference = ''
            this.selectedGroup = ''
            this.selectedRange = ''
        }
    },
}
</script>
