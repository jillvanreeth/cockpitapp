import {EventBus} 		from '@/00_global/eventbus'

import Checklists 		from '@/00_services/api/Checklists'

export default {
	name: 'CommentsConfirm',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			formData: this.viewData.formData,
			entry: this.viewData.entry,
			isLoading: false,
			isSuccess: false,
			theMessage: {
				title: String,
				subtitle: String,
				body: String,
				icon: String,
			},
		}
	},

	mounted() {
			
		this.entry = {...this.entry, shift: JSON.parse(localStorage.getItem('shift'))[0].name, captain: 'Kapitein Iglo'}
	},

	methods: {

		handlePhotoClick() {

			this.debug && console.log('COMMENTSCONFIRM: handlePhotoClick')

			EventBus.$emit('togglePhotoViewer', true, this.entry);
		},

		handleSubmit() {

			this.isLoading = true

			for(let key of this.formData.entries()) { this.debug && console.log('COMMENTSCONFIRM: handleSubmit', key[0] + ', ' + key[1]) }

			Checklists.update(this.formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSucces(response))		
		},

		handleChangeClick() {

			this.debug && console.log('COMMENTSCONFIRM: handleChangeClick')
			
			let viewData = {...viewData, entry: this.entry}

			EventBus.$emit('toggleOffcanvas', true, 'CommentsForm', viewData);
		},

		onSucces(response) {

			this.isLoading = false

			this.debug && console.log('COMMENTSCONFIRM: onSucces', response)

			this.isSuccess = true

			this.theMessage.title = 'Success!'
			this.theMessage.subtitle = 'Opmerking is toegevoegd'
			this.theMessage.body = 'Je wijziging/opmerking is opgeslagen'
			this.theMessage.icon = 'check'

			// return the comment is saved to set active state on button
			EventBus.$emit('commentIsSaved', true, this.entry);
		},

		onFail(response) {

			this.isLoading = false

			this.debug && console.log('COMMENTSCONFIRM: onFail', response.status, response.data.message)

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