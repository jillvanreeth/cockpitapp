import {EventBus} 		from '@/00_global/eventbus'

import Flights				from '@/00_services/api/Flights'

import Crew 					from '@/03_molecules/Crew/Crew.vue'
import CrewForm 			from '@/03_molecules/CrewForm/CrewForm.vue'
import Shift 					from '@/03_molecules/Shift/Shift.vue'
import ShiftResume 		from '@/03_molecules/ShiftResume/ShiftResume.vue'
import Ship 					from '@/03_molecules/Ship/Ship.vue'
import Tracker 				from '@/03_molecules/Tracker/Tracker.vue'
import Tracks 				from '@/03_molecules/Tracks/Tracks.vue'

export default {
	name: 'Steps',

	components: {
		Crew,
		CrewForm,
		Shift,
		ShiftResume,
		Ship,
		Tracker,
		Tracks,
	},

	data() {
		return {
			debug: false,
			tracker: {
				activeStep: this.$route.params.id,	
				steps:['Traject', 'Dienstregeling','Schip', 'Bemanning'],
			},
			shiftIsIncomplete: false,
			isDisabled: true,	
			resumedFlightInfo: localStorage.getItem('resumedFlightInfo') ? JSON.parse(localStorage.getItem('resumedFlightInfo')) : null,	
			location: {
				lng: null,
				lat: null,
			},
		}
	},

	created() {
		
		

		EventBus.$on('isDisabled', (isDisabled) => this.isDisabled = isDisabled)
	},

	mounted() {

		
	},

	methods: {
		
		getLatLng(position) {

			this.location.lng = position.coords.longitude;
  		this.location.lat = position.coords.latitude;

  		this.debug && console.log('WEATHER: getLatLong', this.location.lng, this.location.lat)	
		},

		emitNewShift() {

			this.debug && console.log('STEPS: emitNewShift')

			// clear resumed flight info 
			// localStorage.removeItem('resumedFlightInfo')

			++this.tracker.activeStep  

			this.$router.push('/start/step-3/3')
		},

		emitResumedShift(flightInfo) {

			this.debug && console.log('STEPS: emitResumedShift', flightInfo)

			this.resumedFlightInfo = flightInfo

			// save resumed flight info 
			localStorage.setItem('resumedFlightInfo', JSON.stringify(this.resumedFlightInfo))

			++this.tracker.activeStep  

			this.$router.push('/start/step-3/3')
		},

		emitIncompleteShift(state) {

			this.debug && console.log('STEPS: emitIncompleteShift',state)

			this.shiftIsIncomplete = state
		},

		handleNextClick() {

			if(this.shiftIsIncomplete) {
				
				let theRoute = `/start/step-${this.tracker.activeStep}/${this.tracker.activeStep}/resume`
					
				this.debug && console.log('STEPS: handleNextClick: shiftIsIncomplete', theRoute)
				this.$router.push(theRoute)
			} 
			else {
				
				++this.tracker.activeStep  
			
				let theRoute = `/start/step-${this.tracker.activeStep}/${this.tracker.activeStep}`
				this.$router.push(theRoute)
				
				this.debug && console.log('STEPS: handleNextClick', theRoute)
			}

			// reset state
			this.shiftIsIncomplete = false
		},

		handlePrevClick() {

			// this.shiftIsIncomplete ? this.tracker.activeStep : --this.tracker.activeStep
			
			--this.tracker.activeStep

			let theRoute = '/start/step-' + this.tracker.activeStep + '/' + this.tracker.activeStep
			
			this.debug && console.log(theRoute)
			
			this.$router.push(theRoute)

			// reset state
			this.shiftIsIncomplete = false
		},

		handleSubmit() {

			this.debug && console.log('STEPS: handleSubmit')

			let formData = new FormData()
			let stewards = []
			let position
			
			function getLocation(callback) {
					
				if(navigator.geolocation) {
	        let lat_lng = navigator.geolocation.getCurrentPosition(function(position){
			    
			      let user_position = {}
			          user_position.lat = position.coords.latitude 
			          user_position.lng = position.coords.longitude 

			         	formData.append('lon', user_position.lng)
		  					formData.append('lat', user_position.lat)

			          callback(user_position)
			    });
			  } 
			}

			for(let key of JSON.parse(localStorage.getItem('crew'))) stewards.push(key)
			
			formData.append('ship', JSON.parse(localStorage.getItem('ship')).id)
			formData.append('shift', JSON.parse(localStorage.getItem('shift'))[0].id)
			formData.append('stewards', stewards)
			
			this.resumedFlightInfo && formData.append('flight', this.resumedFlightInfo.id)
			!this.resumedFlightInfo && formData.append('start_stop',0)

			for(let key of formData.entries()) { this.debug && console.log('STEPS: handleSubmit', key[0] + ', ' + key[1]) }
		
			if(this.resumedFlightInfo) {
				Flights.update(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response, 'updated')) 
			}
			else {
					
				getLocation((lat_lng) => {
				  lat_lng && Flights.create(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response, 'created'))
				});
	
			} 
		},

		onSuccess(response, api) {
			
			let flight = []

			flight.push(JSON.parse(response.data.body.flight))

			localStorage.setItem('flight', JSON.stringify(flight))

			this.debug && console.log('STEPS: onSucces:', api, flight)

			api == 'updated' ? this.$router.push('/flight') : this.$router.push('/checklist')
		},

		onFail(response) {

			this.debug && console.log('STEPS: onFail 404', response.data.message)

			this.isLoading = false

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'radar'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},
	}
}