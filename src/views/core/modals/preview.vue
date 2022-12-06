<template lang="html">
    <div class="_preview-modal modal animated fadeIn" id="previewModal">
        <div class="_preview-dialog" role="document">
            <div class="_preview-content">
                <div class="close" @click="closeAllModals()">
                    <i class="feather icon-x"></i>
                </div>

                <div class="fs-18" v-if="text == 'management'">
                    <p class="bold">What is a Visitor Management System?</p> 

                    <p>Visitor management is the process of tracking everyone who enters your building or your office. A visitor may be a customer, a delivery person, a job applicant, a contractor, a consultant, or the CEO’s third cousin twice removed. Essentially, anyone who is not a regular full-time employee is a visitor.</p>
                    
                    <p>A visitor management system is a technology used to track visitors in a formal way.</p>
                    
                    
                    <p>Benefits of Visitor Management Systems: </p>
                    
                    <p>Office Productivity</p>
                    <p>The first visitor management system was designed to solve two major challenges related to office productivity: too many interruptions and receptionists being stuck at their desks.</p>
                    
                    <p>now residents and employees can schedule and allow someone into the property and have documentation of whom to meet and ect.</p>
                    
                    
                    <p>By welcoming Nogada360 to your system checking in your office visitors, a visitor management system frees your receptionist to work on other things. Guaranteed both you and your receptionist will be happier for it.</p>
                    
                    
                    <p>Office Security</p>
                    
                    <p>The next set of benefits revolves around office security. In particular, a visitor management system helps combat challenges related to information security, visitor privacy, emergency evacuation plans, and regulatory compliance.</p>
                    
                    
                    <p>Residence security</p>
                    
                    <p>Security can notify residents that there's a situation going on in a particular building or in their building. For example, if there is a fire, residents would contact security, and after we call 911 and emergency services security would be able to notify the whole building to evacuate with a single push of a button.</p>
                    
                    
                    <p>Residence can also add guests to their property even after leasing office hours are closed</p>
                    
                    
                    <p>???Brand Image</p>
                    
                    <p>The key set of benefits revolves around a company’s brand image. Specifically, a visitor management system helps you create a great first impression and ensure the brand image you’ve got is the one you want.</p>
                    
                    
                    
                    <p>For the Residence</p>
                    
                    <p>Enhance Security SOPs, and effective communication channels, and generate property reports on the fly. Primarily built to streamline processes in residential security and property management, Nogada360 empowers neighborhoods to become safer, smarter, and better.</p>
                    
                    
                    <p>For the Commercial</p>
                    
                    <p>Seamlessly manage your tenants and visitor records with real-time reports all in one admin panel. Through  Nogada360, your tenants will have the means to keep themselves updated on things that matter most in your building.</p>
                </div>
                <div class="fs-18" v-if="text == 'scheduling'">
                    <p class="bold">Schedule your team in minutes NOT DAYS</p> 

                    <p>Manage your team’s schedules,view open shifts, time clocking, timesheets, communication, all in one place.</p>
                    
                    <p>Fill them on a first-come, first-served basis. Or pick the most suitable person.</p>
                    
                    
                    <p>No matter the size of your business, this employee scheduling software is for you!
                        <ul>
                            <li>Create schedules in minutes</li>
                            <li>Avoid conflicts and unnecessary costs</li>
                            <li>Manage from anywhere</li>
                            <li>Share instantly with your team</li>
                        </ul>
                    </p>


                    <p>Put pen and paper in the past</p>

                    <p>No more paper schedules, piles of sticky notes, and lost email threads—your shifts and schedules can be updated anywhere</p>

                    <p>Gives you and your team an easy way to stay connected, accountable, and contactless so you can focus on keeping your security agency successful.</p>




                        <p>---Built-in mobile GPS time-tracking and Geo-Fencing</p>


                            <p>Employee tracking devices can help employers keep their staff’s performance at the highest level. While it’s easy to monitor work hours and activities of employees working in the office, things get more complicated for people whose jobs often have to check in every hour or every half an hour.</p>


                                <p>It helps to make sure that your officers are always on time, and at the correct locations.</p>

                                <p>Location monitoring – Nogada360 software helps to monitor your officers while clocked in on a shift your agency, employees, and your client can take accountability for their whereabouts;</p>


                                <p>Main features:</p>

                                <p>Automatic time tracking in the real-time</p>

                                <p>Accurate timesheets</p>

                                <p>GPS tracking features</p>

                                <p>Advanced monitoring features: monitoring staff activities by categories, including app and website tracking</p>

                                <p>Monitoring productive and unproductive security officers</p>

                                <p>Tracking time by tasks and projects</p>

                                <p>Attendance management to keep track of vacations, leaves, absences, and more</p>

                                <p>Employees can clock in and out in real-time</p>

                                <p>One-touch time tracking – simple start-/stop-buttons</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PreviewModal',

    props: {
        text: { type: String, default: '' }
    },
}
</script>
