export default {
	name: 'Widgets',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
		}
	},

	methods: {

		handleChecklistClick() {
			// this.debug && console.log('WIDGETS: handleChecklistClick')

			// // save token
			// let token = localStorage.getItem('token')

			// // reset localstore when creating a new checklist
			// this.viewData.flightInfo.complete == 1 && localStorage.clear()

			// localstore.setItem('token', token)
		}
	}
}