import axios from 'axios'

export default {

    getInference: async (params) => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/albums', { params })
        console.log(res)
        return res.data
    }

}

