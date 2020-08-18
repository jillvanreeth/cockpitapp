import Date 				from '@/02_atoms/Date/Date.vue'
import Time 				from '@/02_atoms/Time/Time.vue'
import Weather 			from '@/02_atoms/Weather/Weather.vue'

import Recap 				from '@/03_molecules/Recap/Recap.vue'

export default {
	name: 'SideInfo',

	props: {
		viewData: Object,
	},

	components: {
		Date,
		Time,
		Weather,
		Recap,
	},

	data() {
		return {
			debug: false,
			waitForIt: {
				weather: false,
				date: false,
				time: false
			},
			isLoading: false,
		}
	},

	watch: {
		
		waitForIt: {
			handler() {
				for(let key in this.waitForIt) {
					if(this.waitForIt[key]) {
 						this.isLoading = true
 					}
 					else {
 						this.isLoading = false
 						break
					} 
				}
			},
			deep: true
		}
	},

	methods: {
		isLoaded(component) {

			this.debug && console.log('SIDEINFO: isLoaded', component)
			
			for(let key in this.waitForIt) {
				key == component && (this.waitForIt[key] = true)
			}
		}
	}
}