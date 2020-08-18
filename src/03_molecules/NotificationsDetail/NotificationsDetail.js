import {EventBus} 			from '@/00_global/eventbus'


export default {
	name: 'NotificationsDetail',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			theNotification: this.viewData.notification,
			isNew: this.viewData.isNew,
			isUrgent: this.viewData.notification.urgent,
		}
	},

	mounted() {

		this.debug && console.log('NOTIFICATIONSDETAIL: mounted:', this.theNotification)
	},

	methods: {

		handleHelpClick() {

			EventBus.$emit('toggleOffcanvas', false)
		},

		handleBackClick() {

			this.debug && console.log('NOTIFICATIONSDETAIL: handleBackClick')

			EventBus.$emit('toggleOffcanvas', false)
		},

		formatDateOfNotification(notification) {

			let dateStamp = new Date() 
			let theDate = notification.created_at.substring(0, notification.created_at.length - 8)
			
			let [yyyy,mm,dd] = theDate.split('-');

			theDate = (`${yyyy}/${mm}/${dd}`)

			this.debug && console.log('NOTIFICATIONSDETAIL: formatDateOfNotification', theDate)

			return theDate
		},

		formatTimeOfNotification(notification) {
			
			let theTime = notification.created_at.substring(10, notification.created_at.length - 3)
			
			theTime = theTime.replace(':','h')
			this.debug && console.log('NOTIFICATIONSDETAIL: formatTimeOfNotification', theTime)

			return theTime
		},
	}
}