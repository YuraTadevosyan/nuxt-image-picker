import axios from 'axios'

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos',
  params: {
    per_page: 24,
  }
})

export default ({ app }, inject) => {
  inject('unsplash', unsplashApi)
}
