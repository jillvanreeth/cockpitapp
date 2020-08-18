import axios 				from '@/00_services'
import {EventBus} 	from '@/00_global/eventbus'


export default {

	overview(shipId) {
		return axios.get(`malfunctions/overview?ship=${shipId}`)
			.then(response => response)
			.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )		
	},

	create(formData) {
		return axios.post('/malfunctions/create',formData)
		.then(response => response) 
		.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	}
}