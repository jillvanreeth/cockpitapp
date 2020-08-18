import {EventBus} 		from '@/00_global/eventbus'

export default {
	name: 'Success',

	props: {
		viewData: [String, Object],
	},

	data() {
		return {
			debug: false,
			theContent: {},
		}	
	},

	created() {

		this.setTheMessage()
	},

	methods: {

		setTheMessage() {
			
			this.theContent.title = this.viewData && this.viewData.title ? this.viewData.title : 'Er is iets misgegaan'
			this.theContent.subtitle = this.viewData && this.viewData.subtitle ? this.viewData.subtitle :  'Oeps?!'
			this.theContent.body = this.viewData && this.viewData.body ? this.viewData.body : 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
			this.theContent.icon = this.viewData && this.viewData.icon ? this.viewData.icon : 'whoops'
			this.theContent.button = this.viewData && this.viewData.button ? this.viewData.button : 'Sluiten'
		},
		
		handleClick() {
			this.debug &&	console.log('SUCCESS: handleClick');
	  	
	  	this.$emit('emitToggleOffcanvas')
	  	EventBus.$emit('toggleOffcanvas', false);
		}
	}
}