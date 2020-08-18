import {EventBus} 		from '@/00_global/eventbus'

import Flights 				from '@/00_services/api/Flights'
import Tracks 				from '@/00_services/api/Tracks'

export default {
	name: 'Shift',

	data() {
		return {
			debug: false,
			isLoading: true,
			track: JSON.parse(localStorage.getItem('track'))[0].id,			
			chosenShiftId: localStorage.getItem('shift') ? JSON.parse(localStorage.getItem('shift'))[0].id : [],
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
		
		this.debug && console.log('SHIFT: mounted')
		
		// emit incomplete shift if it's in localstorage
		localStorage.getItem('shift') && JSON.parse(localStorage.getItem('shift'))[0].isIncomplete && this.$emit('emitIncompleteShift', true)

		// get shifts
		Tracks.shifts(this.track).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		

		// enable next button
		EventBus.$emit('isDisabled', this.$store.state.flightSettings.shift ? false : true )
	},

	methods: {

		onSuccess(response) {

			this.debug && console.log('SHIFT: onSucces', response)

			let shifts = JSON.parse(response.data.body)
		
			// check for uncompleted shifts
			for(let key in shifts) {
				
				Flights.incompletes(shifts[key].id).then(incompletes => {
					if(incompletes.status !== 200) {
						this.onFail(incompletes)
					} 
					else {
						
						if(incompletes.data.body.length && incompletes.data.body[0].current_shift_id == shifts[key].id) {
							
							this.debug && console.log('SHIFT: incomplete flights:', incompletes.data.body[0])
						
							shifts[key].isIncomplete = true
							shifts[key].flightInfo = incompletes.data.body[0]
						}

						this.$store.shifts = this.slider.items
						this.slider.items = shifts

						// set visible slides
						this.slider.items && this.slider.items.length > 3 && this.slider.items.forEach((slide, index) => index <= 2 && this.slider.visibleSlides.push(index))
						this.isLoading = false
					}
				})
			}
		},

		onFail(response) {

			this.isLoading = false

			this.debug && console.log('SHIFT: onFail', response.status, response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		handleChange() {

			let shiftData = this.slider.items.filter((item,index) => this.chosenShiftId == item.id)
   		
   		if(Object.prototype.hasOwnProperty.call(shiftData[0], 'isIncomplete')) {
   		 	this.$emit('emitIncompleteShift', true)
   		}

   		shiftData = JSON.stringify(shiftData)

			this.$store.commit('setShift', shiftData)
   		localStorage.setItem('shift', shiftData)

    	// enable next button
			EventBus.$emit('isDisabled', this.$store.state.flightSettings.shift ? false : true )
		},

		handleClick(dir) {

			this.dir = dir
			
			this.debug && console.log('SHIFT: handleClick', dir, this.slider.visibleSlides)
			
			// check if there's a next/prev slide
			if(this.dir == 'next' && this.$refs.shift__item[this.slider.visibleSlides[2]].nextElementSibling) {
			
				// add the next slide
				this.slider.visibleSlides.push(this.slider.visibleSlides[2] + 1)

				// remove first child from the visibleslides array
				this.slider.visibleSlides.shift();

				this.slideIt()
			}
			
			if(this.dir == 'prev' && this.$refs.shift__item[this.slider.visibleSlides[0]].previousElementSibling) {
				
				// add the prev slide
				this.slider.visibleSlides.unshift(this.slider.visibleSlides[0] - 1)

				// remove last child from the visibleslides array
				this.slider.visibleSlides.pop();

				this.slideIt()
			} 
		},

		slideIt() {
			
			let theTrack = this.$refs.shift__sliderTrack

			// get width of slide
			let theWidth = this.$refs.shift__item[0].clientWidth   

			// go left or right
			this.dir == 'next' && (this.slider.trackOffset = this.slider.trackOffset - theWidth)
			this.dir == 'prev' && (this.slider.trackOffset = this.slider.trackOffset + theWidth)
			
			this.debug && console.log('SHIFT: positionSlides', this.slider.trackOffset)

			theTrack.style.left = this.slider.trackOffset + 'px'

			// check prev/next btn
			this.checkControls()
		},

		checkControls() {
			
			this.dir == 'next' && !this.$refs.shift__item[this.slider.visibleSlides[2]].nextElementSibling 			&& (this.slider.goToNextSlide = false)
			this.dir == 'next' && this.$refs.shift__item[this.slider.visibleSlides[0]].previousElementSibling 	&& (this.slider.goToPrevSlide = true)
	
			this.dir == 'prev' && this.$refs.shift__item[this.slider.visibleSlides[2]].nextElementSibling 			&& (this.slider.goToNextSlide = true)
			this.dir == 'prev' && !this.$refs.shift__item[this.slider.visibleSlides[0]].previousElementSibling 	&& (this.slider.goToPrevSlide = false)

			this.debug && console.log('SHIFT: checkControls', 'next: ', this.slider.goToNextSlide, 'prev: ', this.slider.goToPrevSlide)
		}
	}
}