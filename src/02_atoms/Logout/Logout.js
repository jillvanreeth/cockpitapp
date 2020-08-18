import {EventBus} 		from '@/00_global/eventbus'

import Checklists			from '@/00_services/api/Checklists'
import Flights				from '@/00_services/api/Flights'


export default {
	name: 'Logout',

	data() {
		return {
			debug: false,
			isLoading: false,
			viewData: {
				checklistIsCompleted: null,
				flightIsCompleted: null,	
			},
		}
	},

	watch: {
		viewData: {
			handler() {
				let size = Object.keys(this.viewData).length
				let count = 0
				
				for(let key in this.viewData) {
					this.viewData[key] != null && count++
 				
 					count == size && (this.goToLogout())
				}
			},
			deep: true,
		},
	},

	methods: {

		handleClick(){

			this.debug && console.log('LOGOUT: handleClick')

			// reset viewData
			this.viewData.checklistIsCompleted = null
			this.viewData.flightIsCompleted = null

			this.isLoading = true
			
			this.getFlightDetails()	
		},

		goToLogout() {

			this.debug && console.log('LOGOUT: goToLogout', this.viewData)

			this.isLoading = false

			!this.isLoading && EventBus.$emit('toggleOffcanvas', true, 'LogoutConfirm', this.viewData);
		},

		getFlightDetails() {
	
			this.debug && console.log('LOGOUT: getFlightDetails')

			let flight = JSON.parse(localStorage.getItem('flight'))[0].id
			
			flight && Flights.detail(flight).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		getChecklistDetails(checklistId) {

			this.debug && console.log('LOGOUT: getChecklistDetails', checklistId)
			
			checklistId && Checklists.detail(checklistId).then(response => response.status !== 200 ? this.onFail(response) : (this.viewData.checklistIsCompleted = JSON.parse(response.data.body).complete))
		},

		onSuccess(response) {

			this.debug && console.log('LOGOUT: onSuccess', response)

			this.viewData.flightIsCompleted = JSON.parse(response.data.body.flight).complete

			// get checklist id if available
			let checklistId = null

			response.data.body.start_checklist && !response.data.body.stop_checklist && (checklistId = response.data.body.start_checklist.id)
			
			localStorage.getItem('checklist') && (checklistId = JSON.parse(localStorage.getItem('checklist'))[0].checklistId)

			checklistId ? this.getChecklistDetails(checklistId) : (this.viewData.checklist = false)
		},

		onFail(response) {

			this.debug && console.log('LOGOUT: onFail', response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},
	}
}