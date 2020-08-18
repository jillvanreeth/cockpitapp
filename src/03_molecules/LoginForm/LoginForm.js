import Auth 				from '@/00_services/api/Auth'
import Flights			from '@/00_services/api/Flights'

import {EventBus} 	from '@/00_global/eventbus'


export default {
	name: 'LoginForm',

	data() {
		return {
			debug: false,
			isValid: true,
			isDisabled: false,
			isLoading: false,
			noMatchingCredentials: false,
			inputs: {
				email: null,
				pin: null,
			},
		}
	},

	methods: {
		
		handleSubmit(e) {

			e.preventDefault()

			this.debug && console.log('LOGINFORM: handleSubmit')

			this.isDisabled = true

			this.validateIt() && this.sendIt()
		},

		validateIt() {
			
			this.debug && console.log('LOGINFORM: validateIt');

			this.isValid = true;

			!this.inputs.email && (this.$refs.email.classList.add('is-invalid'), this.isValid = false) 
				
			!this.inputs.pin && (this.$refs.pin.classList.add('is-invalid'), this.isValid = false) 

			if(!this.isValid) {
				return false
			} 

			return true
		},	

		sendIt() {
			
			this.isLoading = true

			let formData = new FormData();
			
    	formData.append('email', this.inputs.email)
   		formData.append('pin', this.inputs.pin)

		  for(let key of formData.entries()) { this.debug && console.log('LOGINFORM: sendIt', key[0] + ', ' + key[1]); }
		
			Auth.refreshToken(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))
		},

		onSuccess(response) {

			this.isLoading = false
		
			this.debug && console.log('LOGINFORM: onSucces', response)
			
			if(response.status !== 200) return false
		
			// clear storage
			//localStorage.clear()

			localStorage.setItem('token', response.data.body.api_token)
			localStorage.setItem('concession', response.data.body.concession)
			
			let flight = null

			localStorage.getItem('flight') && (flight = JSON.parse(localStorage.getItem('flight'))[0].id)
			
			flight && Flights.detail(flight).then(response => {
				if(response.status === 404) {
					this.onFail(response) 
				}
				else if(response.status === 401) {
					this.$router.push('/start/step-1/1')
				} 
				else {
					this.$router.push('/dashboard')
				}
			})

			!flight && this.$router.push('/start/step-1/1')
		},

		onFail(response) {

			this.debug && console.log('LOGINFORM: onFail', response)

			this.isLoading = false
			

			if(response.status === 404) {
				this.noMatchingCredentials = !false
				return false 
			}
			
			let theMessage = {}
					theMessage.status = 401
					theMessage.title = 'Unauthorized'
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			
			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
			this.isDisabled = false
		},

		handleKeyevent(e) {

			this.debug && console.log('LOGINFORM: handleKeyevent', e.target)

			this.noMatchingCredentials = false

			this.isDisabled = false
			
			e.target.parentNode.classList.remove('is-invalid')
		},
	}
}