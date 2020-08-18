import axios 				from '@/00_services'
import {EventBus} 	from '@/00_global/eventbus'


export default {
	
	create(formData) {
		return axios.post('/flights/create', formData)
		.then(response => response)
		.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	},

	detail(flight) {
		return axios.get(`/flights/detail?flight=${flight}`)
			.then(response => response)
			.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )		
	},

	weather(flight) {
		return axios.get(`/flights/weather?lat=${localStorage.lat}&lon=${localStorage.lng}&flight=${flight}`)
			.then(response => response.data.body)
			.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )		
	},

	stop(formData) {
		return axios.post('/flights/stop', formData)
		.then(response => response)
		.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	},

	incompletes(shift) {
		return axios.get(`/flights/not-flying?shift=${shift}`)
			.then(response => response)
			.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )		
	},

	update(formData) {
		return axios.post('/flights/update', formData)
		.then(response => response)
		.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	},

	minimal(flight) {
		return axios.get(`/flights/minimal?flight=${flight}`)
			.then(response => response)
			.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )		
	}
}