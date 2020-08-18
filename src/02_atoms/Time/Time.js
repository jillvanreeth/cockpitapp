export default {
	name: 'Time',

	data() {
		return {
			debug: false,
			timestamp: '',
			isLoaded: false,
		}
	},

	created() {

		setInterval(this.getTime, 1000)
		this.isLoaded = !this.isLoaded
	},

	methods: {

		getTime() {
			
			this.debug && console.log('TIME: getTime')

			function addZero(i) { 
				i < 10 && (i = '0' + i) 
				return i
			}

			const today = new Date()
      const time = addZero(today.getHours()) + ":" + addZero(today.getMinutes())
      
      this.timestamp = time

      this.isLoaded = !this.isLoaded
     
      this.$emit('emitLoaded',this.isLoaded)
		}
	}
}