import {EventBus} 		from '@/00_global/eventbus'

import Flights				from '@/00_services/api/Flights'
import Notifications 	from '@/00_services/api/Notifications'
import Stops					from '@/00_services/api/Stops'


export default {
	name: 'FlightPanel',

	data() {
		return {
			debug: false,
			isLoading: true,
			newNotification: false,
			notifications: Array,
			timeRemaining: null,
			nextStop: this.$store.state.nextStop ? this.$store.state.nextStop : Object,
			secondStop: Object,
			allItems: Object,
			flightInfo: this.$store.state.flightInfo ? this.$store.state.flightInfo : Object,
			notificationsCount: this.$store.state.notificationsCount,
			passengers: localStorage.getItem('passengers') ? JSON.parse(localStorage.getItem('passengers')) : this.$store.state.passengers,
			waitForIt: {
				flightInfo: false,
				notifications: false,
				time: false,
			},
		}
	},

	// watch for passengers changes
	watch: {
		'$store.state.passengers': {
			handler(newVal,oldVal) {
				//console.log('watcher passengers', newVal, oldVal)
				if(newVal == oldVal) return false
				this.passengers = newVal
				localStorage.setItem('passengers', JSON.stringify(newVal))
			},
			deep: true,
		},

		waitForIt: {
			handler() {
				for(let key in this.waitForIt) {
					if(this.waitForIt[key]) {
 						this.isLoading = false
 						break
 					}
 					else {
 						this.isLoading = true
					} 
				}
			},
			deep: true
		},
	},

	created() {

		EventBus.$on('updateItems', () => {
			this.isLoading = true
			this.waitForIt.flightInfo = false
			this.waitForIt.notifications = false
			this.waitForIt.time = false
		
			this.debug && console.log('FLIGHTPANEL: !!!!!!!!!Eventbus')
			this.getFlightDetails()
		})
	},

	mounted() {
		
		this.getFlightDetails()
	},

	methods: {

		handleStopClick() {

			this.debug && console.log('FLIGHTPANEL: handleStopClick')

			EventBus.$emit('toggleOffcanvas', true, 'FlightStopConfirm')
		},

		handleNotificationsClick() {

			this.debug && console.log('FLIGHTPANEL: handleNotificationsClick')

			// update the count
			this.newNotification && localStorage.setItem('notificationsCount', this.notifications.length +1)	
			this.newNotification = false

			// get the newest notification
			let viewData = {...viewData, notification: this.notifications[0], isNew: true }
			
			EventBus.$emit('toggleOffcanvas', true, 'NotificationsDetail', viewData)
		},

		getFlightDetails() {

			this.isLoading = true
			
			this.debug && console.log('FLIGHTPANEL: getFlightDetails: ',JSON.parse(localStorage.getItem('flight')))

			let flight = JSON.parse(localStorage.getItem('flight'))[0].id
			
			Flights.detail(flight).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {
			
			this.nextStop = JSON.parse(response.data.body.next)
			this.secondStop = response.data.body.second.length > 10 ? JSON.parse(response.data.body.second) : null
			this.flightInfo = JSON.parse(response.data.body.flight)
			
			// save in the store or update the store
			this.$store.commit('setNextStop', this.nextStop)
			this.secondStop ? this.$store.commit('setSecondStop', this.secondStop) : this.$store.commit('setSecondStop', '')
			this.$store.commit('setFlightInfo', this.flightInfo)

			this.debug && console.log('FLIGHTPANEL: onSuccess', 'next: ',this.nextStop)
			this.debug && console.log('FLIGHTPANEL: onSuccess', 'second: ',this.secondStop)
			this.debug && console.log('FLIGHTPANEL: onSuccess', 'flightInfo:', this.flightInfo)
			
			this.flightInfo && (this.waitForIt.flightInfo = true)
			this.flightInfo && this.getNotifications()
			this.secondStop && this.getRemainingTime() 
			
		},

		onFail(response) {

			this.debug && console.log('FLIGHTPANEL: onFail', response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		getNotifications() {

			this.isLoading = true

			Notifications.overview(this.flightInfo.track_id).then(response => {
				if(response.status !== 200) { this.onFail(response) }

				if(response.status == 200) {
					
					this.notifications = JSON.parse(response.data.body)

					~~localStorage.getItem('notificationsCount') !== JSON.parse(response.data.body).length ? (this.newNotification = true) : 	(this.newNotification = false)
				
					this.debug && console.log('FLIGHTPANEL: getNotifications: localStorage:', localStorage.getItem('notificationsCount'), 'data:', this.notifications.length, 'notificationsresponse', JSON.parse(response.data.body))
				}

				this.waitForIt.notifications = true 
			})
		},

		getRemainingTime() {
			
			if(!this.secondStop) {
				this.waitForIt.time = true
				return false 
			}

			// TIME OF DEPARTURE SECOND STOP - CURRENT TIME 
			setInterval(function () {	
				let self = this
				
				const today = new Date()	
				let timeToDepartForSecondStop = new Date()
				let [hh,mm,ss] = this.nextStop.departure.split(':')

				timeToDepartForSecondStop.setHours(hh)
				timeToDepartForSecondStop.setMinutes(mm)
				timeToDepartForSecondStop.setSeconds(ss)

				let diff = timeToDepartForSecondStop.getTime() - today.getTime()

				let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
				diff -= hours * (1000 * 60 * 60)
				hours = hours.toString().replace(/[a-z-]/g, '')
				hours < 10 && (hours = '0' + hours)

				let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
				diff -= mins * (1000 * 60)
				mins = mins.toString().replace(/[a-z-]/g, '')
				mins < 10 && (mins = '0' + mins)

				let seconds = Math.floor((diff % (1000 * 60)) / 1000)
				seconds < 10 && (seconds = '0' + seconds)
				seconds = seconds.toString().replace(/[a-z-]/g, '')

				this.timeRemaining = (hours == '00' && mins == '00') && (`${mins}:${seconds}`) 
				this.timeRemaining = (hours == '00' && mins != '00') && (`${mins}:${seconds}`) 
				this.timeRemaining = (hours != '00' && mins != '00') && (`${hours}:${mins}`) 
				
				this.waitForIt.time = true
				//this.debug && console.log('FLIGHTNext: getRemainingTime', this.timeRemaining)
			 }.bind(this), 1000 )

					
		}
	},
}