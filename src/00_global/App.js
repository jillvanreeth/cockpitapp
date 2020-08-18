import {EventBus} 	from '@/00_global/eventbus'

import Login 				from '@/05_buckets/Login/Login.vue'


export default {
  name: 'app',

  components: {
  	Login,
  },

  data() {
  	return {
  		debug: false,
  		offCanvas: {
  			toggle: false,
	  		viewToShow: String,
	  		viewData: Object,	
  		},
  		photoViewer: {
  			toggle: false,
  			viewData: [Object, String],
  		},
  	}
  },
	
  beforeMount() {
  	
  	// check if logged in
  	this.$router.currentRoute.path !== '/' && !localStorage.getItem('token') && this.$router.push('/')
  },

  created() {
		
		EventBus.$on('toggleOffcanvas', (toggle, view, viewData) => {

			this.debug && console.log('APP: toggleOffcanvas', toggle, view, viewData)
			
			this.offCanvas.toggle = toggle
			this.offCanvas.viewToShow = view
			this.offCanvas.viewData = viewData
		})

		EventBus.$on('togglePhotoViewer', (toggle, viewData) => {
			this.debug && console.log('APP: togglePhotoViewer', toggle, viewData)
			
			this.photoViewer.toggle = toggle
			this.photoViewer.viewData = viewData
		})
	},

  methods: {}
}