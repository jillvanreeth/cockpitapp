import {EventBus} 				from '@/00_global/eventbus'

import Checklists 				from '@/00_services/api/Checklists'

import Date 							from '@/02_atoms/Date/Date.vue'
import ChecklistContent 	from '@/03_molecules/ChecklistContent/ChecklistContent.vue'
import ChecklistNav 			from '@/03_molecules/ChecklistNav/ChecklistNav.vue'
import ChecklistOverview	from '@/03_molecules/ChecklistOverview/ChecklistOverview.vue'


export default {
	name: 'ChecklistPanel',

	components: {
		Date,
		ChecklistContent,
		ChecklistNav,
		ChecklistOverview,
	},

	data() {
		return {
			debug: false,
			currentStep: null,
			currentSubStep: null,
			isLoading: true,
			waitForIt: {
				date: false,
				nameOfDay: false,
			},
			theChecklist: localStorage.getItem('checklist') ? [JSON.parse(localStorage.getItem('checklist'))[0]] : [{ label: 'checklist', nodes: [] }],
			checklistId: localStorage.getItem('checklist') ? [JSON.parse(localStorage.getItem('checklist'))[0]].checklistId : null,
			activeChecklist: null,
			checklistTracker: 0,
			subchecklistTracker: 0,
			nextClick: false,
			nextIsDisabled: true,
			checklistIsCompleted: false,
			completedCount: 0,
		}
	},

	watch: {
		
		waitForIt: {
			handler() {
				let size = Object.keys(this.waitForIt).length
				let count = 0

				for(let key in this.waitForIt) {
					this.waitForIt[key] && count++
 					
 					count == size && (this.isLoading = false)
				}
			},
			deep: true
		},
	},

	mounted() {
		
		// check if the checklist in local storage still exists, else create a new one
		this.checklistId && Checklists.detail(this.checklistId).then(response => {
			if(response.status === 404) {
				this.debug && console.log('CHECKLISTPANEL: mounted: no checklist found')
				this.createChecklist() 
			}
			//if(JSON.parse(response.data.body))
			else if(JSON.parse(response.data.body).complete) {
				this.debug && console.log('CHECKLISTPANEL: mounted: checklist is completed, create a new one')
				this.createChecklist()
			}
			else {
				this.debug && console.log('CHECKLISTPANEL: mounted: checklist not completed', (JSON.parse(response.data.body).complete))
				!JSON.parse(response.data.body).complete && this.setActiveChecklist(0)
			}
		})
		
		// if no id found, create a new checklist
		!this.checklistId && this.createChecklist()
	},

	methods: {

		handleNextClick() {
    
    	this.nextClick = true

    	this.completedCount++
    
    	if(this.completedCount > this.theChecklist[0].nodes.length) {
    		this.debug && console.log('!!!!CHECKLIST COMPLETE BOOYA')
    		this.checklistIsCompleted = true
    		return false
    	}

    	let totalSubnodes = this.activeChecklist.nodes.length - 1

    	//update the tracker if the active checklist and subchecklist are completed or get next subchecklist
    	this.activeChecklist.isCompleted && totalSubnodes == this.subchecklistTracker ? (this.checklistTracker++, this.subchecklistTracker = 0) : this.subchecklistTracker++
    	
    	this.debug && console.log('CHECKLISTPANEL: handleNextClick', this.checklistTracker, this.subchecklistTracker)
	
    	// emit next click to checklist bucket
    	this.$emit('emitChecklistTracker', this.checklistTracker)
    	
    	// get the next checklist part
    	this.setActiveChecklist(this.checklistTracker)
    },	

    handlePrevClick() {
			// gets called from bucket checklist
    	//update the tracker
    	this.subchecklistTracker == 0 ? (this.checklistTracker--, this.subchecklistTracker = this.theChecklist[0].nodes[this.checklistTracker].nodes.length - 1) : this.subchecklistTracker--

			this.debug && console.log('CHECKLISTPANEL: handlePrevClick', this.checklistTracker, this.subchecklistTracker)

			// emit prev click to checklist bucket
    	this.$emit('emitChecklistTracker', this.checklistTracker)

    	// get the prev checklist part
    	this.setActiveChecklist(this.checklistTracker)
		},

		handleSubmit() {

			this.debug && console.log('CHECKLISTPANEL: handleSubmit')
			let viewData = {...viewData, checklistId: this.checklistId }

			EventBus.$emit('toggleOffcanvas', true, 'ChecklistConfirm', viewData)
		},

		// checklistsubtitle value | boolean for all fields are checked | next button is not clicked
		emitChecklistProgress(substep, state, isClicked) {
			// disable next btn while processing
			this.nextIsDisabled = true
     
      // gets called from checklistcontent tree
      this.debug && console.log('CHECKLISTPANEL: emitChecklistProgress',this.nextIsDisabled, substep, 'checklist completed?', state, 'button is clicked?', isClicked);
      
      let count = 0
      
      // set completed booleans on the sub nodes
      this.activeChecklist.nodes.filter(node => {
      	
      	if(node.label == substep) {
      		node.isCompleted = state

      		node.isCompleted && (this.nextIsDisabled = false)
      		!node.isCompleted && (this.activeChecklist.isCompleted = state)
      	}
      	node.isCompleted && count++ 	
      })
    	
    	// if every sub node is completed, complete the node
    	if(count == this.activeChecklist.nodes.length) {
    		this.debug && console.log('CHECKLISTPANEL: emitChecklistProgress: activeChecklist completed!!')
    		
    		this.activeChecklist.isCompleted = state

    		this.nextIsDisabled = false
    	
    		// if there's no next checklist, proceed to checklist overview
    		if(!this.theChecklist[0].nodes[this.checklistTracker + 1]) {
    			this.debug && console.log('CHECKLISTPANEL: emitChecklistProgress: !!!no next checklist')	
    			
    			this.nextIsDisabled = false
    			return false
    		} 
    	}
    	// else get the next sub step
    	else if(count < this.activeChecklist.nodes.length) {
    		this.nextClick && (count = count - 1)
    		
    		this.debug && console.log('CHECKLISTPANEL: emitChecklistProgress: get next active subchecklist',this.checklistTracker, count)
    		isClicked && (this.setActiveChecklist(this.checklistTracker,count))
    	}
    },

    emitChecklistOverview(isTotalyCompleted) {

    	this.debug && console.log('CHECKLISTPANEL: emitChecklistOverview')

    	this.checklistIsCompleted = isTotalyCompleted
    },

		createChecklist() {
			
			let formData = new FormData()
			
			formData.append('ship', JSON.parse(localStorage.getItem('ship')).id)
			formData.append('shift', JSON.parse(localStorage.getItem('shift'))[0].id)
			formData.append('track', JSON.parse(localStorage.getItem('track'))[0].id)
			formData.append('start_stop', 0)
			formData.append('flight', JSON.parse(localStorage.getItem('flight'))[0].id)

			for(let key of formData.entries()) { this.debug && console.log('CHECKLISTPANEL: createChecklist', key[0] + ', ' + key[1]) }

			Checklists.create(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {

			this.debug && console.log('CHECKLISTPANEL: onSuccess', JSON.parse(response.data.body))
			let theResponse = JSON.parse(response.data.body)
			
			this.checklistId = theResponse.id
			
			// save the id in the store
			this.$store.commit('setChecklistId', this.checklistId)

			let nodeObj = {
				checklistId: this.checklistId,
				nodes: []
			}
			
			for(let category in theResponse.checklist) {
				
				let level1 = { label: String, isActive: category == 0 ? true : false, isCompleted: false, nodes: [] } 
				let level2 = { label: String, nodes: [] }
				
				for(let subcategory in theResponse.checklist[category].subcategories) {
					// console.log('subcategory',theResponse.checklist[category].subcategories[subcategory], theResponse.checklist[category].subcategories[subcategory].name)
					level2 = new Object
					
					level2.isActive = category == 0 ? true : false
					level2.isCompleted = false 
					level2.label = theResponse.checklist[category].subcategories[subcategory].name
					level2.nodes = theResponse.checklist[category].subcategories[subcategory].fields	
					// console.log('level2 field',theResponse.checklist[category].subcategories[subcategory].fields)
					level1.nodes = [...level1.nodes, level2]
					level2.nodes = [...level2.nodes]
				}
				
				level1.label = theResponse.checklist[category].name
				// console.log('panel level1',level1)
				nodeObj.nodes.push(level1)
			}
			
			this.theChecklist = []
			this.theChecklist.push(nodeObj)
			
			// save current checklist
			localStorage.setItem('checklist', JSON.stringify(this.theChecklist))

			this.debug && console.log('CHECKLISTPANEL: onSuccess checklist', this.theChecklist[0])

			this.setActiveChecklist(0,0)
		},

		onFail(response) {

			this.debug && console.log('CHECKLISTPANEL: onFail', response.status, response.data.message)

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'
			

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)
		},

		setActiveChecklist(checklistTracker, subchecklistTracker) {

			this.checklistTracker = checklistTracker ? checklistTracker : this.checklistTracker 			
			this.subchecklistTracker = subchecklistTracker ? subchecklistTracker : this.subchecklistTracker 			

			this.debug && console.log('CHECKLISTPANEL: setActiveChecklist: trackers', this.checklistTracker,this.subchecklistTracker)
			
			// DISACTIVATE the previous checkliststep
			this.checklistTracker != 0 && (this.theChecklist[0].nodes[this.checklistTracker - 1].isActive = false)
			
			// save the (new) active checklist	
			this.activeChecklist = this.theChecklist[0].nodes[this.checklistTracker]

			// update the steps
			this.setCurrentStep(this.checklistTracker,this.subchecklistTracker)

			// ACTIVATE the (new)checklist
			this.activeChecklist.isActive = true
			// DISACTIVATE the previous checkliststep
			this.subchecklistTracker != 0 && (this.activeChecklist.nodes[this.subchecklistTracker - 1].isActive = false)
			// ACTIVATE the (new) subchecklist
			this.activeChecklist.nodes[this.subchecklistTracker].isActive = true
			
			// reset the nextClick toggle
			this.nextClick = false
			// disable next button
			this.nextIsDisabled = true

			this.debug && console.log('CHECKLISTPANEL: setActiveChecklist', this.activeChecklist)
		},	

		setCurrentStep(checklistTracker, subchecklistTracker) {

			this.currentStep = this.activeChecklist.label.toLowerCase()
			this.currentSubStep = this.activeChecklist.nodes[subchecklistTracker].label.toLowerCase()

			this.debug && console.log('CHECKLISTPANEL: setCurrentStep', this.currentStep, this.currentSubStep)

			// emits to bucket checklist for setting params
			this.$emit('stepIsSet', this.currentStep, this.currentSubStep)
		},

		isLoaded(component) {

			this.debug && console.log('CHECKLISTPANEL: isLoaded', component)
			
			for(let key in this.waitForIt) {
				key == component && (this.waitForIt[key] = true)
			}
		}
	}
}