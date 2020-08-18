import Vue 					from 'vue'
import VueRouter 		from 'vue-router'
import Vuex					from 'vuex'
import './registerServiceWorker'

/*
*
* COMPONENTS
*
*/

import axios 									from '@/00_services'

import App 										from '@/00_global/App.vue'

// @/02_atoms/
import Brand									from '@/02_atoms/Brand/Brand.vue'
import Date										from '@/02_atoms/Date/Date.vue'
import Loader									from '@/02_atoms/Loader/Loader.vue'
import Logout 								from '@/02_atoms/Logout/Logout.vue'
import SvgIcon 								from '@/02_atoms/SvgIcon/SvgIcon.vue'
import Time 									from '@/02_atoms/Time/Time.vue'

// @/03_molecules/
import Crew										from '@/03_molecules/Crew/Crew.vue'
import FlightCurrent 					from '@/03_molecules/FlightCurrent/FlightCurrent.vue'
import FlightNext 						from '@/03_molecules/FlightNext/FlightNext.vue'
import LoginForm							from '@/03_molecules/LoginForm/LoginForm.vue'
import MalfunctionsConfirm 		from '@/03_molecules/MalfunctionsConfirm/MalfunctionsConfirm.vue'
import MalfunctionsForm 			from '@/03_molecules/MalfunctionsForm/MalfunctionsForm.vue'
import MalfunctionsOverview		from '@/03_molecules/MalfunctionsOverview/MalfunctionsOverview.vue'
import MalfunctionsSituation 	from '@/03_molecules/MalfunctionsSituation/MalfunctionsSituation.vue'
import PincodeForm						from '@/03_molecules/PincodeForm/PincodeForm.vue'
import Shift									from '@/03_molecules/Shift/Shift.vue'
import ShiftResume						from '@/03_molecules/ShiftResume/ShiftResume.vue'
import Ship										from '@/03_molecules/Ship/Ship.vue'
import Success								from '@/03_molecules/Success/Success.vue'
import Tracks									from '@/03_molecules/Tracks/Tracks.vue'
import Whoops									from '@/03_molecules/Whoops/Whoops.vue'

// @/04_organisms/
import Camera 								from '@/04_organisms/Camera/Camera.vue'
import FlightEditPanel				from '@/04_organisms/FlightEditPanel/FlightEditPanel.vue'
import FlightOverview					from '@/04_organisms/FlightOverview/FlightOverview.vue'
import FlightPanel						from '@/04_organisms/FlightPanel/FlightPanel.vue'
import MalfunctionsPanel			from '@/04_organisms/MalfunctionsPanel/MalfunctionsPanel.vue'
import Offcanvas							from '@/04_organisms/Offcanvas/Offcanvas.vue'
import PhotoViewer						from '@/04_organisms/PhotoViewer/PhotoViewer.vue'
import Steps 									from '@/04_organisms/Steps/Steps.vue'

// @/05_buckets/
import Checklist							from '@/05_buckets/Checklist/Checklist.vue'
import Dashboard							from '@/05_buckets/Dashboard/Dashboard.vue'
import Flight									from '@/05_buckets/Flight/Flight.vue'
import Help 									from '@/05_buckets/Help/Help.vue'
import Login 									from '@/05_buckets/Login/Login.vue'
import Malfunctions						from '@/05_buckets/Malfunctions/Malfunctions.vue'
import Notifications 					from '@/05_buckets/Notifications/Notifications.vue'
import Start									from '@/05_buckets/Start/Start.vue'
import UI 										from '@/05_buckets/UI/UI.vue'


/*
*
* GLOBAL COMPONENT REGISTRATION
*
*/

Vue.component('Brand', Brand)
Vue.component('Camera', Camera)
Vue.component('Date', Date)
Vue.component('Loader', Loader)
Vue.component('Logout', Logout)
Vue.component('SvgIcon', SvgIcon)
Vue.component('Success', Success)
Vue.component('Time', Time)
Vue.component('Offcanvas', Offcanvas)
Vue.component('PhotoViewer', PhotoViewer)
Vue.component('Whoops', Whoops)



/*
*
* STORE
*
*/

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		checklistId: localStorage.getItem('checklist') ? JSON.parse(localStorage.getItem('checklist'))[0].checklistId : null,
		flightSettings: { 
			track: localStorage.getItem('track') ? JSON.parse(localStorage.getItem('track'))[0] : null,
			shift: localStorage.getItem('shift') ? JSON.parse(localStorage.getItem('shift'))[0] : null,
			ship: localStorage.getItem('ship') || null,
			crew: localStorage.getItem('crew') || null,
		},
		allItems: localStorage.getItem('allItems') ? localStorage.getItem('allItems') : null,
		items: null,
		passengers: localStorage.getItem('passengers') ? JSON.parse(localStorage.getItem('passengers')) : {
			people: {
				min: '',
				plus: '',
				current_people: 0,
			},
			bikes: {
				min: '',
				plus: '',
				current_bikes: 0,
			}
		},
		malfunctions: {
			situation: null,
			image: null,
			remarks: null,
		},
		notificationsCount: 0,
	},

	mutations: {
		setMalfunctionsSituation(state,value) {
			state.malfunctions.situation = value
		},

		setMalfunctionsImage(state,value) {
			state.malfunctions.image = value
		},

		setMalfunctionsRemarks(state,value) {
			state.malfunctions.remarks = value
		},

		setChecklistId(state,id) {
			state.checklistId = id
		},

	  setTrack(state, track) {
	    state.flightSettings.track = JSON.parse(track)[0]
	  },

	  setShift(state, shift) {
	  	state.flightSettings.shift = JSON.parse(shift)[0]
	  },

	  setShip(state, ship) {
	  	state.flightSettings.ship = ship
	  },

	  setCrew(state, crew) {
	  	state.flightSettings.crew = crew
	  },

	  setNextStop(state,obj) {
	  	state.nextStop = obj
	  },

	  setFlightInfo(state, obj) {
	  	state.flightInfo = obj
	  },

	  setPassengers(state, obj) {
	  	state.passengers = obj
	  },

	  setSecondStop(state, obj) {
	  	state.secondStop = obj
	  },

	  setDeparture(state, obj) {
	  	state.departure = obj
	  },

	  setAllItems(state, obj) {
	  	state.allItems = obj
	  },

	  setItems(state, obj) {
	  	state.items = obj
	  },

	  setNotificationsCount(state, value) {
	  	state.notificationsCount = value
	  },
	}
})


/*
*
* ROUTING
*
*/
Vue.use(VueRouter)

const routes = [
	{ path: '/', 							name:'login', 			component: Login },
	{ path: '/checklist', 		name:'checklist',		component: Checklist, query: { step: 'scheepsinfo', substep: 'draaiuren' }},
	{ path: '/dashboard',			name:'dashboard', 	component: Dashboard },
	{ path: '/flight',														component: Flight,
		children: [
			{ path: '/', 						 													component: FlightPanel,
				children: [
					{ path: '/flight', 			redirect: 'next-stop'},
					{ path: 'next-stop',		name:'next-stop', 		component: FlightNext, meta: { title: 'Huidige vaart' }},
					{ path: 'current-stop',	name: 'current-stop',	component: FlightCurrent, props: true, meta: { title: 'Huidige vaart' }},
				]
			},
			{ path: 'edit', 				name:'edit', 					component: FlightEditPanel, meta: { title: 'Vaart bewerken' }},
			{ path: 'overview', 		name:'overview', 			component: FlightOverview, meta: { title: 'Uw vaart overzicht' }},
		]
	},
	{ path: '/help',					name:'help', 				component: Help },
	{ path: '/malfunctions',											component: Malfunctions,
		children: [
			{ path: '/',																	component: MalfunctionsOverview },
			{ path: 'create',															component: MalfunctionsPanel,
				children: [
					{ path: '/',						redirect: 'step-1/1' },
					{ path: 'step-1/:id', 	name:'step-1', 				component: MalfunctionsSituation, meta: { title: 'Storing versturen'}},
					{ path: 'step-2/:id', 	name:'step-2', 				component: MalfunctionsForm, meta: { title: 'Storing versturen'}},
					{ path: 'step-3/:id', 	name:'step-3', 				component: MalfunctionsConfirm, meta: { title: 'Storing versturen'}},
				]
			},
		] 
	},
	{ path: '/notifications',	component: Notifications },
	{ path: '/start', 				component: Start, props:(route) => ({ query: route.query.q }),
		children: [
			{ path: '/start', 					redirect: 'step-1/1' },
			{ path: 'step-1/:id',				component: Tracks },
			{ path: 'step-2/:id',				component: Shift },
			{ path: 'step-2/:id/resume',component: ShiftResume },
			{ path: 'step-3/:id',	 			component: Ship },
			{ path: 'step-4/:id',	 			component: Crew }
		] 
	},
	{ path: '/UI', 						component: UI }
]

const router = new VueRouter({
	mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
	const departure = store.state.departure

	if(departure && to.name == 'next-stop' && from.name == 'current-stop') next()
  if(to.name == 'flight' || to.name == 'next-stop' && from.name == 'current-stop') next(false)
  else next()
})


new Vue({
	store,
	router,
	axios,
  render: h => h(App),
}).$mount('#app')
