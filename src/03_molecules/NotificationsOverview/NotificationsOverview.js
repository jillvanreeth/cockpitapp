import {EventBus} 			from '@/00_global/eventbus'

import Notifications 		from '@/00_services/api/Notifications'


export default {
	name: 'NotificationsOverview',

	data() {
		return {
			debug: false,
			trackId: localStorage.getItem('flight') ? JSON.parse(localStorage.getItem('flight'))[0].track_id : null,		
			theNotifications: null,
			notificationTime: null,
		}
	},

	mounted() {

		this.getNotifications()
	},

	methods: {

		handleDetailClick(theNotification) {

			this.debug && console.log('NOTIFICATIONSOVERVIEW: handleDetailClick', theNotification)

			let viewData = {...viewData, notification: theNotification, isNew: false }

			EventBus.$emit('toggleOffcanvas', true, 'NotificationsDetail', viewData)
		},

		getNotifications() {

			Notifications.overview(this.trackId).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {

			this.debug && console.log('NOTIFICATIONSOVERVIEW: onSuccess', JSON.parse(response.data.body))

			this.theNotifications = JSON.parse(response.data.body)
		},

		onFail(response) {

			this.isLoading = false

			this.debug && console.log('NOTIFICATIONSOVERVIEW: onFail', response.status, response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		formatDateOfNotification(notification) {

			let dateStamp = new Date() 
			let theDate = notification.created_at.substring(0, notification.created_at.length - 8)
			
			this.debug && console.log('NOTIFICATIONSOVERVIEW: formatTimeOfNotification', notification.created_at, theDate)

			return dateStamp == theDate ? 'Vandaag' : theDate
		},

		formatTimeOfNotification(notification) {
			
			let theTime = notification.created_at.substring(10, notification.created_at.length - 3)
			
			this.debug && console.log('NOTIFICATIONSOVERVIEW: formatTimeOfNotification', notification.created_at, theTime)

			return theTime
		},
	}
}