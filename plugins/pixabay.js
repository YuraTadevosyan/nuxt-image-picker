import axios from 'axios'

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    per_page: 24,
  },
})

export default (_, inject) => {
  inject('pixabay', pixabayApi)
}
