export default {
	name: 'MalfunctionsConfirm',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			theFlightInfo: this.viewData.flightInfo,
		}
	},

	mounted() {

		this.theFlightInfo = {...this.theFlightInfo, _ship: JSON.parse(localStorage.getItem('ship'))[0].name}
		this.theFlightInfo = {...this.theFlightInfo, _remark: localStorage.getItem('malfunctionsRemarks')}
		this.theFlightInfo = {...this.theFlightInfo, _situation: localStorage.getItem('malfunctionsSituation')}
		
		this.isLoading = false
	},

	methods: {

	}
}