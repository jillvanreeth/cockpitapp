import Tree from './Tree.vue'


export default {
	name: 'ChecklistContent',

	components: {
		Tree
	},

	props: {
		currentStep: String,
		currentSubStep: String,
		emitChecklistProgress: Function,
		emitChecklistOverview: Function,
		activeChecklist: Object,
		checklistId: [String, Number],
	},

	data() {
		return {
			debug: false,
			theCurrentStep: this.currentStep,
			theCurrentSubStep: this.currentSubStep,
			activeSubChecklist: null,
			theChecklistId: this.checklistId,
			activeChecklistTitle: this.activeChecklist.label,
			activeChecklistSubTitle: this.activeChecklist.nodes[0].label,
		}
	},
	watch: {
		currentStep: {
			handler() {
				this.updateChecklist()
			}
		},

		currentSubStep: {
			handler() {
				this.updateChecklist()
			}
		},
	},
	mounted() {

		this.debug && console.log('CHECKLISTCONTENT: theChecklist', this.theCurrentStep, this.activeChecklist)

		// filter out the active step
		this.activeSubChecklist = this.activeChecklist.nodes.filter(node => node.isActive )
	},

	methods: {

		updateChecklist() {

			this.theCurrentSubStep = this.currentSubStep

			this.activeSubChecklist = this.activeChecklist.nodes.filter(node => node.isActive )
			
			this.activeChecklistTitle = this.activeChecklist.label
			this.activeChecklistSubTitle = this.activeSubChecklist[0].label

			this.debug && console.log('CHECKLISTCONTENT: currentStep handler', this.currentStep, this.activeSubChecklist)
		},
	}
}