export default {
	name:'Loader',

	props: {
		colorMode: String
	},

	data() {
		return {
			theColorMode: this.colorMode ? 'dark' : 'light'
		}
	}
}