import {EventBus} 			from '@/00_global/eventbus'

import Flights				from '@/00_services/api/Flights'
import Malfunctions 		from '@/00_services/api/Malfunctions'


export default {
	name: 'MalfunctionsOverview',

	data() {
		return {
			debug: false,
			isLoading: true,
			shipId: JSON.parse(localStorage.getItem('ship'))[0].id,
			flightId: JSON.parse(localStorage.getItem('flight'))[0].id,
			theMalfunctions: null,
			malfunctionTime: null,
			flightInfo: Object,
		}
	},

	mounted() {

		this.getMalfunctions()
		this.getFlightDetails()
	},

	methods: {

		handleDetailClick(malfunction) {

			this.debug && console.log('MALFUNCTIONSOVERVIEW: handleDetailClick', malfunction)
			
			let viewData = {...viewData, malfunction: malfunction, flightInfo: this.flightInfo}
			
			EventBus.$emit('toggleOffcanvas', true, 'MalfunctionsDetail', viewData)
		},

		getMalfunctions() {

			Malfunctions.overview(this.shipId).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		getFlightDetails() {

			Flights.detail(this.flightId).then(response => response.status !== 200 ? this.onFail(response) : this.flightInfo = JSON.parse(response.data.body.flight))		
		},

		onSuccess(response) {

			this.isLoading = false

			this.debug && console.log('MALFUNCTIONSOVERVIEW: onSuccess', JSON.parse(response.data.body))

			this.theMalfunctions = JSON.parse(response.data.body)
		},

		onFail(response) {

			this.isLoading = false

			this.debug && console.log('MALFUNCTIONSOVERVIEW: onFail', response.status, response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		formatDateOfMalfunction(malfunction) {

			let dateStamp = new Date() 
			let theDate = malfunction.created_at.substring(0, malfunction.created_at.length - 8)
			
			this.debug && console.log('MALFUNCTIONSOVERVIEW: formatTimeOfMalfunction', malfunction.created_at, theDate)

			return dateStamp == theDate ? 'Vandaag' : theDate
		},

		formatTimeOfMalfunction(malfunction) {
			
			let theTime = malfunction.created_at.substring(10, malfunction.created_at.length - 3)
			
			this.debug && console.log('MALFUNCTIONSOVERVIEW: formatTimeOfMalfunction', malfunction.created_at, theTime)

			return theTime
		},
	}
}