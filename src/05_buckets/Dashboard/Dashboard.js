import Flights				from '@/00_services/api/Flights'


import Logout 					from '@/02_atoms/Logout/Logout.vue'

import DashboardPanel 	from '@/04_organisms/DashboardPanel/DashboardPanel.vue'

export default {
	name: 'Dashboard',
	
	components: {
		DashboardPanel,
		Logout,
	},

	data() {
		return {
			theCaptain: null,
		}
	},

	methods: {

		emitCaptain(captain) {

			this.theCaptain = captain

		}
	}
}