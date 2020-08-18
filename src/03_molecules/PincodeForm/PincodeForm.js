import Auth from '@/00_services/api/Auth'

import {EventBus} 		from '@/00_global/eventbus'


export default {
	name: 'PincodeForm',

	data() {
		return {
			debug: false,
			isValid: true,
			isLoading: false,
			isSuccess: false,
			inputs: {
				email: null,
			},
		}
	},

	methods: {

		handleSubmit(e) {

			e.preventDefault()

			this.isLoading = true

			this.debug && console.log('PINCODEFORM: handleSubmit')

			const theForm = e.target;

			this.validateIt() && this.sendIt();
			
		},

		handleKeyevent(e) {

			this.debug && console.log('PINCODEFORM: handleKeyevent', e.target)

			e.target.parentNode.classList.remove('is-invalid')
		},

		validateIt() {

			this.isValid = true

			this.inputs.email == '' && (this.$refs.email.classList.add('is-invalid'), this.isValid = false) 
			!this.validateEmail(this.inputs.email) && (this.$refs.email.classList.add('is-invalid'), this.isValid = false) 

			if(!this.isValid) {
				this.debug && console.log('PINCODEFORM: validateIt: INVALID')
				return false;
			} 

			this.debug && console.log('PINCODEFORM: validateIt VALID')
			return true;
		},

  	sendIt() {

    	let formData = new FormData();

      formData.append('email', this.inputs.email);

			this.debug && console.log('PINCODEFORM: sendIt', formData)
      
      Auth.sendPin(formData).then(response => response.status === 404 ? this.onFail(response) : this.onSuccess(response))		
  	},

  	onSuccess(response) {

			this.debug && console.log('PINCODEFORM: onSuccess', response)

			this.isLoading = false
			this.isSuccess = true

			let theMessage = {}
					theMessage.title = 'Bekijk je inbox'
					theMessage.subtitle = 'Succesvol verstuurd'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'pinSend'
					theMessage.button = 'Terug naar login'
			
			EventBus.$emit('toggleOffcanvas', true, 'Success', theMessage)
		},

		onFail(response) {

			this.isLoading = false
			this.debug && console.log('PINCODEFORM: onFail 404', response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)

		},

  	validateEmail(theValue) {

    	return (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(theValue);

  	},
	}	
}