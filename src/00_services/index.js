import axios from 'axios'

const API_URL = 'https://backend-cockpit-2020.noticed.be/api'
const LOCAL_URL = 'https://cockpit.test/api/'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': {
      toString () {
        return `Bearer ${localStorage.getItem('token')}`
      }
    },
    'Concession': {
      toString () {
        return `${localStorage.getItem('concession')}`
      }
    },
  }
})





