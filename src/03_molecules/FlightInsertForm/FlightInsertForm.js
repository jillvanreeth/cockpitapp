import {EventBus} 		from '@/00_global/eventbus'

import Items						from '@/00_services/api/Items'
import Stops						from '@/00_services/api/Stops'


export default {
	name: 'FlightInsertForm',

	props: {
		currentItem: Object,
		emitToggleOffcanvas: Function,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			theCurrentItem: this.currentItem,
			theStops: Array,
			inputFields: {
				stop: '',
				hours: '',
				mins: '',
			},
			isInvalid: false,
			isSuccess: false,
			theMessage: {},
		}
	},

	watch: {
		'inputFields.stop': {
			handler(newVal,oldVal) {
			
				if(newVal == oldVal) return false

				this.debug && console.log('FLIGHTINSERTFORM: watcher stop')

				this.isInvalid = false

				this.$refs.stop.classList.remove('is-invalid')
			}
		}
	},

	mounted() {

		this.getStops()
	},

	methods: {

		handleCloseClick() {

			this.debug && console.log('FLIGHTINSERTFORM: handleCloseClick')

			this.$emit('emitToggleOffcanvas')
		},

		handleKeyevent(e) {

			this.debug && console.log('FLIGHTINSERTFORM: handleKeyevent', e.target)

			e.target.parentNode.parentNode.classList.remove('is-invalid')

			this.isInvalid = false
		},

		handleSubmit() {

			this.debug && console.log('FLIGHTINSERTFORM: handleSubmit')

			this.validateIt() && this.sendIt()
		},

		getStops() {

			this.isLoading = true

			Stops.overview().then(response => response.status !== 200 ? this.onFail(response) : (this.theStops = JSON.parse(response.data.body), this.isLoading = false, this.debug && console.log('FLIGHTINSERTFORM: getStops', response)))		
		},

		sendIt() {

			this.isLoading = true
			
			const delay = new Date()		
			delay.setHours(delay.getHours() + ~~this.inputFields.hours)
			delay.setMinutes(delay.getMinutes() + ~this.inputFields.mins)
			
			// create formdata object
			let formData = new FormData()
			
			formData.append('flight', JSON.parse(localStorage.getItem('flight'))[0].id)
			formData.append('after', this.currentItem.id)
			formData.append('stop', this.inputFields.stop)
			formData.append('departure', this.currentItem.departure)
			formData.append('arrive', (`${delay.getHours()}:${delay.getMinutes()}:00`))

			for(let key of formData.entries()) { this.debug && console.log('FLIGHTINSERTFORM: sendIt', key[0] + ', ' + key[1]) }
			
			Items.insert(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {

			this.debug && console.log('FLIGHTINSERTFORM: onSuccess', response)

			this.isLoading = false

			this.items = JSON.parse(response.data.body.items)
			this.debug && console.log('FLIGHTINSERTFORM: onSuccess: theItems', this.items)
		
			this.$store.commit('setItems', this.items)
			localStorage.setItem('items', JSON.stringify(this.items))	

			this.isSuccess = true

			this.theMessage.title = 'Halte toegevoegd'
			this.theMessage.subtitle = 'Succes!'
			this.theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
			this.theMessage.icon = 'insert'

			// this.$emit('emitToggleOffcanvas')
			// emits to flighteditpanel
			EventBus.$emit('updateItems', true)
		},

		onFail(response) {

			this.debug && console.log('FLIGHTINSERTFORM: onFail 404', response.data.message)

			this.isLoading = false

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'radar'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		validateIt() {

			this.isInvalid = false
			
			// set zero as value if mins are filled
			this.inputFields.mins != '' && this.inputFields.hours == '' && (this.inputFields.hours = '0')

			this.inputFields.stop == '' && (this.isInvalid = true, this.$refs.stop.classList.add('is-invalid'))
			this.inputFields.mins == '' && (this.isInvalid = true, this.$refs.mins.classList.add('is-invalid'))

			this.debug && this.isInvalid && console.log('FLIGHTINSERTFORM: handleSubmit: ISINVALID!')
			
			if(this.isInvalid) return false

			return true
		},
	}
}