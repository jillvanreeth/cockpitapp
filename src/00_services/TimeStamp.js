export default {

	getTime() {
		
		let time = new Date()
	
    let hh = (time.getHours() < 10 ? '0' : '') + time.getHours()
   	let mm = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
    let ss = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds()
  	
  	time = hh + ':' + mm + ':' + ss
  	// console.log(time)
		return time
	}
}