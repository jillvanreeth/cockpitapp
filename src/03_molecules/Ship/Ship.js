import {EventBus} 		from '@/00_global/eventbus'

import Ships					from '@/00_services/api/Ships'


export default {
	name: 'Ship',

	props: {
		resumedFlightInfo: Object,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			chosenShip: this.getSavedShip(),
			slider: {
				items: null,
				dir: null,
				trackOffset: 0,
				goToPrevSlide: false,
				goToNextSlide: true,
				visibleSlides: [],
			},
		}	
	},

	mounted() {

		// save ship from resumed flight
		this.resumedFlightInfo && localStorage.setItem('ship', JSON.stringify(this.resumedFlightInfo.current_ship))

		this.getShips()

		// enable next button
		EventBus.$emit('isDisabled', this.chosenShip ? false : true )
	},

	methods: {

		getSavedShip() {
			
			if(this.resumedFlightInfo) {
				return this.resumedFlightInfo.current_ship.id
			}
			else if(!this.resumedFlightInfo && localStorage.getItem('ship')) {
				return JSON.parse(localStorage.getItem('ship')).id
			}
			else {
				return []
			}
		},

		getShips() {

			this.debug && console.log('SHIP: getShips')		

			Ships.overview().then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {

			this.debug && console.log('SHIP: onSucces', response)

			this.slider.items = JSON.parse(response.data.body)

			this.$store.ships = this.slider.items

			// set visible slides
			this.slider.items.length > 3 && this.slider.items.forEach((slide, index) => index <= 2 && this.slider.visibleSlides.push(index))
		
			this.isLoading = false
		},

		onFail(response) {

			this.isLoading = false

			this.debug && console.log('SHIP: onFail', response.status, response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		handleChange() {
			
			let shipData = this.$store.ships.filter((item,index) => this.chosenShip == item.id)
	    
	    shipData = JSON.stringify(shipData[0])
	    
    	this.$store.commit('setShip', shipData)
  	
   		localStorage.setItem('ship', shipData)

    	// enable next button
			EventBus.$emit('isDisabled', this.$store.state.flightSettings.ship ? false : true )
		},
	
		handleClick(dir) {

			this.dir = dir
			
			this.debug && console.log('SHIP: handleClick', dir, this.slider.visibleSlides)

			// check if there's a next/prev slide
			if(this.dir == 'next' && this.$refs.ship__item[this.slider.visibleSlides[2]].nextElementSibling) {
			
				// add the next slide
				this.slider.visibleSlides.push(this.slider.visibleSlides[2] + 1)

				// remove first child from the visibleslides array
				this.slider.visibleSlides.shift();

				this.slideIt()
			}
			
			if(this.dir == 'prev' && this.$refs.ship__item[this.slider.visibleSlides[0]].previousElementSibling) {
				
				// add the prev slide
				this.slider.visibleSlides.unshift(this.slider.visibleSlides[0] - 1)

				// remove last child from the visibleslides array
				this.slider.visibleSlides.pop();

				this.slideIt()
			}
		},

		slideIt() {
			
			let theTrack = this.$refs.ship__sliderTrack

			// get width of slide
			let theWidth = this.$refs.ship__item[0].clientWidth   

			// go left or right
			this.dir == 'next' && (this.slider.trackOffset = this.slider.trackOffset - theWidth)
			this.dir == 'prev' && (this.slider.trackOffset = this.slider.trackOffset + theWidth)
			
			this.debug && console.log('SHIP: positionSlides', this.slider.trackOffset)

			theTrack.style.left = this.slider.trackOffset + 'px'

			// check prev/next btn
			this.checkControls()
		},

		checkControls() {
			
			this.dir == 'next' && !this.$refs.ship__item[this.slider.visibleSlides[2]].nextElementSibling 			&& (this.slider.goToNextSlide = false)
			this.dir == 'next' && this.$refs.ship__item[this.slider.visibleSlides[0]].previousElementSibling 		&& (this.slider.goToPrevSlide = true)
	
			this.dir == 'prev' && this.$refs.ship__item[this.slider.visibleSlides[2]].nextElementSibling 				&& (this.slider.goToNextSlide = true)
			this.dir == 'prev' && !this.$refs.ship__item[this.slider.visibleSlides[0]].previousElementSibling 	&& (this.slider.goToPrevSlide = false)

			this.debug && console.log('SHIP: checkControls', 'next: ', this.slider.goToNextSlide, 'prev: ', this.slider.goToPrevSlide)
		}
	}
}