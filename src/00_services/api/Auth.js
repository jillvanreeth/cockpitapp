import axios 				from '@/00_services'
import {EventBus} 	from '@/00_global/eventbus'


export default {

	refreshToken(formData) {
			return axios.post('refreshtoken', formData)
				.then(response => response)
				.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )					
	},
      
	sendPin(formData) {
		return axios.post('sendpin', formData)
		.then(response => response.data)
		.catch(error => error.response.status === 404 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	}
}