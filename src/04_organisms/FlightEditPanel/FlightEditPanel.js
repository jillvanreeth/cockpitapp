import {EventBus} 		from '@/00_global/eventbus'

import Flights				from '@/00_services/api/Flights'
import Stops					from '@/00_services/api/Stops'

import FlightInsertForm 	from '@/03_molecules/FlightInsertForm/FlightInsertForm.vue'


export default {
	name: 'FlightEditPanel',

	components: {
		FlightInsertForm,
		// emitToggleOffcanvas: Function,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			showOffcanvas: false,
			flightInfo: Object,
			theItems: Array,
			theStops: Object,
			currentItem: Object,
			currentRef: null,
		}
	},

	mounted() {

		this.getStops()
	},

	created() {

		EventBus.$on('updateItems', () => {
			
			this.debug && console.log('FLIGHTEDITPANEL: Eventbus')
			this.getFlightDetails()
		})
	},

	methods: {

		beforeEnter: (el) => (el.style.display = 'none',el.style.opacity = 0),

		afterEnter: (el,done) => (el.style.display = 'flex', el.style.opacity = 1),

	  leave: (el,done) => (el.style.opacity = 0, done()),

		handleInsertClick(item,index) {

			this.debug && console.log('FLIGHTEDITPANEL: handleInsertClick', item,index)
			
			this.currentItem = item
			
			this.currentRef = this.$refs.theItems[index]
			this.currentRef.classList.add('is-active')

			this.showOffcanvas = true
		},

		handleDeleteClick(item) {

			this.debug && console.log('FLIGHTEDITPANEL: handleDeleteClick',item)
			this.currentItem = item

			let viewData = { ...viewData, flightInfo: this.flightInfo, nextStop: this.currentItem }

			EventBus.$emit('toggleOffcanvas', true, 'FlightSkipForm', viewData)
		},

		getStops() {
			
			this.debug && console.log('FLIGHTEDITPANEL: getStops')
				
			Stops.overview().then(response => response.status !== 200 ? this.onFail(response) : (this.theStops = JSON.parse(response.data.body)), this.getFlightDetails())		
			
		},

		getFlightDetails() {

			this.debug && console.log('FLIGHTEDITPANEL: getFlightDetails')

			let flight = JSON.parse(localStorage.getItem('flight'))[0].id	
			
			Flights.detail(flight).then(response => response.status === 404 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {

			this.debug && console.log('FLIGHTEDITPANEL: onSuccess', response)

			// filter out the skipped items
			this.theItems = response.data.body.all_items.filter(item => item.skipped == 0)

			this.flightInfo = JSON.parse(response.data.body.flight)
			this.isLoading = false
		},

		onFail(response) {

			this.debug && console.log('FLIGHTEDITPANEL: onFail', response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		emitToggleOffcanvas() {
			
			this.debug && console.log('FLIGHTEDITPANEL: closeOffcanvas')

			// gets called from flightinsert (emit event)
			this.showOffcanvas = false

			// reset currentitem
			this.currentItem = null
			this.currentRef.classList.remove('is-active')
		},
	}
}