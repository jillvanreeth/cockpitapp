import axios 				from '@/00_services'
import {EventBus} 	from '@/00_global/eventbus'


export default {

	overview() {
		return axios.get(`/stops/overview`)
			.then(response => response)
			.catch(error => error.response.status !== 500 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
	},
}

