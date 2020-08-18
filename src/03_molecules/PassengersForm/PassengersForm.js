import {EventBus} 			from '@/00_global/eventbus'


export default {
	name: 'PassengersForm',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			isDisabled: false,
			theTimeStamp: this.viewData.timeStamp,
			nextStop: this.viewData.nextStop,
			secondStop: this.viewData.secondStop,
			flightInfo: this.viewData.flightInfo,
			departure: Object,
			items: Object,
			inputs: {
				people: {
					min: '',
					plus: '',
					current_people: !this.$store.state.passengers ? this.viewData.flightInfo.current_people : this.$store.state.passengers.people.current_people,
				},
				bikes: {
					min: '',
					plus: '',
					current_bikes: !this.$store.state.passengers ? this.viewData.flightInfo.current_bikes : this.$store.state.passengers.bikes.current_bikes,
				}
			},
		}
	},
	computed: {
		timeStamp() {
			this.isLoading = false
			return timeStamp => timeStamp.slice(0,-3)
		},
	},

	watch: {

		'inputs.people.plus': {
			handler(newVal,oldVal) {
			
				newVal > oldVal && newVal - oldVal <= 1 && this.inputs.people.current_people++
				newVal - oldVal > 1 && (this.inputs.people.current_people += newVal - oldVal)
				newVal < oldVal && (this.inputs.people.current_people -= oldVal - newVal)
				
				//this.debug && console.log('PASSENGERSFORM: watcher PLUS',newVal,oldVal)
			}
		},

		'inputs.people.min': {
			handler(newVal,oldVal) {
			
				newVal > oldVal && newVal - oldVal <= 1 && this.inputs.people.current_people--
				newVal - oldVal > 1 && (this.inputs.people.current_people -= newVal - oldVal)
				newVal < oldVal && (this.inputs.people.current_people += oldVal - newVal)
				
				//this.debug && console.log('peopleFORM: watcher MIN',newVal,oldVal)
			}
		},

		'inputs.bikes.plus': {
			handler(newVal,oldVal) {
			
				newVal > oldVal && newVal - oldVal <= 1 && this.inputs.bikes.current_bikes++ 
				newVal - oldVal > 1 && (this.inputs.bikes.current_bikes += newVal - oldVal)
				newVal < oldVal && (this.inputs.bikes.current_bikes -= oldVal - newVal)
				
				//this.debug && console.log('PASSENGERSFORM: watcher PLUS',newVal,oldVal)
			}
		},

		'inputs.bikes.min': {
			handler(newVal,oldVal) {
				
				newVal > oldVal && newVal - oldVal <= 1 && this.inputs.bikes.current_bikes--
				newVal - oldVal > 1 && (this.inputs.bikes.current_bikes -= newVal - oldVal)
				newVal < oldVal && (this.inputs.bikes.current_bikes += oldVal - newVal)

				//this.debug && console.log('PASSENGERSFORM: watcher MIN',newVal,oldVal)
			}
		}
	},
	
	methods: {
		
		handlePassengersClick() {

			this.isDisabled = false

			this.inputs.people.plus = 0
			this.inputs.bikes.plus = 0

			this.inputs.people.min = this.inputs.people.current_people
			this.inputs.bikes.min = this.inputs.bikes.current_bikes
		},

		handleSubmit() {
			
			if(!this.secondStop && this.inputs.people.current_people != 0 && this.inputs.bikes.current_bikes != 0) {
				this.isDisabled = true
				return false
			}

			// update passengers total 
			this.$store.commit('setPassengers', this.inputs)

			// save in localstorage
			localStorage.setItem('passengers', JSON.stringify(this.inputs))
     	
			this.debug && console.log('PASSENGERSFORM: handleSubmit: passengerinputs', this.inputs)

			EventBus.$emit('toggleOffcanvas', false)
			
			// check route for navigationduplicated error			
			this.$route.path != '/flight/current-stop' && this.$router.push('/flight/current-stop')
		},
	}
}