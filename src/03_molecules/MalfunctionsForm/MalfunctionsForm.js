import {EventBus} 		from '@/00_global/eventbus'


export default {
	name: 'MalfunctionsForm',

	data() {
		return {
			debug: false,
			isLoading: true,
			photoEl: null,
			inputFields: {
				remarks: localStorage.getItem('malfunctionsRemarks') ? localStorage.getItem('malfunctionsRemarks') : '',
				image: localStorage.getItem('malfunctionsImage') ? localStorage.getItem('malfunctionsImage') : '',
			},
			isInvalid: false,
		}
	},

	watch: {
		'inputFields.remarks': {
			handler() {
				// enable next button
				EventBus.$emit('isDisabled', this.inputFields.remarks ? false : true )
				
   			this.$store.commit('setMalfunctionsRemarks', this.inputFields.remarks ? this.inputFields.remarks : null)
   			this.inputFields.remarks ? localStorage.setItem('malfunctionsRemarks', this.inputFields.remarks) : localStorage.removeItem('malfunctionsRemarks')
			},
			
		},

		'inputFields.image': {
			handler() {

				// enable next button
				EventBus.$emit('isDisabled', this.inputFields.remarks ? false : true )

				this.$store.commit('setMalfunctionsImage', this.inputFields.image ? this.inputFields.image : null)
   			this.inputFields.image ? localStorage.setItem('malfunctionsImage', this.inputFields.image) : localStorage.removeItem('malfunctionsImage')

			}
		}
	},

	mounted() {

		this.isLoading = false
		
		this.photoEl = this.$refs.photo

		// handle file upload
		EventBus.$on('fileIsUploaded', (isFileUploaded) => {
			
			if(!isFileUploaded) return false
			
			this.debug && console.log('MALFUNCTIONSFORMS: EventBus fileIsUploaded', isFileUploaded)
			
			this.$nextTick(() => this.onPhotoIsUploaded())
		})

		// enable next button
		EventBus.$emit('isDisabled', this.inputFields.remarks ? false : true )
	},

	methods: {

		handlePhotoClick() {
			
			this.debug && console.log('MALFUNCTIONSFORMS: handlePhotoClick, $emit openCamera')
			EventBus.$emit('openCamera', true)
		},

		onPhotoIsUploaded() {

			// $store.file is set on camera 
			this.inputFields.image = this.$store.file
			this.photoEl && (this.photoEl.src = this.$store.file)

			this.debug && console.log('MALFUNCTIONSFORMS: onPhotoIsUploaded', this.$store.file, this.inputFields.image )
		},

		handleDeleteClick() {

			this.inputFields.image = null
			this.$store.file = null
		},
	}
}