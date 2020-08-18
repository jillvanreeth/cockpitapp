import {EventBus} 		from '@/00_global/eventbus'

import Tracks 				from '@/00_services/api/Tracks'


export default {
	name: 'Tracks',

	data() {
		return {
			debug: false,
			isLoading: true,
			chosenTrack: localStorage.getItem('track') ? JSON.parse(localStorage.getItem('track'))[0].id : [],
			theTracks: Array,
		}
	},

	mounted() {
		
		this.getTracks()
		
		// enable next button
		EventBus.$emit('isDisabled', this.$store.state.flightSettings.track ? false : true )
	},

	methods: {

		getTracks() {

			this.debug && console.log('TRACKS: getTracks')

			// get the tracks		
			Tracks.overview().then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {
			
			this.debug && console.log('TRACKS: onSucces', response)
			
			this.theTracks = JSON.parse(response.data.body)

			this.$store.tracks = this.theTracks

			this.isLoading = false
		},

		onFail(response) {

			this.isLoading = true

			this.debug && console.log('TRACKS: onFail', response.status, response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		handleChange() {
			
			let trackData = this.$store.tracks.filter((item,index) => this.chosenTrack == item.id)
	    trackData = JSON.stringify(trackData)

    	this.$store.commit('setTrack', trackData)
  	
   		localStorage.setItem('track', trackData)

    	// enable next button
			EventBus.$emit('isDisabled', this.$store.state.flightSettings.track ? false : true )
		}
	}
}