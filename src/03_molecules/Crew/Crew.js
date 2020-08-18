import {EventBus} 		from '@/00_global/eventbus'

import Stewards 			from '@/00_services/api/Stewards'
import Flights				from '@/00_services/api/Flights'

import CrewForm 			from '@/03_molecules/CrewForm/CrewForm.vue'


export default {
	name: 'Crew',

	components: {
		CrewForm
	},

	props: {
		resumedFlightInfo: Object,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			chosenCrew: null,
			showCrewForm: false,
			crewFilters: [],
			currentFilter: 'A-Z',
			slider: {
				crewMembers: [],
				dir: null,
				trackOffset: 0,
				goToPrevSlide: false,
				goToNextSlide: true,
				currentSlide: null,
				slideIndex: 0,
			},
		}	
	},

	computed: {
		selectedFilter: {
			get() {
        return this.currentFilter
      },
      set(newValue) {
        this.currentFilter = newValue
        this.filterIt()
      }
		},
	},

	mounted() {

		this.chosenCrew = this.getSavedCrew()
		
		this.getStewards()

		// enable next button		    
    EventBus.$emit('isDisabled', this.chosenCrew.length ? false : true )
	},

	methods: {

		getSavedCrew() {
			
			let theIds = []

			if(this.resumedFlightInfo && this.resumedFlightInfo.stewards.length) {
				
				// console.log('CREW: getSavedCrew: stewards resumed', this.resumedFlightInfo.stewards.length)
				
				for(let key in this.resumedFlightInfo.stewards) theIds.push(this.resumedFlightInfo.stewards[key].id)
				return theIds	
			}
			else if(localStorage.getItem('crew')) {
				
				// console.log('CREW: getSavedCrew: stewards localStorage')
				
				for(let key in JSON.parse(localStorage.getItem('crew'))) theIds.push(JSON.parse(localStorage.getItem('crew'))[key].id)
				return theIds	
			}
			else {
				// console.log('CREW: getSavedCrew: no stewards saved')
				
				return []
			}
		},

		getStewards() {

			this.debug && console.log('CREW: getStewards')		

			Stewards.overview().then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},
		
		onSuccess(response) {

			this.debug && console.log('CREW: onSuccess', response)
			
			let crew = response.data.body

			for(let key in crew) {
				this.slider.crewMembers.push(crew[key])	
				
				let firstLetter = crew[key].lastname.slice(0, 1).toUpperCase()
				this.crewFilters.indexOf(firstLetter) == -1 && this.crewFilters.push(firstLetter)
			}

			this.$store.crewMembers = this.slider.crewMembers

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

			let crewData = this.$store.crewMembers.filter((item,index) => this.chosenCrew.indexOf(item.id) > -1)
     	
     	this.$store.commit('setCrew', crewData)
    	
     	localStorage.setItem('crew', JSON.stringify(crewData))

    	this.debug && console.log('CREW: handleChange', crewData, this.$store.state.flightSettings.crew)

    	// enable next button		    
    	EventBus.$emit('isDisabled', this.chosenCrew.length ? false : true )
		},
		
		filterIt() {

			if(this.currentFilter == 'A-Z') {
				this.slider.crewMembers = this.$store.crewMembers
				return false
			}

			this.slider.crewMembers = this.$store.crewMembers.filter(item => item.lastname.slice(0, 1).toUpperCase().indexOf(this.currentFilter) > -1)

			this.debug && console.log('CREW: filterIt', this.currentFilter, 'results: ', this.slider.crewMembers)		
		},

		toggleCrewForm() {
			
			this.showCrewForm = !this.showCrewForm

			this.debug && console.log('CREW: toggleCrewForm', this.showCrewForm)

			this.resetSlider()
		},

		handleSliderClick(dir) {

			this.slider.dir = dir
			
			this.debug && console.log('CREW: handleSliderClick',this.$refs.crew__slide[this.slider.slideIndex])

			// check if there's a next/prev slide
			if(this.slider.dir == 'next' && this.$refs.crew__slide[this.slider.slideIndex].nextElementSibling) {
				
				this.slider.slideIndex++

				// update currentSlide
				this.slider.currentSlide = this.$refs.crew__slide[this.slider.slideIndex]
			
				this.slideIt()
			}
			
			if(this.slider.dir == 'prev' && this.$refs.crew__slide[this.slider.slideIndex].previousElementSibling) {
				
				this.slider.slideIndex--
				
				// update currentSlide
				this.slider.currentSlide = this.$refs.crew__slide[this.slider.slideIndex]

				this.slideIt()
			} 
		},

		slideIt() {
			
			let theTrack = this.$refs.crew__sliderTrack

			// get width of slide
			let theWidth = this.$refs.crew__slide[0].clientWidth   

			// go left or right
			this.slider.dir == 'next' && (this.slider.trackOffset = this.slider.trackOffset - theWidth)
			this.slider.dir == 'prev' && (this.slider.trackOffset = this.slider.trackOffset + theWidth)
			
			this.debug && console.log('CREW: slideIt', this.slider.trackOffset)

			theTrack.style.left = this.slider.trackOffset + 'px'

			// check prev/next btn
			this.checkControls()
		},

		checkControls() {
			
			this.debug && console.log('CREW: checkControls', this.slider.dir)

			this.slider.dir == 'next' && !this.slider.currentSlide.nextElementSibling 			&& (this.slider.goToNextSlide = false)
			this.slider.dir == 'next' && this.slider.currentSlide.previousElementSibling 	&& (this.slider.goToPrevSlide = true)
	
			this.slider.dir == 'prev' && this.slider.currentSlide.nextElementSibling 			&& (this.slider.goToNextSlide = true)
			this.slider.dir == 'prev' && !this.slider.currentSlide.previousElementSibling 	&& (this.slider.goToPrevSlide = false)
		},

		resetSlider() {

			this.debug && console.log('CREW: resetSlider')

			this.slider.dir = null
			this.slider.trackOffset = 0
			this.slider.goToPrevSlide = false
			this.slider.goToNextSlide = true
			this.slider.currentSlide = null
			this.slider.slideIndex = 0
		},
	}
}