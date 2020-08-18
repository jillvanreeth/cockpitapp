export default {
	name: 'Recap',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			theStop: this.viewData.nextStop ? this.viewData.nextStop.stop.name : localStorage.getItem('lastStop'),
		}
	},

	mounted() {
		this.debug && console.log('RECAP: mounted', this.$store)
	}
}