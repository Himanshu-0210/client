import axios from 'axios'

const API =axios.create({
    baseURL:'https://coursebookingby-himanshu.netlify.app/api',
    withCredentials:true,
})

export default API;