export default {
	name: 'Tracker',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			theSteps: this.viewData.steps,
		}
	},

	methods: {

	}
}