import {EventBus} 		from '@/00_global/eventbus'

import Captains				from '@/00_services/api/Captains'


export default {
	name: 'PinConfirm',

	data() {
		return {
			debug: false,
			isLoading: true,
			pin: '',
			isDisabled: true,
			isInvalid: false,
		}
	},

	mounted() {

		this.isLoading = false
	},

	methods: {

		handleKeyClick(key) {

			this.isInvalid = false

			if(this.pin.length == 3) this.isDisabled = false

			if(this.pin.length == 4 && key != 10 && key != 11) return false
				
			this.debug && console.log('PINCONFIRM: handleKeyClick', key)
			
			switch(key) {
    		case 10: 
    			this.pin = ''
    			break
    		case 11: 
    			this.pin = this.pin.slice(0, -1)
    			break	
    		default:
    			this.pin = this.pin + key
    			break
    	}

			this.debug && console.log('PINCONFIRM: handleKeyClick', this.pin)
		},

		handleSubmit(e) {

			this.isLoading = true
			this.isDisabled = true

			e.preventDefault()

			this.debug && console.log('PINCONFIRM: handleSubmit', this.pin)

			let formData = new FormData()

			formData.append('pin', this.pin)

			Captains.checkPin(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))

		},

		onSuccess(response) {

			this.debug && console.log('PINCONFIRM: onSuccess')

			EventBus.$emit('toggleOffcanvas', false);

			EventBus.$emit('pinIsConfirmed', true)
		},

		onFail(response) {

			this.isLoading = false
			this.isDisabled = false

			this.debug && console.log('PINCONFIRM: onFail', response.status, response.data.message)

			this.isInvalid = true	
		},
	}
}