import {EventBus} 		from '@/00_global/eventbus'

import Checklists			from '@/00_services/api/Checklists'
import Flights				from '@/00_services/api/Flights'
import Malfunctions 	from '@/00_services/api/Malfunctions'
import Notifications 	from '@/00_services/api/Notifications'

import Widgets 				from '@/03_molecules/Widgets/Widgets.vue'

import SideInfo 			from '@/04_organisms/SideInfo/SideInfo.vue'


export default {
	name: 'DashboardPanel',

	components: {
		SideInfo,
		Widgets,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			viewData: {
				checklist: null,
				notifications: null,
				flightInfo: null,
				nextStop: null,
				malfunctions: null,
			},
		}
	},

	watch: {
		viewData: {
			handler() {
				let size = Object.keys(this.viewData).length
				let count = 0

				for(let key in this.viewData) {
					this.viewData[key] != undefined && count++
 					
 					count == size && (this.isLoading = false)
				}
			},
			deep: true,
		},
	},

	mounted() {
		
		this.getFlightDetails()
	},

	methods: {

		getFlightDetails() {
		
			this.isLoading = true
			
			let flight = JSON.parse(localStorage.getItem('flight'))[0].id
			
			Flights.detail(flight).then(response => response.status === 404 ? this.onFail(response) : this.onSuccess(response))		
		},
		
		getNotifications() {

			this.isLoading = true

			Notifications.overview(this.viewData.flightInfo.track_id).then(response => response.status !== 200 ? this.onFail(response) : (this.viewData.notifications = JSON.parse(response.data.body).length), this.$store.state.notificationsCount = this.viewData.notifications)	
		},

		getMalfunctions() {

			this.isLoading = true

			Malfunctions.overview(this.viewData.flightInfo.current_ship_id).then(response => response.status !== 200 ? this.onFail(response) : (this.viewData.malfunctions = JSON.parse(response.data.body).length), this.$store.state.malfunctionsCount = this.viewData.malfunctionsCount)	
		},

		getChecklistDetails(checklistId) {

			this.isLoading = true
			
			this.debug && console.log('DASHBOARDPANEL: getChecklistDetails',checklistId)

			Checklists.detail(checklistId).then(response => response.status !== 200 ? this.onFail(response) : (this.viewData.checklist = JSON.parse(response.data.body)))
		},

		onSuccess(response) {

			this.debug && console.log('DASHBOARDPANEL: onSuccess', response)
			
			this.viewData.flightInfo = JSON.parse(response.data.body.flight)
			this.viewData.nextStop = response.data.body.next.length ? JSON.parse(response.data.body.next) : false

			// get checklist id if available
			let checklistId = null

			response.data.body.start_checklist && !response.data.body.stop_checklist && (checklistId = response.data.body.start_checklist.id)
			
			localStorage.getItem('checklist') && (checklistId = JSON.parse(localStorage.getItem('checklist'))[0].checklistId)

			checklistId ? this.getChecklistDetails(checklistId) : (this.viewData.checklist = false)
			this.getNotifications()
			this.getMalfunctions()

			this.$emit('emitCaptain', this.viewData.flightInfo.captain.full_name)
		},

		onFail(response) {

			this.isLoading = false

			this.debug && console.log('DASHBOARDPANEL: onFail 404', response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},
	},
}