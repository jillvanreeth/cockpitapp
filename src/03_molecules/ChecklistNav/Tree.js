export default {
	name: 'Tree',
	
  props: {
  	currentStep: String,
  	currentSubStep: String,
  	nodes: Array,
  	label: 'String',
  	isCompleted: Boolean,
  	depth: null,
	},

	data() {
		return {
			debug: false,
		}
	},

	// computed: {
 //    stepOrSubStep() {
    	
 //    	switch(this.depth) {
 //    		case 0:  			
 //    			return 'checklistNav'
 //    		case 1:
	//     		return this.label && this.currentStep == this.label.toLowerCase() ? 'checklistNav__item is-active' : 'checklistNav__item'
 //    			break
 //    		case 2:
 //    			return this.label && this.currentSubStep == this.label.toLowerCase() ? 'checklistNav__item--sub is-active' : 'checklistNav__item--sub'
 //    			break	
 //    	}
 //    },
 //  },

  mounted() {

  	this.createTree()		
		console.log("tree mounted")
		// set active nav item
		//this.theCurrentStep && 
	},

	methods: {
		
		createTree() {

			if(!this.nodes) return false
			if(!this.nodes[0].nodes) return false

				
		}
	}
}