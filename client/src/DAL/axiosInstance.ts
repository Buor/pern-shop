import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : window.location.origin + '/api'
})

export default axiosInstance