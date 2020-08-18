import axios 				from '@/00_services'
import {EventBus} 	from '@/00_global/eventbus'


export default {

	today() {
		return axios.get(`/concessions/today`)
			.then(response => JSON.parse(response.data.body))
			.catch(error => error.response.status === 404 ? error.response : EventBus.$emit('toggleOffcanvas', true, 'Whoops') )
			//.catch(error => error.response)
	},
}

