import axios from 'axios'

// const API_URL = "http://localhost:8000"
axios.defaults.baseURL = "http://localhost:8000"

export default {

    getInference: async (params) => {
        const res = await axios.get(`/tag/${params.tag}`)
        console.log(res)
        return res.data.predictions
    }

}

