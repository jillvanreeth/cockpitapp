import {EventBus} 			from '@/00_global/eventbus'

import Checklists 			from '@/00_services/api/Checklists'


export default {
	name: 'ChecklistConfirm',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			isLoading: false,
			isSubmitted: false,
			theChecklistId: this.viewData.checklistId,
		}
	},

	methods: {

		handleClick() {

			this.debug && console.log('CHECKLISTCONFIRM: handleClick')

			EventBus.$emit('toggleOffcanvas', false)
		},

		handleSubmitClick() {

			this.debug && console.log('CHECKLISTCONFIRM: handleSubmitClick')

			let formData = new FormData()

			formData.append('checklist', this.theChecklistId)

			this.isLoading = true

			Checklists.complete(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {

			this.debug && console.log('CHECKLISTCONFIRM: onSuccess: CHECKLIST COMPLETED', response)
			
			this.isLoading = false

			this.isSubmitted = true
		},

		onFail(response) {

			this.isLoading = false

			this.debug && console.log('CHECKLISTPANEL: onFail', response.status, response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},
	}
}