import axios from 'axios'

const pexelsApi = axios.create({
  baseURL: 'https://api.pexels.com/v1/search',
  params: {
    per_page: 24,
  },
})

export default (_, inject) => {
  inject('pexels', pexelsApi)
}
