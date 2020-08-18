import Concession				from '@/00_services/api/Concession'

export default {
	name: 'Date',

	props: {
		dateType: {
			type: String // DD/MM/YYYY or fullname
		} 
	},

	data() {
		return {
			debug: false,
			isLoaded: false,
			theDate: {
				number: null,
				name: String,
				fullname: String,
				date: null,
				month: String,
				format: null,
			},
		}
	},

	computed: {
    date() {

    	this.formatDate()
    	this.debug && console.log('DATA: computed')
    }
  },

	mounted() {

		Concession.today().then(response => this.onSucces(response))
	},

	methods: {

		onSucces(response) {

			this.debug && console.log('DATE: onSucces', response)

			this.theDate.number = response.number
			this.theDate.name = response.name
			this.theDate.fullname = response.fullname
			this.theDate.date = response.date
			this.theDate.month = response.month

			this.formatDate()

			this.isLoaded = true
			this.$emit('loaded',this.isLoaded)
		},

		formatDate() {

			switch(this.dateType) {
    		case 'DD/MM/YYYY':
	    		this.theDate.format = this.theDate.date
	    		break
    		
    		case 'nameOfDay+DD/MM/YYYY':
    			this.theDate.format = this.theDate.name + ' ' + this.theDate.date
    			break

    		case 'nameOfDay':
    			this.theDate.format = this.theDate.fullname
    			break

    		case 'nameOfMonth':
    			this.theDate.format = this.theDate.month
    			break

    		default:
    			this.theDate.format = this.theDate.name + ' ' + this.theDate.number + ' ' + this.theDate.month
    	}

    	this.debug && console.log('DATE: formatDate', this.theDate.format)

    	return this.theDate.format
		
		}
	}
}