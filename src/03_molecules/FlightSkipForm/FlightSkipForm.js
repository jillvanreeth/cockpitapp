import {EventBus} 		from '@/00_global/eventbus'

import Items					from '@/00_services/api/Items'


export default {
	name: 'FlightSkipForm',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			timeIsLoaded: false,
			theNextStop: this.viewData.nextStop,
			theSecondStop: this.viewData.secondStop ? this.viewData.secondStop : null,
			theFlightInfo: this.viewData.flightInfo ? this.viewData.flightInfo : null,
			inputFields: {
				reason: '',
				remarks: '',
			},
			isInvalid: false,
			isSuccess: false,
			theMessage: {},
		}
	},
	
	watch: {
		'inputFields.reason': {
			handler(newVal,oldVal) {
			
				if(newVal == oldVal) return false

				this.debug && console.log('FLIGHTSKIPFORM: watcher reason')

				this.isInvalid = false

				this.$refs.reason.classList.remove('is-invalid')
			}
		}
	},

	methods: {

		handleSubmit() {

			this.debug && console.log('FLIGHTSKIPFORM: handleSubmit')

			this.validateIt() && this.sendIt()
		},

		handleKeyevent(e) {

			this.debug && console.log('FLIGHTSKIPFORM: handleKeyevent', e.target)

			this.isInvalid = false
			
			e.target.parentNode.classList.remove('is-invalid')
		},

		sendIt() {

			this.isLoading = true

				// create formdata object
			let formData = new FormData()
			
			formData.append('item', this.theNextStop.id)
			formData.append('flight', this.theNextStop.flight_id)
			formData.append('why_skipped', this.inputFields.reason)
			formData.append('remarks', this.inputFields.remarks)

			for(let key of formData.entries()) { this.debug && console.log('FLIGHTSKIPFORM: sendIt', key[0] + ', ' + key[1]) }
			
			Items.skip(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {
			
			this.debug && console.log('FLIGHTSKIPFORM: onSuccess', response)
		
			this.isLoading = false

			this.items = JSON.parse(response.data.body.items)
			this.debug && console.log('FLIGHTSKIPFORM: onSuccess: theItems', this.items)

			this.$store.commit('setItems', this.items)
			localStorage.setItem('items', JSON.stringify(this.items))	

			this.isSuccess = true

			this.theMessage.title = 'Halte overgeslagen'
			this.theMessage.subtitle = 'Succes!'
			this.theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
			this.theMessage.icon = 'trash'

			// emits to flighteditpanel
			EventBus.$emit('updateItems', true)
		},

		onFail(response) {

			this.isLoading = false

			this.debug && console.log('PASSENGERSFORM: onFail 404', response.data.message)

			this.theMessage.status = response.status
			this.theMessage.title = response.data.message
			this.theMessage.subtitle = 'Oeps?!'
			this.theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
			this.theMessage.icon = 'whoops'
			
			EventBus.$emit('toggleOffcanvas', true, 'Whoops', this.theMessage)
		},

		validateIt() {

			this.isInvalid = false
			
			this.inputFields.reason == '' && (this.isInvalid = true, this.$refs.reason.classList.add('is-invalid'))
			
			this.inputFields.remarks.length < 15 && (this.isInvalid = true, this.$refs.remarks.classList.add('is-invalid'))
			this.debug && this.isInvalid && console.log('FLIGHTSKIPFORM: validateIt: ISINVALID!')
			
			if(this.isInvalid) return false

			return true
		},

		TimeIsLoaded() {

			this.isLoading = false
		},
	}
}