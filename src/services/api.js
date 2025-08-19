import axios from 'axios'

const API =axios.create({
    baseURL:'https://server-saf3.onrender.com/api',
    withCredentials:true,
})

export default API;