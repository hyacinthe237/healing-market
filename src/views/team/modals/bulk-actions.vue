<template lang="html">
    <div class="_side-modal modal animated fadeIn upload" id="bulkActionsModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                

                <!-- Uninstalling -->
                <div class="_modal-content">
                    <div class="primary fs-18">Bulk Actions</div>
                    <div class="close" @click="closeAllModals()">
                        <i class="feather icon-x"></i>
                    </div>

                    <div class="item">
                        <div class="item-desc">What would you like to do?</div>
                    </div>

                    <div class="item">
                        <div class="item-title">Add Employees</div>
                        <div class="item-desc">Fill out a spreadsheet in Homebase with your employees’ information.</div>
                    </div>

                    <div class="item">
                        <div class="item-title">Send Homebase Invites</div>
                        <div class="item-desc">Send an invite link to anyone who has not signed in to Homebase yet.</div>
                    </div>
                    
                    <div class="item">
                        <div class="item-title">Terminate Employees</div>
                        <div class="item-desc">Choose employees to terminate and fill out reason in a spreadsheet.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    methods: {
        editUser () {
            window.$('.modal').modal('hide')
            this.openModal({ id: 'editUserModal' })
        },
    }
}
</script>
