import {EventBus} 		from '@/00_global/eventbus'

import Items					from '@/00_services/api/Items'
import TimeStamp 			from '@/00_services/TimeStamp'


export default {
	name: 'FlightCurrent',

	props: {
		timeRemaining: String,
		secondStop: Object,
		nextStop: Object,
		flightInfo: Object,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			timeIsloaded: false,
			theTimeStamp: localStorage.getItem('timeStamp'),
			theTimeRemaining: this.timeRemaining,
			theNextStop: this.nextStop,
			theSecondStop: this.secondStop,
			theFlightInfo: this.flightInfo,
			currentPassengers: this.$store.state.passengers ? this.$store.state.passengers : JSON.parse(localStorage.getItem('passengers')),
		}
	},

	watch: {
		timeRemaining: {
			handler(newVal, oldVal) {
				this.debug && console.log(newVal, oldVal)
				this.theTimeRemaining = newVal
			}
		}
	},

	computed: {
		timeStamp() {
			return timeStamp => timeStamp.substring(0, timeStamp.length - 3)
		},

		timeOfDeparture() {
			return departure => departure.substring(0, departure.length - 3)
		},
	},

	methods: {

		beforeRouteLeave (to, from, next) {
			if(to.name !== 'next-stop') { 
				console.log('before leave')

			}
		},

		handleShiftClick() {

			
			// finish current flight first, -> flightconfirm
			//this.viewData.flightInfo.complete == 1 && localStorage.removeItem('flightInfo')
			
			let departured = TimeStamp.getTime()

     	let itemParams = `item=${this.theNextStop.id}&flight=${this.theNextStop.flight_id}&arrived=${this.theTimeStamp}&departured=${departured}&people_on=${this.currentPassengers.people.plus}&people_off=${this.currentPassengers.people.min}&bikes_on=${this.currentPassengers.bikes.plus}&bikes_off=${this.currentPassengers.bikes.min}`
     	
     	let destinationRoute = '/start'

     	let viewData = {...viewData, itemParams: itemParams, destinationRoute: destinationRoute }

			this.debug && console.log('FLIGHTCURRENT: handleShiftClick', viewData)

			EventBus.$emit('toggleOffcanvas', true, 'FlightConfirm', viewData)

			 // this.$router.push('/flight/edit')
		},

		handleFinishClick() {

			// check if the passengers count is up to date
			this.currentPassengers = this.$store.state.passengers ? this.$store.state.passengers : JSON.parse(localStorage.getItem('passengers'))

			// save the last stop for recap
			localStorage.setItem('lastStop', this.theNextStop.stop.name)

			let departured = TimeStamp.getTime()

     	let itemParams = `item=${this.theNextStop.id}&flight=${this.theNextStop.flight_id}&arrived=${this.theTimeStamp}&departured=${departured}&people_on=${this.currentPassengers.people.plus}&people_off=${this.currentPassengers.people.min}&bikes_on=${this.currentPassengers.bikes.plus}&bikes_off=${this.currentPassengers.bikes.min}`
     	
     	let destinationRoute = '/flight/overview'

     	let viewData = {...viewData, itemParams: itemParams, destinationRoute: destinationRoute }
			
			this.debug && console.log('FLIGHTCURRENT: handleFinishClick',viewData)

			EventBus.$emit('toggleOffcanvas', true, 'FlightConfirm', viewData)
		},

		handlePassengersClick() {

			this.debug && console.log('FLIGHTCURRENT: handlePassengersClick')

			let viewData = {...viewData, timeStamp: this.theTimeStamp, flightInfo: this.theFlightInfo, nextStop: this.theNextStop, secondStop: this.theSecondStop} 

			EventBus.$emit('toggleOffcanvas', true, 'PassengersForm', viewData)
		},

		handleGoToNextStop() {
			
			this.isLoading = true

			let departured = TimeStamp.getTime()
			
			// check if the passengers count is up to date
			this.currentPassengers = this.$store.state.passengers ? this.$store.state.passengers : JSON.parse(localStorage.getItem('passengers'))

			// &item=19&flight=5&concession=1&arrived=08:00:00&departured=08:01:00&people_on=2&people_off=1&bikes_on=1&bikes_off=1
     	let itemParams = `item=${this.theNextStop.id}&flight=${this.theNextStop.flight_id}&arrived=${this.theTimeStamp}&departured=${departured}&people_on=${this.currentPassengers.people.plus}&people_off=${this.currentPassengers.people.min}&bikes_on=${this.currentPassengers.bikes.plus}&bikes_off=${this.currentPassengers.bikes.min}`
     	
     	this.debug && console.log('FLIGHTCURRENT: handleGoToNextStop', itemParams)
     	
     	Items.pass(itemParams).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {
			
			this.departure = response.data.body.departure_on
			this.items = JSON.parse(response.data.body.items)
			let flightInfo = JSON.parse(response.data.body.flight)
			
			this.debug && console.log('FLIGHTCURRENT: onSuccess', 'items: ',this.items)
			this.debug && console.log('FLIGHTCURRENT: onSuccess', 'flightInfo:', flightInfo)

			// pass the updated flightinfo over
			this.$store.commit('setDeparture', this.departure)
			this.$store.commit('setFlightInfo', flightInfo)
			this.$store.commit('setItems', this.items)
			
			localStorage.setItem('items', JSON.stringify(this.items))		
		
			this.isLoading = false

			EventBus.$emit('updateItems', true)
			
			EventBus.$emit('toggleOffcanvas', false);

			this.$store.state.departure != '' && this.$router.push('/flight/next-stop') 
		},

		onFail(response) {

			this.isLoading = false

			this.debug && console.log('FLIGHTCURRENT: onFail 404', response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			
			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		isLoaded(state) {
			
			if(this.timeIsloaded == state) return false 
			
			this.isLoading = false
			this.timeIsloaded = state
			
			this.debug && console.log('FLIGHTCURRENT: isLoaded time', state)
		},

		getTimeDiff(timeStamp) {
				
			let plusOrMin = '+'

			const today = new Date()	
			let timeOfArrival = new Date()
			let [hh,mm,ss] = timeStamp.split(':')

			timeOfArrival.setHours(hh)
			timeOfArrival.setMinutes(mm)
			timeOfArrival.setSeconds(ss)

			let diff = timeOfArrival.getTime() - today.getTime()

			let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			diff -= hours * (1000 * 60 * 60)
			hours < 0 && (plusOrMin = '-')
			hours = hours.toString().replace(/[a-z-]/g, '')
			hours < 10 && (hours = '0' + hours)

			let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
			diff -= mins * (1000 * 60)
			mins < 0 && (plusOrMin = '-')
			mins = mins.toString().replace(/[a-z-]/g, '')
			mins < 10 && (mins = '0' + mins)

			let seconds = Math.floor((diff % (1000 * 60)) / 1000)
			hours < 0 && (plusOrMin = '-')
			seconds < 10 && (seconds = '0' + seconds)
			seconds = seconds.toString().replace(/[a-z-]/g, '')

			timeStamp = (hours == '00' && mins == '00') && (`${plusOrMin} ${mins}:${seconds}`) 
			timeStamp = (hours == '00' && mins != '00') && (`${plusOrMin} ${mins}:${seconds}`) 
			timeStamp = (hours != '00' && mins != '00') && (`${plusOrMin} ${hours}:${mins}`) 
			return timeStamp
		},
	}
}