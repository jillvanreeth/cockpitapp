import {EventBus} 		from '@/00_global/eventbus'

import Flights				from '@/00_services/api/Flights'
import Notifications 	from '@/00_services/api/Notifications'


export default {
	name: 'FlightOverview',

	data() {
		return {
			debug: true,
			isLoading: true,
			flightInfo: Object,
			theNotifications: Object,
			theItems: Array,
			theStops: Object,
		}
	},

	mounted() {

		this.getFlightInfo()	
	},

	computed: {
		departured() {
			return departured => departured.substring(0, departured.length - 3)
		},	
	},

	methods: {

		handleNotificationsClick(theNotification) {

			this.debug && console.log('FLIGHTOVERVIEW: handleNotificationsClick', theNotification)

			let viewData = {...viewData, notification: theNotification, isNew: false }
			
			EventBus.$emit('toggleOffcanvas', true, 'NotificationsDetail', viewData)
		},

		getNotifications() {

			this.debug && console.log('FLIGHTOVERVIEW: getNotifications')

			Notifications.overview(this.flightInfo.track_id).then(response => response.status !== 200 ? this.onFail(response) : (this.theNotifications = JSON.parse(response.data.body)))	
		},

		getFlightInfo() {
			
			this.debug && console.log('FLIGHTOVERVIEW: getFlightInfo')
			
			let flight = JSON.parse(localStorage.getItem('flight'))[0].id	
			
			Flights.detail(flight).then(response => response.status === 404 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {

			this.debug && console.log('FLIGHTOVERVIEW: onSuccess', response)

			this.theItems = response.data.body.all_items
			this.flightInfo = JSON.parse(response.data.body.flight)
			this.isLoading = false

			// remove the skipped items
			this.theItems = this.theItems.filter(item => !item.skipped)
			
			this.getNotifications()
		},

		onFail(response) {

			this.debug && console.log('FLIGHTOVERVIEW: onFail', response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		getTimeDiff(item) {
			
			let timeOfDeparture = new Date()
			let [hh,mm,ss] = item.departure.split(':');

			timeOfDeparture.setHours(+hh) // set the hours, using implicit type coercion
			timeOfDeparture.setMinutes(mm)
			timeOfDeparture.setSeconds(ss)

			let departured = new Date()	
			let [hh1,mm1,ss1] = item.departured.split(':');

			departured.setHours(+hh1) // set the hours, using implicit type coercion
			departured.setMinutes(mm1)
			departured.setSeconds(ss1)

			let diff = timeOfDeparture.getTime() - departured.getTime();

			let hours = Math.floor(diff / (1000 * 60 * 60));
			diff -= hours * (1000 * 60 * 60);

			let mins = Math.floor(diff / (1000 * 60));
			
			diff -= mins * (1000 * 60);
			mins < 10 && (mins = '0' + mins)

			return this.timeRemaining = hours + ':' + mins
		},

		formatTimeOfNotification(notification) {
			
			let theTime = notification.created_at.substring(10, notification.created_at.length - 3)
			
			this.debug && console.log('FLIGHTOVERVIEW: formatTimeOfNotification', notification.created_at, theTime)

			return theTime
		},
	}
}