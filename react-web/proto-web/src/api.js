import axios from 'axios'

// const API_URL = "http://localhost:8000"
axios.defaults.baseURL = "http://49.50.162.241:8000"

export default {

    getInference: async (params) => {
        const res = await axios.get(`/tag/${params.tag}`)
        console.log(res)
        return res.data
    }

}

