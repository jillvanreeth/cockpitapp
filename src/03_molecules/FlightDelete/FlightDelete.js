export default {
	name: 'FlightDelete',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			theCurrentItem: this.viewData.currentItem,
		}
	},

	methods: {

		handleDeleteClick() {

			this.debug && console.log('FLIGHTDELETE: handleDeleteClick')

			EventBus.$emit('toggleOffcanvas', false)
		},
	}
}