import {EventBus} 		from '@/00_global/eventbus'

export default {
	name: 'Whoops',

	props: {
		viewData: [String, Object],
	},

	data() {
		return {
			debug: false,
			theContent: Object,
		}	
	},

	created() {

		this.setTheMessage()
	},

	methods: {
		
		setTheMessage() {
			
			this.theContent.title = this.viewData.title ? this.viewData.title : 'Er is iets misgegaan'
			this.theContent.subtitle = this.viewData.subtitle ? this.viewData.subtitle :  'Oeps?!'
			this.theContent.body = this.viewData.body ? this.viewData.body : 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
			this.theContent.icon = this.viewData.icon ? this.viewData.icon : 'whoops'
		},

		handleClick() {
			this.debug &&	console.log('WHOOPS: handleClick');
	  	
	  	EventBus.$emit('toggleOffcanvas', false);

	  	this.viewData.title == 'Captain with token not found (Try to login again?)' && (localStorage.clear(), this.$router.push('/'))
	  	this.viewData.status == '404' && this.$router.push('/')
	  	this.viewData.status == 401 && (localStorage.clear(), this.$router.push('/'))
		}
	}
}