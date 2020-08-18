import {EventBus} 		from '@/00_global/eventbus'

import Flights				from '@/00_services/api/Flights'


export default {
	name: 'ShiftResume',

	data() {
		return {
			debug: true,
			isLoading: true,
			flightInfo: Object,
			nextStop: Object,
			shift: String,
		}
	},

	mounted() {

		// get flight details
		this.getFlightMinimalDetails()

		// hide next button
		EventBus.$emit('isDisabled', true)
	},

	computed: {

		timeOfDeparture() {
			
			return departure => departure.replace(':', 'u').substring(0, departure.length - 3)
		}
	},

	methods: {

		handleResumeShiftClick() {

			this.debug && console.log('SHIFTRESUME: handleResumeShiftClick')
			
			// pass the resumed flight info
			this.$emit('emitResumedShift', this.flightInfo)
		},

		handleNewShiftClick() {

			this.debug && console.log('SHIFTRESUME: handleNewFlightClick')

			this.$emit('emitNewShift')
		},

		getFlightMinimalDetails() {

			let flight = JSON.parse(localStorage.getItem('shift'))[0].flightInfo.id
			
			Flights.minimal(flight).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {
			
			this.debug && console.log('SHIFTRESUME: onSuccess', response)

			this.nextStop = JSON.parse(response.data.body.next)
			this.flightInfo = JSON.parse(response.data.body.flight)
			this.shift = JSON.parse(localStorage.getItem('shift'))[0].name
			
			this.isLoading = false
		},

		onFail(response) {

			this.debug && console.log('SHIFTRESUME: onFail', response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			
			this.isLoading = false

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},
	}
}