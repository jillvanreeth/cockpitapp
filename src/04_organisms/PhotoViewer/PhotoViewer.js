import {EventBus} 			from '@/00_global/eventbus'

export default {
	name: 'PhotoViewer',

	props: {
		viewData: [String, Object],
	},

	data() {
		return {
			debug: false,
			theViewData: this.viewData,
		}
	},

	mounted() {

		this.theViewData.image = this.theViewData.image ? this.theViewData.image : 'https://via.placeholder.com/1000'

	},

	methods: {
		handleClick() {
			this.debug &&	console.log('PHOTOVIEWER: handleClick');
	  	
	  	EventBus.$emit('togglePhotoViewer', false);
		}
	},	
}