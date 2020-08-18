import ChecklistPanel 	from '@/04_organisms/ChecklistPanel/ChecklistPanel.vue'

export default {
	name: 'Checklist',

	components: {
		ChecklistPanel,
	},

	data() {
		return {
			debug: false,
			currentTrack: false,
		}
	},

	methods: {

		stepIsSet(step, substep) {
			
			this.debug && console.log('CHECKLIST: stepIsSet', this.$route.query.step, step, substep)
		
			// check url to prevent navigation duplicated error
			this.$route.query.step != step && this.$router.replace({ query: {step: `${step}`, substep: `${substep}`} })
			this.$route.query.substep != substep && this.$router.replace({ query: {step: `${step}`, substep: `${substep}`} })
		},

		checklistTracker(currentTrack) {
			
			// gets called from checklistpanel
			// set class for centering title etc
			this.debug && console.log('CHECKLIST: checklistTracker', currentTrack)
			currentTrack >= 1 ? (this.currentTrack = true) : (this.currentTrack = false)
		},

		handlePrevClick() {
			
			this.debug && console.log('CHECKLIST: handlePrevClick')
			this.$refs.ChecklistPanel.handlePrevClick()
		}
	}
}