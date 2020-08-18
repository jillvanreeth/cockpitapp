import {EventBus} 		from '@/00_global/eventbus'

export default {
	name: 'CommentsForm',

	props: {
		viewData: Object,
	},
	
	data() {
		return {
			debug: false,
			isLoading: true,
			entry: this.viewData.entry,
			photoEl: null,
			inputFields: {
				remarks: this.viewData.entry.remarks ? this.viewData.entry.remarks : '',
				image: this.viewData.entry.image ? this.viewData.entry.image : '',
			},
			isInvalid: false,
		}
	},

	mounted() {

		this.isLoading = false

		this.photoEl = this.$refs.photo

		// handle file upload
		EventBus.$on('fileIsUploaded', (isFileUploaded) => {
			
			if(!isFileUploaded) return false
			
			this.debug && console.log('COMMENTS: EventBus fileIsUploaded', isFileUploaded)
			
			this.$nextTick(() => this.onPhotoIsUploaded())
		})
	},

	methods: {

		handlePhotoClick() {
			
			this.debug && console.log('COMMENTS: handlePhotoClick, $emit openCamera')
			EventBus.$emit('openCamera', true)
		},

		onPhotoIsUploaded() {

			this.isLoading = false

			this.inputFields.image = this.$store.file
			this.photoEl && (this.photoEl.src = this.$store.file)

			this.debug && console.log('COMMENTS: onPhotoIsUploaded', this.$store.file, this.inputFields.image )
		},

		handleDeleteClick() {

			this.inputFields.image = null
			this.$store.file = null
		},

		handleSubmit() {

			this.isInvalid = false

			this.debug && console.log('COMMENTS: handleSubmit')

			!this.inputFields.remarks && !this.inputFields.image && this.handleEmptyFields()

			if(this.isInvalid) return false

			// disable send button
			this.$refs.submit.disabled = true

			// create formdata object
			let formData = new FormData()
			
			formData.append('checklist', this.entry.checklistId)
			formData.append('entry', this.entry.entryId)
			formData.append('remarks', this.inputFields.remarks)
			formData.append('image', this.inputFields.image)
			
			for(let key of formData.entries()) { this.debug && console.log('COMMENTS: handleSubmit', key[0] + ', ' + key[1]) }

			this.isLoading = true
			
			this.entry.image = this.inputFields.image
			this.entry.remarks = this.inputFields.remarks

			let viewData = {}
					viewData.formData = formData
					viewData.timeStamp = this.getTimeStamp()
					viewData.entry = this.entry

			this.debug && console.log('COMMENTS: handleSubmit: entry', viewData)

			// go to confirm view
			EventBus.$emit('toggleOffcanvas', true, 'CommentsConfirm', viewData);
		},

		getTimeStamp() {

			function addZero(i) { 
				i < 10 && (i = '0' + i) 
				return i
			}

			const today = new Date()
      const time = addZero(today.getHours()) + "u" + addZero(today.getMinutes())
      
      return time
		},

		handleEmptyFields() {

			this.debug && console.log('COMMENTS: handleEmptyFields')

			this.isInvalid = true

			return false
		},
	}
}