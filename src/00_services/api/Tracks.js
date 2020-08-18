import axios 				from '@/00_services'
import {EventBus} 	from '@/00_global/eventbus'


export default {

	overview() {
		return axios.get(`/tracks/overview`)
			.then(response => response)
			.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )		
	},

	shifts(track) {
		return axios.get(`/tracks/shifts?track=${track}`)
		.then(response => response)
		.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )		
	}
}