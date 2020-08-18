import {EventBus} 		from '@/00_global/eventbus'

import Checklists 		from '@/00_services/api/Checklists'


export default {
	name: 'Tree',
	
  props: {
  	checklistId: [String, Number],
  	activeChecklistTitle: String,
  	activeChecklistSubTitle: String,
  	currentStep: String,
  	currentSubStep: String,
  	nodes: Array,
  	depth: Number,
  	emitChecklistProgress: Function,
  	emitChecklistOverview: Function,
	},

	computed: {
    isRoot() {
    	switch(this.depth) {
    		case 0: 
    			return 'checklistContent'
    		case 1:
    			return 'checklistContent__inner'
    			break
    	}
    }
  },

  watch: {
  	// watch when step changes
		currentStep: {
			handler() {
				
				this.debug && console.log('CHECKLISTCONTENT TREE: watcher currentStep', this.currentStep, this.nodes)
				
				this.createTree()

				// check if we can enable the next button
				this.checketyCheck() && this.emitProgress(true)	
			}
		},

		// watch when substep changes
		currentSubStep: {
			handler() {
				
				this.debug && console.log('CHECKLISTCONTENT TREE: watcher currentSubStep', this.currentSubStep, this.nodes)
				
				this.createTree()

				// check if we can enable the next button
				this.checketyCheck() && this.emitProgress(true)
			}
		},
	},

	data() {
		return {
			debug: false,
			currentForm: null,
			theForms: null,
		}
	},

	created() {

		EventBus.$on('commentIsSaved', (state, entry) => {
			this.debug && console.log('CHECKLISTCONTENT TREE: EventBus', state, entry)

			this.theForms.filter((form,index) => {
				form.id == entry.entryId && (this.theForms[index].remarks = true)
			})
		})

	},

	mounted() {
		
		this.createTree()				
	},

	methods: {
		
		handleCommentsClick(currentEntry) {
		
			//get details
			Checklists.detail(this.checklistId).then(response => {
				let savedEntry

				if(response.status !== 200) {
					this.onFail(response) 
				}
				else {
					// get entry to check if remark or image is set
					JSON.parse(response.data.body).entries.filter(theEntry => {
						if(currentEntry.id == theEntry.id) { 
							savedEntry = theEntry 
						}
					})

					let entryObj = { 
						checklistId: this.checklistId,
						title: this.activeChecklistTitle, 
						subtitle: this.activeChecklistSubTitle,
						subcategorytitle: currentEntry.title, 
						entryId: currentEntry.id, 
						remarks: savedEntry.remarks, 
						image: savedEntry.image 
					}
					
					this.debug && console.log('CHECKLISTCONTENT TREE: handleCommentsClick: entryObj',entryObj)
					let viewData = {...viewData, entry: entryObj}
					EventBus.$emit('toggleOffcanvas', true, 'CommentsForm', viewData);
				} 
			})		
		},

		handleInputChange(currentForm) {

			this.debug && console.log('CHECKLISTCONTENT TREE: handleInputChange', currentForm)

			this.currentForm = currentForm
			
			if(!this.currentForm.entry.theValue) {
					this.currentForm.entry.checked = false
					this.currentForm.checked = 0
					this.currentForm.valid = false	
					this.handleCheckChange(currentForm)	
			} 
			else {
				this.currentForm.entry.checked = true
				this.currentForm.checked = true
				this.currentForm.valid = true
				this.handleCheckChange(currentForm)
			}
		},

		handleCheckChange(currentForm) {

			this.currentForm = currentForm
		
			this.debug && console.log('CHECKLISTCONTENT TREE: handleCheckChange', this.currentForm)

			this.emitProgress(false)

			// do nothing if field is not required
			if(!this.currentForm.required) return false

			// validate the form
			if(!this.validateIt(this.currentForm)) return false

			// create formdata object
			let formData = new FormData()

			formData.append('checklist', this.checklistId)
			formData.append('entry', this.currentForm.id)
			formData.append('value', this.currentForm.entry.theValue)
			formData.append('checked', 1)

			for(let key of formData.entries()) { this.debug && console.log('CHECKLISTCONTENT TREE: handleCheckChange', key[0] + ', ' + key[1]) }
			
			this.sendIt(formData)
		},

		createTree() {

			if(!this.nodes) return false
			if(!this.nodes[0].nodes) return false

			let formObj = { id: null, title: String, desc: String, unit: String, entry: { checklist: this.checklistId, theValue: null}, remarks: String, checked: 0}
			let count = 0
			let formEntries = []
			
			// find the matching entries, if no entries found, create a new form
			// check for prefilled entries
			Checklists.detail(this.checklistId).then(response => {
				
				let responseEntries = JSON.parse(response.data.body)
				
				responseEntries.entries.filter(theEntry => {
					
					// prefill the form if a match is found
					for(let i = 0; i < this.nodes[0].nodes.length; i++) {
						
						let currentEntry
						let currentNode = this.nodes[0].nodes[i]
						// console.log(theEntry, this.nodes[0].nodes[i])
						if(currentNode.id == theEntry.id) { 
							currentEntry = theEntry 
							
							this.debug && console.log('CHECKLISTCONTENT TREE: createTree: currentEntry:', currentEntry, 'currentNode:', currentNode)	
							
							if(!currentNode.field) return
							
							let theFormObj = {}
									theFormObj.id = currentNode.id
									theFormObj.title = currentNode.field.title
									theFormObj.desc = currentNode.field.text
									theFormObj.unit = currentNode.field.unit.replace(/^\w/, c => c.toUpperCase())

									theFormObj.entry = {}
									theFormObj.entry.checklist = this.checklistId
									theFormObj.entry.theValue = currentEntry.value
									
									currentNode.field.remarks && (theFormObj.remarks = currentEntry.remarks || '')
									currentNode.field.check && (theFormObj.checked = currentEntry.checked)
									currentNode.field.check && (theFormObj.valid = theFormObj.checked)
									currentNode.field.check && (theFormObj.required = true) 

							formEntries.push(theFormObj)

							count++
							
							if(count == this.nodes[0].nodes.length) {
								
								this.theForms = formEntries
								
								// check if we can enable the next button
								// this.checketyCheck() && this.emitProgress(true)		
								this.checketyCheck() ? (this.emitProgress(true)) : (this.emitProgress(false))
							} 
							
						}
					}
				})
			})	
		},

		checketyCheck() {

			this.debug && console.log('CHECKLISTCONTENT TREE: checketyCheck',this.theForms)

			// check if all steps are checked
			let checkCount = 0
			
			this.theForms.length && this.theForms.filter((form) => {
				(form.checked || !form.required) && (checkCount ++)
			})
			
			return (checkCount === this.theForms.length && true)
		},

		sendIt(formData) {

			this.debug && console.log('CHECKLISTCONTENT TREE: sendIt')

			Checklists.update(formData).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		},

		onSuccess(response) {

			this.debug && console.log('CHECKLISTCONTENT TREE: onSucces', JSON.parse(response.data.body).remaining)

			this.currentForm.valid = true

			Checklists.detail(this.currentForm.entry.checklist).then(detailresponse => {
				this.debug && console.log('CHECKLISTCONTENT TREE: onSucces: detailsresponse', detailresponse)
			})

			// if checklist is finished, go to checklist overview
			JSON.parse(response.data.body).remaining === 0 && this.checketyCheck() && this.emitProgress(true)	//this.emitOverview(true)

			// check if all steps are checked
			JSON.parse(response.data.body).remaining !== 0 && this.checketyCheck() && this.emitProgress(true)	
		},

		onFail(response) {

			console.log('CHECKLISTCONTENT TREE: onFail', response.status, response.data.message)
			
			// clear localstorage if checklist isn't found
			if(response.data.message == 'Checklist not found') { 
				this.debug && console.log('CHECKLISTCONTENT TREE: onFail: clear local storage'); 
				localStorage.clear() 
				this.$router.push('/')
			}

			let theMessage = {}
					theMessage.status = response.status
					theMessage.title = response.data.message
					theMessage.subtitle = 'Oeps?!'
					theMessage.body = 'Cillum veniam velit exercitation consequat in aliquip duis lorem consequat ut sint ullamco est officia officia nisi laboris aliquip.'
					theMessage.icon = 'whoops'

			EventBus.$emit('toggleOffcanvas', true, 'Whoops', theMessage)			
		},

		emitOverview() {

			this.debug && console.log('CHECKLISTCONTENT TREE: emitChecklistoverview')

			// emit to checklistpanel
			this.$emit('emitChecklistOverview', true)
			
		},

		emitProgress(truthiness) {
		
			this.debug && console.log('CHECKLISTCONTENT TREE: emitChecklistProgress, $emit', this.activeChecklistSubTitle, 'checklist complete', truthiness, 'button is not clicked', false)
			
			// emits to checklist panel, used to handle the next button
			// checklistsubtitle value | boolean for all fields are checked | next button is not clicked
			this.$emit('emitChecklistProgress', this.activeChecklistSubTitle, truthiness, false)
		},

		validateIt(currentForm) {
			
			this.debug && console.log('CHECKLISTCONTENT TREE: validateIt')

			for(let key in currentForm.entry) {
				// set default input value if empty
				key == 'theValue' && !currentForm.entry[key] && (currentForm.entry[key] = '0')

				//if(!currentForm.entry[key]) return false
			}

			this.debug && console.log('CHECKLISTCONTENT TREE: validateIt, form is valid!')

			return true
		},
	}
}