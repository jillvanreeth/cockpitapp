import {EventBus} 		from '@/00_global/eventbus'

import Malfunctions		from '@/00_services/api/Malfunctions'


export default {
	name: 'MalfunctionsSituation',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			theFlightInfo: this.viewData.flightInfo,
			chosenMalfunction: localStorage.getItem('malfunctionsSituation') ? localStorage.getItem('malfunctionsSituation') : null,
			theSituations: [
				{id: 1, title: 'Defect melden', icon: 'brokenWheels'},
				{id: 2, title: 'Storing op traject', icon: 'radar'},
				{id: 3, title: 'Overige...', icon: 'checklist'},
			],
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
		
		this.isLoading = false

		this.createSlider()

		// enable next button
		EventBus.$emit('isDisabled', this.chosenMalfunction ? false : true )
	},

	methods: {

		handleChange() {
			 
			this.$store.commit('setMalfunctionsSituation', this.chosenMalfunction)

   			localStorage.setItem('malfunctionsSituation', this.chosenMalfunction)

    		// enable next button
			EventBus.$emit('isDisabled', this.$store.state.malfunctions.situation ? false : true )
		},

		handleClick(dir) {

			this.dir = dir
			
			this.debug && console.log('MALFUNCTIONSSITUATION: handleClick', dir, this.slider.visibleSlides)

			// check if there's a next/prev slide
			if(this.dir == 'next' && this.$refs.item[this.slider.visibleSlides[2]].nextElementSibling) {
			
				// add the next slide
				this.slider.visibleSlides.push(this.slider.visibleSlides[2] + 1)

				// remove first child from the visibleslides array
				this.slider.visibleSlides.shift();

				this.slideIt()
			}
			
			if(this.dir == 'prev' && this.$refs.item[this.slider.visibleSlides[0]].previousElementSibling) {
				
				// add the prev slide
				this.slider.visibleSlides.unshift(this.slider.visibleSlides[0] - 1)

				// remove last child from the visibleslides array
				this.slider.visibleSlides.pop();

				this.slideIt()
			}
		},

		createSlider() {

			this.debug && console.log('MALFUNCTIONSOVERVIEW: createSlider')

			this.slider.items = this.theSituations

			// set visible slides
			this.slider.items.length > 3 && this.slider.items.forEach((slide, index) => index <= 2 && this.slider.visibleSlides.push(index))
		},

		slideIt() {
			
			let theTrack = this.$refs.sliderTrack

			// get width of slide
			let theWidth = this.$refs.item[0].clientWidth   

			// go left or right
			this.dir == 'next' && (this.slider.trackOffset = this.slider.trackOffset - theWidth)
			this.dir == 'prev' && (this.slider.trackOffset = this.slider.trackOffset + theWidth)
			
			this.debug && console.log('MALFUNCTIONSSITUATION: positionSlides', this.slider.trackOffset)

			theTrack.style.left = this.slider.trackOffset + 'px'

			// check prev/next btn
			this.checkControls()
		},

		checkControls() {
			
			this.dir == 'next' && !this.$refs.item[this.slider.visibleSlides[2]].nextElementSibling 			&& (this.slider.goToNextSlide = false)
			this.dir == 'next' && this.$refs.item[this.slider.visibleSlides[0]].previousElementSibling 		&& (this.slider.goToPrevSlide = true)
	
			this.dir == 'prev' && this.$refs.item[this.slider.visibleSlides[2]].nextElementSibling 				&& (this.slider.goToNextSlide = true)
			this.dir == 'prev' && !this.$refs.item[this.slider.visibleSlides[0]].previousElementSibling 	&& (this.slider.goToPrevSlide = false)

			this.debug && console.log('MALFUNCTIONSSITUATION: checkControls', 'next: ', this.slider.goToNextSlide, 'prev: ', this.slider.goToPrevSlide)
		}
	},
}