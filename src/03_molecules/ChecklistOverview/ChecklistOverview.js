import {EventBus} 		from '@/00_global/eventbus'

import Checklists 		from '@/00_services/api/Checklists'
import Flights				from '@/00_services/api/Flights'


export default {
	name: 'ChecklistOverview',

	data() {
		return {
			debug: false,
			isLoading: true,
			flightInfo: Object,
			checklist: Object,
			checklistFromStorage: JSON.parse(localStorage.getItem('checklist'))[0],
			stewards: JSON.parse(localStorage.getItem('crew')),
		}
	},

	mounted() {

		this.getChecklist()
	},

	methods: {

		getChecklist() {

			this.debug && console.log('CHECKLISTOVERVIEW: getFlightInfo')

			let checklistId = JSON.parse(localStorage.getItem('checklist'))[0].checklistId

			Checklists.detail(checklistId).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		getFlightInfo() {

			this.debug && console.log('CHECKLISTOVERVIEW: getFlightInfo')

			let flight = JSON.parse(localStorage.getItem('flight'))[0].id

			Flights.detail(flight).then(response => response.status !== 200 ? this.onFail(response) : (this.flightInfo = JSON.parse(response.data.body.flight), this.isLoading = false))	
		},

		onSuccess(response) {
		
			this.checklist = JSON.parse(response.data.body)
		
			this.debug && console.log('CHECKLISTOVERVIEW: onSuccess', 'checklist:', this.checklist)

			this.getFlightInfo()
		},

		onFail(response) {

			this.debug && console.log('CHECKLISTOVERVIEW: onFail', response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		getValue(currentEntry) {

			let theValue
			let theEntries = this.checklist.entries
			
			theEntries.filter(entry => { 
				this.debug && console.log('CHECKLISTOVERVIEW: getValue', entry.id, currentEntry.id)
				
				if(entry.id == currentEntry.id) {
					
					theValue = entry.value

					this.debug && console.log('CHECKLISTOVERVIEW: getValue: matching entry', entry, 'thevalue', theValue)
				} 
			})

			return theValue
			
		},
	}
}