import {EventBus} 		from '@/00_global/eventbus'

import Tracks 				from '@/00_services/api/Tracks'


export default {
	name: 'MalfunctionsDetail',

	props: {
		viewData: Object,
	},

	data() {
		return {
			debug: false,
			isLoading: true,
			theMalfunction: this.viewData.malfunction,
			theFlightInfo: this.viewData.flightInfo,
		}
	},

	mounted() {

		this.debug && console.log('MALFUNCTIONSDETAIL: mounted:', this.theMalfunction)
		this.isLoading = false
		this.theMalfunction.urgent = 1
	},

	methods: {

		handlePhotoClick() {

			this.debug && console.log('COMMENTSCONFIRM: handlePhotoClick')

			let viewData = {...viewData, title: this.theMalfunction.category, subtitle: 'Storing', remarks: this.theMalfunction.remarks, image: this.theMalfunction.image }

			EventBus.$emit('togglePhotoViewer', true, viewData);
		},

		// getShift() {

		// 	Tracks.shifts(this.theFlightInfo.track_id).then(response => response.status !== 200 ? this.onFail(response) : this.onSuccess(response))		
		// },

		// onSuccess(response) {

		// 	let shifts = JSON.parse(response.data.body)

		// 	this.theShift = shifts.filter(shift => shift.id == this.theMalfunction.shift_id)
			
		// 	this.isLoading = false
		// },

		formatDateOfMalfunction(malfunction) {

			let dateStamp = new Date() 
			let theDate = malfunction.created_at.substring(0, malfunction.created_at.length - 8)
			
			let [yyyy,mm,dd] = theDate.split('-');

			theDate = (`${yyyy}/${mm}/${dd}`)

			this.debug && console.log('MALFUNCTIONSDETAIL: formatDateOfMalfunction', theDate)

			return theDate
		},

		formatTimeOfMalfunction(malfunction) {
			
			let theTime = malfunction.created_at.substring(10, malfunction.created_at.length - 3)
			
			this.debug && console.log('MALFUNCTIONSDETAIL: formatTimeOfMalfunction', theTime)

			return theTime
		},
	}
}