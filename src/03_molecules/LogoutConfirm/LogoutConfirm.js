import {EventBus} 		from '@/00_global/eventbus'

import Checklists			from '@/00_services/api/Checklists'
import Flights				from '@/00_services/api/Flights'


export default {
	name: 'LogoutConfirm',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			checklistIsCompleted: this.viewData.checklistIsCompleted,
			flightIsCompleted: this.viewData.flightIsCompleted,	
			theContent: {
				title: 'Ben je zeker',
				body: 'Proident consequat ut sint ullamco est officia officia nisi laboris aliquip.',
			}
		}
	},

	mounted() {
	
		this.viewData && this.setContent()
	},

	methods: {
		
		handleClick() {

			EventBus.$emit('toggleOffcanvas', false)

			this.debug && console.log('LOGOUTCONFIRM: handleClick')
		},

		handleLogoutClick() {

			localStorage.clear()

			EventBus.$emit('toggleOffcanvas', false)

			this.debug && console.log('LOGOUTCONFIRM: handleLogoutClick')
		},

		setContent() {

			this.debug && console.log('LOGOUTCONFIRM: setContent')

			if(!this.checklistIsCompleted && !this.flightIsCompleted) {
				this.isLoading = false
				return false
			}

			!this.checklistIsCompleted && (this.theContent.title = 'Checklist onvoltooid')
			!this.checklistIsCompleted && (this.theContent.body = 'Het blijkt dat de checklist nog niet voltooid proident consequat ut sint ullamco est officia officia nisi laboris aliquip.')

			!this.flightIsCompleted && (this.theContent.title = 'Vaart onvoltooid')
			!this.flightIsCompleted && (this.theContent.body = 'Het blijkt dat de huidige vaart nog niet voltooid proident consequat ut sint ullamco est officia officia nisi laboris aliquip.')
		},
	}
}