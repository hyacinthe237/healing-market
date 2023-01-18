<template>
    <full-calendar 
        :events="events" 
        :plugins="calendarPlugins"
    />
</template>
  
  <script>
  import FullCalendar from '@fullcalendar/vue';
  import DayGridPlugin from '@fullcalendar/daygrid';
  import TimeGridPlugin from '@fullcalendar/timegrid';
  import InteractionPlugin from '@fullcalendar/interaction';
  import ListPlugin from '@fullcalendar/list';
  export default {
    name: 'Calendar',
    props: ['events'],
    components: { FullCalendar },

    data: () => ({
        calendarPlugins: [DayGridPlugin, TimeGridPlugin, InteractionPlugin, ListPlugin ]
    }),
  }
  </script>
  
  <style>
  .red {
    background: rgb(235, 77, 77) !important;
    color: whitesmoke !important;
  }
  .blue {
    background: rgb(59, 59, 163) !important;
    color: whitesmoke !important;
  }
  .orange {
    background: orange !important;
    color: white !important;
  }
  .green {
    background: rgb(49, 155, 49) !important;
    color: white !important;
  }
  .blue,
  .orange,
  .red,
  .green {
    font-size: 13px;
    font-weight: 500;
    text-transform: capitalize;
  }
  .event-item {
    padding: 2px 0 2px 4px !important;
  }
  </style>