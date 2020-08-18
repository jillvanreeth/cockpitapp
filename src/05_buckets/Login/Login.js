import {EventBus} from '@/00_global/eventbus'

import LoginForm	from '@/03_molecules/LoginForm/LoginForm.vue'


export default {
	name: 'Login',
	
	components: {
		LoginForm
	},

	props: {},

	data() {
    return {
    	debug: true,
    	isLoading: true,
    }
  },
  	

  mounted() {

  	setTimeout(() => this.isLoading = false, 1500) 
  },

  methods: {

  	handleClick() {
  	
	  	this.debug &&	console.log('LOGINFORM: handleClick');
	  	
	  	EventBus.$emit('toggleOffcanvas', true, 'PincodeForm');
  	}
  }

}