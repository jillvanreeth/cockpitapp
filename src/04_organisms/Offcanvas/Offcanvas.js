import {EventBus} 					from '@/00_global/eventbus'

import ChecklistConfirm			from '@/03_molecules/ChecklistConfirm/ChecklistConfirm.vue'
import CommentsConfirm			from '@/03_molecules/CommentsConfirm/CommentsConfirm.vue'
import CommentsForm 				from '@/03_molecules/CommentsForm/CommentsForm.vue'
import FlightConfirm 				from '@/03_molecules/FlightConfirm/FlightConfirm.vue'
import FlightDelete 				from '@/03_molecules/FlightDelete/FlightDelete.vue'
import FlightSkipForm 			from '@/03_molecules/FlightSkipForm/FlightSkipForm.vue'
import FlightStopConfirm 		from '@/03_molecules/FlightStopConfirm/FlightStopConfirm.vue'
import LogoutConfirm 				from '@/03_molecules/LogoutConfirm/LogoutConfirm.vue'
import MalfunctionsDetail 	from '@/03_molecules/MalfunctionsDetail/MalfunctionsDetail.vue'
import NotificationsDetail 	from '@/03_molecules/NotificationsDetail/NotificationsDetail.vue'
import PassengersForm 			from '@/03_molecules/PassengersForm/PassengersForm.vue'
import PincodeForm 					from '@/03_molecules/PincodeForm/PincodeForm.vue'
import PinConfirm 					from '@/03_molecules/PinConfirm/PinConfirm.vue'
import Whoops								from '@/03_molecules/Whoops/Whoops.vue'


export default {
	name: 'Offcanvas',

	components: {
		ChecklistConfirm,
		CommentsConfirm,
		CommentsForm,
		FlightConfirm,
		FlightDelete,
		FlightSkipForm,
		FlightStopConfirm,
		LogoutConfirm,
		MalfunctionsDetail,
		NotificationsDetail,
		PassengersForm,
		PincodeForm,
		PinConfirm, 
		Whoops,
	},

	props: {
		viewToShow: String,
		viewData: [Object, FormData, String],
	},

	data() {
		return {
			debug: false,
		}	
	},

	methods: {
		handleClick() {
			this.debug &&	console.log('OFFCANVAS: handleClick')
	  	
	  	EventBus.$emit('toggleOffcanvas', false)

	  	this.viewData && this.viewData.title == 'Captain with token not found (Try to login again?)' && (localStorage.clear(), this.$router.push('/'))
	  	this.viewData && this.viewData.status == '404' && this.$router.push('/')
		}
	}
}