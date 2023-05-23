<template lang="html">
  <div class="">
    <Navbar v-show="!isLoading"></Navbar>
    <div class="practitioner-dashboard">
      
      <Practitioner-SideBar
          @addCategory="openAddCategoryModal"
          @addTag="openAddTagModal"
          @selectedTag="openEditTagModal"
          @manageCalendar="manageCalendarModal"
          :categories="therapist_categories"
          :tags="therapist_tags"
          :currentUser="currentUser"
          v-show="!isLoading"
      ></Practitioner-SideBar>

      <div class="droite">
        <div class="container" v-show="!isLoading">
          <div class="row">
            <div class="col-sm-6">
                <h4 class="mb-10 nowrap">Select an appointment date</h4>
                <vue-datepicker
                    v-model="line.date"
                    :inline="true"
                    :highlighted="highlightedDays"
                    :disabled-dates="disablePastDates"
                ></vue-datepicker>
            </div>
            
            <div class="col-sm-6 _form">
              <h4 class="mt-40 mb-10 nowrap">Add available time slots</h4>
              <div class="row">
                <div class="col-xs-8">
                  <div class="form-group">
                    <input type="time" name="time_cut_start" class="form-control mt-10" v-model="time.time_cut_start"/>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="text-right ml-5">
                      <div class="btn btn-primary" @click="add()">
                        <i class="feather icon-plus"></i> add time
                      </div>
                  </div>
                </div>
              </div>

              <div class="_times mt-10">
                <div 
                  class="time" 
                  v-for="(time, index) in time_slots" 
                  :key="index++"
                  @click="del(time)"
                >{{ time.time_cut_start | amPm }}</div>
            </div>

             <div class="mt-40 text-right">
              <div class="btn btn-secondary" @click="save()">
                <i class="feather icon-plus"></i> add availability
              </div>
            </div>
            </div>

            
          </div>

          <table class="table table-striped mt-40" v-if="availabilities.length>0">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time slots</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="a in availabilities" :key="a.id">
                <td>{{ a.day_cut_calendar | dat }}</td>
                <td>
                  <div class="_times">
                    <div 
                      class="time" 
                      v-for="(time, index) in a.time_slots" 
                      :key="index++"
                    >{{ time.time_cut_start | amPm }}</div>
                  </div>
                </td>
                <td>
                  <i class="feather icon-x danger pointer" @click="confirmDelete(a)"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="_loader" v-show="isLoading">
      <Spinners></Spinners>
    </div>

    <AddCategoryModal 
      @added="getCategories" 
      :categories="categories"
    ></AddCategoryModal>

    <AddTagModal @added="getTags"></AddTagModal>
    <EditTagModal @edited="getTags" :tag="payload"></EditTagModal>
    <AddAvailabilityModal @added="getAvailabilities"></AddAvailabilityModal>
    <Footer :isConnected="isConnected" v-show="!isLoading"></Footer>
  </div>
</template>

<script>
import money from '@/assets/img/healing/money.png'
import moneys from '@/assets/img/healing/moneys.png'
import TherapistMixins from '../mixins'
import moment from 'moment'
import Swal from 'sweetalert2'

export default {
    data: () => ({
        money, moneys,
        highlightedDays: {
            dates: [],
        },
        startOfMonth: moment().startOf('month').format('YYYY-MM-DD'),
        endOfMonth: moment().endOf('month').format('YYYY-MM-DD'),
        today: moment().format('YYYY-MM-DD'),
        disablePastDates: {
            ranges: []
        },
        time_slots: [],
        line: {
          therapist: '',
          day_cut: '',
          date: '',
          day_cut_calendar: '',
          time_slots: [],
        },
        time: {
          time_cut_start: ''
        }
    }),

    mixins: [TherapistMixins],
    
    watch: {
       'line.date' (val) {
            if (val) {
                this.line.day_cut = moment(val).format('dddd')
                this.line.day_cut_calendar = moment(val).format('YYYY-MM-DD')
            }
            if (!val) {
                this.line.day_cut = ''
                this.line.day_cut_calendar = ''
            }
       },
    },

    mounted () {
      this.highlightedDays.dates.push(new Date())

      if (moment(this.today).isAfter(this.startOfMonth)) {
          let yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
          let dt = { from: new Date(this.startOfMonth), to: new Date(yesterday) }
          this.disablePastDates.ranges.push(dt)
      }
    },

    methods: { 
      add () {
        
        let exist = this.time_slots.filter(slot => slot.time_cut_start == this.time.time_cut_start)[0]
        if(!exist) {
          let obj = { time_cut_start: this.time.time_cut_start }
          this.time_slots.push(obj)
          this.time.time_cut_start = ''
        }

        if(exist) {
          this.$swal.error('Warning', `The time are already selected`)
        }
      },

      del (elt) {
          this.time_slots = this.time_slots.filter(p=> p.time_cut_start != elt.time_cut_start)
      },

      confirmDelete (item) {
        Swal.fire({
            // title: this.$translate.text('Are you sure ?'),
            text: this.$translate.text("Are you sure you want to delete the availability?"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: this.$translate.text('No'),
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.$translate.text('Yes')
        }).then((result) => {
            if (result.value) {
                this.deleteIt(item)
            }
        })
      },

      async save () {
            this.startLoading()
            this.line.therapist = this.therapistId
            this.line.time_slots = this.time_slots
            delete this.line.date

            const response = await this.$api.post('/booking-api/availibilities/', this.line)
            .catch(error => {
                console.log('error', error.response.data.error_message)
                this.$swal.error('Warning', error.response.data.error_message)
                this.stopLoading()
            })
            if (response) {
                this.stopLoading()
                this.$swal.success('Confirmation', 'Availibilities added successfuly')
                this.time_slots = []
                this.line.day_cut = ''
                this.line.day_cut_calendar = ''
            }
        },

      async deleteIt (a) {
            this.startLoading()

            const response = await this.$api.delete(`/booking-api/availibilities/${a.id}/`)
            .catch(error => {
                this.$swal.error('Warning', error.response.data.error_message)
                this.stopLoading()
            })
            if (response) {
                this.stopLoading()
                this.getAvailabilities()
                this.$swal.success('Confirmation', 'Availibilities deleted successfuly')
            }
      },
    }
}
</script>
