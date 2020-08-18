import axios 				from '@/00_services'
import {EventBus} 	from '@/00_global/eventbus'

export default {

	create(formData) {
		return axios.post('/checklists/create', formData)
				.then(response => response)
				.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	},

	detail(checklistId) {
		return axios.get(`/checklists/detail?checklist=${checklistId}`)
			.then(response => response)
			.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	},

	update(formData) {
		return axios.post('checklists/update', formData, { headers: {'Content-Type': 'multipart/form-data'}}) 
			.then(response => response)
			.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	},

	complete(formData) {
		return axios.post('/checklists/complete', formData)
				.then(response => response)
				.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	}
}