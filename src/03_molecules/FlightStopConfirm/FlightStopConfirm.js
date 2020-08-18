import {EventBus} 		from '@/00_global/eventbus'

import Flights				from '@/00_services/api/Flights'


export default {
	name: 'FlightStopConfirm',

	props: {},

	data() {
		return {
			debug: true,
			isLoading: false,
		}
	},

	methods: {

		handleSubmit() {

			this.isLoading = true

			// create formdata object
			let formData = new FormData()
			
			formData.append('flight', JSON.parse(localStorage.getItem('flight'))[0].id)

			for(let key of formData.entries()) { this.debug && console.log('FLIGHTSTOPCONFIRM: handleSubmit', key[0] + ', ' + key[1]) }
			
			Flights.stop(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		

		},

		onSuccess(response) {

			this.debug && console.log('FLIGHTSTOPCONFIRM: onSuccess', response)
			
			localStorage.clear()

			this.isLoading = false

			EventBus.$emit('toggleOffcanvas', false) 
			
			this.$router.push('/')
		},

		onFail(response) {

			this.debug && console.log('FLIGHTSTOPCONFIRM: onFail 404', response.data.message)

			this.isLoading = false

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'radar'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},
	}
}