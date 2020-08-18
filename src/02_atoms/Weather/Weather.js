import Flights				from '@/00_services/api/Flights'

export default {
	name: 'Weather',

	data() {
		return {
			debug: false,
			isLoaded: false,
			location: {
				lng: null,
				lat: null,
			},
			weather: {
				icon: null,
				temperature: null,
				state: String,
			}
		}
	},
	
	mounted() {

		navigator.geolocation && navigator.geolocation.getCurrentPosition(this.getLatLng)
	},

	methods: {

		getLatLng(position) {

			this.location.lng = position.coords.longitude;
  		this.location.lat = position.coords.latitude;

  		this.debug && console.log('WEATHER: getLatLong', this.location.lng, this.location.lat)

  		this.getWeather()
		},

		getWeather() {

			let flight = JSON.parse(localStorage.getItem('flight'))[0].id

			localStorage.setItem('lng', this.location.lng)
			localStorage.setItem('lat', this.location.lat)

			Flights.weather(flight).then(response => this.onSucces(response))
		},

		onSucces(response) {

			this.debug && console.log('WEATHER: onSucces', response)

			this.weather.icon = 'icon' + response.icon.replace(/n/g, 'd')
			this.weather.temperature = response.temperature
			this.weather.state = response.state

			this.isLoaded = !this.isLoaded
			this.$emit('loaded',this.isLoaded)
		}
	}
}