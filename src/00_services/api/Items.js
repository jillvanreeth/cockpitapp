import axios 				from '@/00_services'
import {EventBus} 	from '@/00_global/eventbus'


export default {
	
	pass(params) {
		return axios.post(`/items/pass?${params}`)
		.then(response => response) 
		.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	},	

	skip(formData) {
		return axios.post('/items/skip',formData)
		.then(response => response) 
		.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	},	

	insert(formData) {
		return axios.post('/items/insert',formData)
		.then(response => response) 
		.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	},	
}