import {EventBus} 			from '@/00_global/eventbus'

import Stewards 				from '@/00_services/api/Stewards'


export default {
	name: 'CrewForm',

	data() {
		return {
			debug: false,
			valid: true,
			inputs: {
				firstname: null,
				lastname:null,
			},
			classes: {
				isInvalid: 'is-invalid',
				isDisabled: 'is-disabled',
			}
		}
	},

	methods: {
		
		handleSubmit(e) {

			e.preventDefault()

			this.debug && console.log('CREWFORM: handleSubmit')

			this.validateIt() && this.sendIt()

		},

		validateIt() {
			
			this.debug && console.log('CREWFORM: validateIt');

			this.valid = true

			!this.inputs.firstname && (this.$refs.firstname.classList.add(this.classes.isInvalid), this.valid = false) 
				
			!this.inputs.lastname && (this.$refs.lastname.classList.add(this.classes.isInvalid), this.valid = false) 

			if(!this.valid) {
				return false
			} 

			return true
		},

		sendIt() {
			
			// disable send button
			this.$refs.submit.classList.add(this.classes.isDisabled)

			let formData = new FormData()
			
      formData.append('firstname', this.inputs.firstname)
     	formData.append('lastname', this.inputs.lastname)

		  for(let key of formData.entries()) { this.debug && console.log('CREWFORM: sendIt', key[0] + ', ' + key[1]) }
		
		 	Stewards.create(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))
		},

		onSuccess(response) {

			this.debug && console.log('CREWFORM: onSucces', JSON.parse(response.data.body))

			let theMessage = {}
					theMessage.title = 'Steward toegevoegd'
					theMessage.subtitle = 'Succesvol!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'personAdded'

			EventBus.$emit('toggleOffcanvas', true, 'Success', theMessage)

			this.resetForm()

			this.$emit('getStewards')
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

		handleKeyevent(e) {

			this.debug && console.log('CREWFORM: handleKeyevent', e.target)

			e.target.parentNode.classList.remove(this.classes.isInvalid)
		},

		handleBackClick() {

			this.debug && console.log('CREWFORM: handleBackClick')
			
			this.resetForm()

			this.$emit('showCrewForm')
		},

		resetForm() {
			
			this.inputs.firstname = ''
			this.inputs.lastname = ''

			this.$refs.firstname.classList.remove(this.classes.isInvalid)
			this.$refs.lastname.classList.remove(this.classes.isInvalid)

			this.$refs.submit.classList.remove(this.classes.isDisabled)
		}
	}
}