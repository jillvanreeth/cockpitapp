import {EventBus} 		from '@/00_global/eventbus'

import Flights				from '@/00_services/api/Flights'
import Malfunctions		from '@/00_services/api/Malfunctions'

import Tracker 				from '@/03_molecules/Tracker/Tracker.vue'


export default {
	name: 'MalfunctionsPanel',

	components: {
		Tracker,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			isDisabled: true,
			viewData: Object,
			tracker: {
				activeStep: this.$route.params.id,	
				steps:['Situeren', 'Opmerkingen','Bevestigen'],
			},
		}
	},

	mounted() {
		// clear storage
		if(this.$route.query.q == 'new') {
			this.debug && console.log('MALFUNCTIONSPANEL: mounted: clear storage new q',this.$route.query.q)
			localStorage.removeItem('malfunctionsSituation')
			localStorage.removeItem('malfunctionsRemarks')
			localStorage.removeItem('malfunctionsImage')
		}

		this.getFlightDetails()

		EventBus.$on('isDisabled', (isDisabled) => this.isDisabled = isDisabled)

		EventBus.$on('pinIsConfirmed', (isTrue) => isTrue && this.sendIt())
	},

	methods: {

		handleNextClick() {

			this.tracker.activeStep = (~~this.$route.params.id) + 1
			
			let theRoute = '/malfunctions/create/step-' + this.tracker.activeStep + '/' + this.tracker.activeStep
			
			this.debug && console.log('MALFUNCTIONSPANEL: handleNextClick', theRoute)
			
			this.$router.push(theRoute)
		},

		handleSubmit() {

			this.isLoading = true

			this.debug && console.log('MALFUNCTIONSPANEL: handleSubmit')

			EventBus.$emit('toggleOffcanvas', true, 'PinConfirm')
		},

		sendIt() {

			this.debug && console.log('MALFUNCTIONSPANEL: sendIt', this.viewData.flightInfo.current_ship_id)

			let flightId = JSON.parse(localStorage.getItem('flight'))[0].id

			let formData = new FormData()

			formData.append('flight', flightId)
			formData.append('ship', this.viewData.flightInfo.current_ship_id)
     	formData.append('shift', this.viewData.flightInfo.current_shift_id)
     	formData.append('category', localStorage.getItem('malfunctionsSituation'))
     	formData.append('remarks', localStorage.getItem('malfunctionsRemarks'))
     	formData.append('image', localStorage.getItem('malfunctionsImage'))

			for(let key of formData.entries()) { this.debug && console.log('MALFUNCTIONSPANEL: handleSubmit', key[0] + ', ' + key[1]) }

			Malfunctions.create(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))
		},

		onSuccess(response) {

			this.debug && console.log('MALFUNCTIONSPANEL: onSuccess', response)

			this.isLoading = false

			this.$router.push('/malfunctions')
		},

		getFlightDetails() {

			let flightId = JSON.parse(localStorage.getItem('flight'))[0].id

			Flights.detail(flightId).then(response => {
				if(response.status !== 200) this.onFail(response)

				if(response.status === 200) {

					this.debug && console.log('MALFUNCTIONSPANEL: getFlightDetails: onSuccess', response)

					this.viewData = {...this.viewData, flightInfo: JSON.parse(response.data.body.flight)}

					this.isLoading = false
				}

			})
		},

		onFail(response) {

			this.isLoading = false

			this.debug && console.log('MALFUNCTIONSPANEL: onFail', response.status, response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},
	},
}