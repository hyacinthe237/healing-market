<template>
    <div 
        class="modal fade" 
        :id="id" 
        tabindex="-1" role="dialog" 
        aria-labelledby="myModalLabel2"
    >
		<div class="modal-dialog" role="document">
			<div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
                
                <div class="modal-body">
                    <slot></slot>
                </div>

			</div><!-- modal-content -->
		</div><!-- modal-dialog -->
	</div><!-- modal -->
</template>


<script>
export default {
    name: 'MainModal',

    props: {
         id: { type: String, default: 'sideModal' },
         title: { type: String, default: '' },
    },


    methods: {
        closeModal () {
            setTimeout(() => {
                $(`#${this.id}`).modal('hide')
            }, 100)
        }
    }
}
</script>