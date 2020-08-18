import {EventBus} 				from '@/00_global/eventbus'

import TimeStamp 					from '@/00_services/TimeStamp'


export default {
	name: 'FlightNext',

	props: {
		secondStop: Object,
		nextStop: Object,
		flightInfo: Object,
	},

	data() {
		return {
			debug: false,
			timeIsloaded: false,
			timeRemaining: null,
			isLoading: true,
			theNextStop: this.nextStop,
			theSecondStop: this.secondStop,
			theFlightInfo: this.flightInfo,
			currentPassengers: this.$store.state.passengers ? this.$store.state.passengers : JSON.parse(localStorage.getItem('passengers')),
		}
	},

	computed: {
		timeOfDeparture() {

			return departure => departure.substring(0, departure.length - 3)
		},
	},

	mounted() {
		
		this.getRemainingTime() 
	},

	methods: {
		
		handleSkipClick() {

			this.debug && console.log('FLIGHTSTOPS: handleSkipClick')

			let viewData = {...viewData, flightInfo: this.theFlightInfo, nextStop: this.theNextStop, secondStop: this.theSecondStop} 

			EventBus.$emit('toggleOffcanvas', true, 'FlightSkipForm', viewData)
		},

		handleArrivedClick() {

			this.debug && console.log('FLIGHTSTOPS: handleArrivedClick')
				
			let viewData = {...viewData, timeStamp: TimeStamp.getTime(), flightInfo: this.theFlightInfo, nextStop: this.theNextStop, secondStop: this.theSecondStop} 
			
			localStorage.setItem('timeStamp', viewData.timeStamp)		
			
			EventBus.$emit('toggleOffcanvas', true, 'PassengersForm', viewData)
		},
		
		getRemainingTime() {
			
			setInterval(function () {
				let self = this
				
				const today = new Date()	
				let timeOfArrival = new Date()
				let [hh,mm,ss] = this.theNextStop.departure.split(':');

				timeOfArrival.setHours(hh) // set the hours, using implicit type coercion
				timeOfArrival.setMinutes(mm)
				timeOfArrival.setSeconds(ss)

				let diff = today.getTime() - timeOfArrival.getTime();

				let hours = Math.floor(diff / (1000 * 60 * 60));
				diff -= hours * (1000 * 60 * 60);

				let mins = Math.floor(diff / (1000 * 60));
				
				diff -= mins * (1000 * 60);
				mins < 10 && (mins = '0' + mins)

				this.timeRemaining = hours + ':' + mins

				//this.debug && console.log('FLIGHTSTOPS: getRemainingTime', this.timeRemaining)
			 }.bind(this), 1000)	
		},

		isLoaded(state) {
			
			if(this.timeIsloaded == state) return false 
			
			this.isLoading = false
			this.timeIsloaded = state
			this.debug && console.log('FLIGHTNEXT: isLoaded time', state)
		},
	}
}