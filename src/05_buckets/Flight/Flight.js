import FlightEditPanel 	from '@/04_organisms/FlightEditPanel/FlightEditPanel.vue'
import FlightOverview 	from '@/04_organisms/FlightOverview/FlightOverview.vue'
import FlightPanel 			from '@/04_organisms/FlightPanel/FlightPanel.vue'


export default {
	name: 'Flight',
	props: {
		title: ['title'],
	},

	components: {
		FlightEditPanel,
		FlightOverview,
		FlightPanel,		
	},

	data() {
		return {
			debug: false,
		}
	},

	methods: {

		handlePrevClick() {

			this.debug && console.log('FLIGHT: handlePrevClick')

			this.$router.go(-1)
		},
	},
}