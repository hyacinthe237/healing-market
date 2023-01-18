<template>
    <div class="main">
        <div class="calendar-holder">
          <calendar :events="events" />
        </div>
        <div class="form-holder">
          <h3>Schedule an event</h3>
          <event-form />
        </div>
      </div>
  </template>
  <script>
  import Calendar from './calendar.vue'
  import EventForm from './event-form.vue'
  import Pusher from 'pusher-js';
  import config from '../../../services/config'

  export default {
    name: 'MainSchedule',
    components: {
      Calendar,
      EventForm
    },
    data(){
      return {
        events: [{
          title     :  'event1',
          start     : '2018-07-09',
          cssClass  : 'blue',
          YOUR_DATA : {}
        },
        {
          title     : 'event2',
          start     : '2018-07-10',
          end       : '2018-07-13',
          cssClass  : ['orange']
        }] 
      }
    },

    created(){
        const pusher = new Pusher(config.get('pusher_app_key'), {
          cluster: config.get('pusher_app_cluster'),
          encrypted: true,
        });
        const channel = pusher.subscribe('schedule');
        channel.bind('new-event', (data) => {
          this.events = [
            ...this.events,
            data
          ];
        })
      },
  }
  </script>
  <style>
  .main {
    display: flex;
    align-items: center;
  }
  .calendar-holder {
    width: 65%;
  }
  .form-holder {
    width: 35%;
  }
  .form-holder > h3 {
    color: orangered;
    text-transform: uppercase;
    font-size: 16px;
    text-align: left;
    margin-left: 30px;
    margin-bottom: 10px;
  }
  </style>