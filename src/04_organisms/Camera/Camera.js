import {EventBus} 	from '@/00_global/eventbus'

export default {
	name: 'Camera',

	data() {
		return {
			debug: false,
		}
	},

	mounted() {
	
		this.debug && !this.hasGetUserMedia() && console.log('CAMERA: getUserMedia is not supported by your browser')
		
		EventBus.$on('openCamera', toggle => this.hasGetUserMedia() && this.$nextTick(() => this.handleInputClick()))
	},

	methods: {

		hasGetUserMedia() {

		  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)		  	
		},

		handleInputClick() {

			let theInput = this.$refs.theInput

			this.debug && console.log('CAMERA: handleInputClick', theInput)
			theInput && theInput.click() 

			theInput && theInput.addEventListener('change', (e) => this.onInputChange(e.target.files[0])) 			
		},

		onInputChange(theFile) {
			
			this.debug && console.log('CAMERA: onInputChange', theFile)

			if(theFile.type.match(/^image\//)) {
				this.$store.file = URL.createObjectURL(theFile)
				
				EventBus.$emit('fileIsUploaded', true)
			}
		}
	}
}