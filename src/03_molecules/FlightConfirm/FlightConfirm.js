import {EventBus} 		from '@/00_global/eventbus'

import Flights				from '@/00_services/api/Flights'
import Checklists 		from '@/00_services/api/Checklists'
import Items					from '@/00_services/api/Items'


export default {
	name: 'FlightConfirm',

	props: {
		viewData: [Object, String],
	},

	data() {
		return {
			debug: false,
			itemParams: this.viewData.itemParams,
			destinationRoute: this.viewData.destinationRoute,
		}
	},

	methods: {

		handleSubmit() {

			this.debug && console.log('FLIGHTCONFIRM: handleSubmit', this.viewData)

			// submit first
			this.viewData && Items.pass(this.viewData.itemParams).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))				
		},

		onSuccess(response) {

			let flightInfo = JSON.parse(response.data.body.flight)
			let isLoading = true

			this.departure = response.data.body.departure_on
			this.items = JSON.parse(response.data.body.items)		
			
			this.debug && console.log('FLIGHTCONFIRM: onSuccess', 'departure: ',this.departure)
			this.debug && console.log('FLIGHTCONFIRM: onSuccess', 'items: ',this.items)
			this.debug && console.log('FLIGHTCONFIRM: onSuccess', 'flightInfo:', flightInfo)

			// save the updated flightinfo
			this.$store.commit('setDeparture', this.departure)
			this.$store.commit('setFlightInfo', flightInfo)
			this.$store.commit('setItems', this.items)

			localStorage.setItem('items', JSON.stringify(this.items))		

			// stop checklist so we can start a new one
			let checklistFormData = new FormData()
			
			checklistFormData.append('ship', JSON.parse(localStorage.getItem('ship')).id)
			checklistFormData.append('track', JSON.parse(localStorage.getItem('track'))[0].id)
			checklistFormData.append('shift', JSON.parse(localStorage.getItem('shift'))[0].id)
			checklistFormData.append('start_stop', 1)
			checklistFormData.append('flight', JSON.parse(localStorage.getItem('flight'))[0].id)

			for(let key of checklistFormData.entries()) { this.debug && console.log('FLIGHTCONFIRM: onSuccess', key[0] + ', ' + key[1]) }

			Checklists.create(checklistFormData).then(response => { 
				if(response.status !== 200) {
					this.onFail(response)
				} else {
					// isLoading = false
					localStorage.removeItem('checklist')
					EventBus.$emit('toggleOffcanvas', false) 
					this.$router.push(this.viewData.destinationRoute)
				}
			})
		},

		onFail(response) {

			this.isLoading = false

			this.debug && console.log('FLIGHTCONFIRM: onFail', response.data.message)

			this.theMessage.status = response.status
			this.theMessage.title = response.data.message
			this.theMessage.subtitle = 'Oeps?!'
			this.theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
			this.theMessage.icon = 'whoops'
			
			EventBus.$emit('toggleOffcanvas', true, 'Whoops', this.theMessage)
		},
	}
}