<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card color="primary darken-1">
        <v-card-text class="pt-3">
          <v-hover v-slot="{ hover }">
            <v-img
              :src="zoomedImage.src"
              :lazy-src="zoomedImage.src"
              aspect-ratio="1"
              class="pointer"
            >
              <v-expand-transition>
                <div
                  v-if="hover && !loading"
                  class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal text-h2 white--text"
                  style="height: 100%;"
                >
                  <v-icon color="primary lighten-1" @click="downloadImage(zoomedImage)">
                    mdi-download
                  </v-icon>
                </div>
              </v-expand-transition>

              <template #placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey"
                  />
                </v-row>
              </template>
            </v-img>
          </v-hover>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card color="transparent" style="margin-top: 150px;">
      <v-card-title class="text-h5">
        Select Image
      </v-card-title>
      <v-card-text>
        <v-row justify="space-between">
          <v-col>
            <v-text-field
              v-model="search"
              color="primary lighten-1"
              label="Search Name"
              clearable
              style="max-width: 250px"
              @input="searchImageByName"
            />
          </v-col>
        </v-row>

        <v-tabs
          v-model="tab"
          color="primary lighten-1"
          background-color="primary"
          @change="tabChange"
        >
          <v-tab active-class="primary--text text--lighten-1 primary darken-1">
            Unsplash
          </v-tab>
          <v-tab active-class="primary--text text--lighten-1 primary darken-1">
            Pixabay
          </v-tab>
          <v-tab active-class="primary--text text--lighten-1 primary darken-1">
            Pexels
          </v-tab>

          <v-tab-item
            v-for="n in 3"
            :key="n"
            class="primary"
          >
            <div
              v-if="!(Object.values(imageApiKeys)[n - 1] || n === 4)"
              class="d-flex align-center justify-center my-8"
            >
              Please, add API key of <b class="mx-1"> {{ toCapitalize(Object.keys(imageApiKeys)[n - 1]) }} </b> in the Settings page
            </div>

            <v-container v-else fluid>
              <v-item-group
                v-if="!loading"
                v-model="selection"
              >
                <v-row>
                  <v-col
                    v-for="(image, index) in images"
                    :key="index"
                    cols="12"
                    md="2"
                  >
                    <v-hover v-slot="{ hover }">
                      <v-item v-slot="{ active, toggle }">
                        <v-img
                          :src="image.src"
                          :lazy-src="image.src"
                          aspect-ratio="1"
                          class="pointer"
                          @click="toggle"
                        >
                          <v-expand-transition>
                            <div
                              v-if="hover && !loading"
                              class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal text-h2 white--text"
                              style="height: 100%;"
                            >
                              <v-icon color="primary lighten-1" @click="downloadImage(image)">
                                mdi-download
                              </v-icon>

                              <v-icon color="primary lighten-1" @click="zoomImage(image)">
                                mdi-magnify-plus
                              </v-icon>
                            </div>
                          </v-expand-transition>

                          <template #placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular
                                indeterminate
                                color="grey"
                              />
                            </v-row>
                          </template>

                          <v-btn
                            v-if="active"
                            icon
                            class="select-icon"
                          >
                            <!--                          <v-icon color="primary">-->
                            <!--                            mdi-check-circle-->
                            <!--                          </v-icon>-->
                          </v-btn>
                        </v-img>
                      </v-item>
                    </v-hover>
                  </v-col>
                </v-row>
              </v-item-group>

              <v-row v-else align="start" justify="center">
                <v-col v-for="i in 24" :key="i" cols="12" md="2">
                  <v-skeleton-loader
                    style="aspect-ratio: 1"
                    max-width="100%"
                    height="100%"
                    elevation="2"
                    type="image"
                    class="image-skeleton"
                  />
                </v-col>
              </v-row>

              <div v-if="images.length" class="d-flex align-end justify-end mt-5">
                <v-btn
                  color="primary darken-2"
                  class="primary--text text--lighten-1 mr-2"
                  :disabled="page <= 1"
                  :loading="loading"
                  @click="changePage('prev')"
                >
                  <v-icon left>
                    mdi-page-previous
                  </v-icon>
                  Prev
                </v-btn>

                <v-btn
                  color="primary darken-2"
                  class="primary--text text--lighten-1"
                  :disabled="totalPages ? page >= totalPages : page * images.length >= totalHits"
                  :loading="loading"
                  @click="changePage('next')"
                >
                  Next
                  <v-icon right>
                    mdi-page-next
                  </v-icon>
                </v-btn>
              </div>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      imageApiKeys: {
        unsplash: '',
        pixabay: '',
        pexels: '',
      },
      search: null,
      tab: 0,
      images: [],
      loading: false,
      page: 1,
      itemsPerPage: 24,
      totalHits: 0,
      totalPages: 0,
      selection: null,
      dialog: false,
      zoomedImage: {},
    }
  },
  fetch () {
    // GET Image API keys
    const settings = JSON.parse(localStorage.getItem('imageAPIKeys'))

    this.imageApiKeys = settings || this.imageApiKeys

    this.tabChange()
  },
  methods: {
    // Capitalize the property
    toCapitalize (apiType) {
      return apiType.replace(/^./, apiType[0].toUpperCase())
    },
    // Handle tab change
    tabChange () {
      this.page = 1
      this.selection = null
      this.images = []

      if (Object.values(this.imageApiKeys)[this.tab] || this.tab === 3) {
        this.getImages(this.search)
      }
    },
    // Get Image by name
    searchImageByName (search) {
      this.page = 1

      this.getImages(search)

      this.selection = null
    },
    // Get Images from API
    getImages (search, page = 1) {
      if (!(Object.values(this.imageApiKeys)[this.tab] || this.tab === 3)) {
        return
      }

      this.loading = true

      setTimeout(async () => {
        this.search = this.search || 'Nature'

        try {
          switch (this.tab) {
            case 0: {
              this.totalPages = 0

              const response = await this.$pixabay.get('/', {
                params: {
                  key: this.imageApiKeys?.pixabay,
                  q: search,
                  page,
                },
              })

              this.images = response.data.hits.map((el) => {
                return {
                  src: el.webformatURL,
                  ...el
                }
              })

              this.totalHits = response.data.totalHits

              break
            }
            case 1: {
              this.totalPages = 0

              const response = await this.$pexels.get('/', {
                headers: {
                  common: {
                    Authorization: this.imageApiKeys?.pexels
                  }
                },
                params: {
                  query: this.search,
                  page
                },
              })

              this.images = response.data.photos.map((el) => {
                return {
                  ...el,
                  src: el.src.medium
                }
              })

              this.totalHits = response.data.total_results

              break
            }
            case 2: {
              const response = await this.$unsplash.get('/', {
                params: {
                  client_id: this.imageApiKeys?.unsplash,
                  query: this.search,
                  page,
                },
              })

              this.images = response.data.results.map((el) => {
                return {
                  ...el,
                  src: el.urls.small
                }
              })

              this.totalPages = response.data.total_pages

              break
            }
            case 3: {
              if (this.page === 1) {
                const response = await this.$wikiImagesService.find({
                  name: this.search,
                })
                this.wikimediaImages = response
              }

              const data = this.wikimediaImages.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage)

              this.images = data.map((el) => {
                return {
                  src: el
                }
              })

              this.totalPages = Math.ceil(this.wikimediaImages.length / this.itemsPerPage)

              break
            }
          }

          this.loading = false
        } catch (e) {
          console.error(e)
        }
      }, 2500)
    },
    // Change Page
    changePage (toPage) {
      this.getImages(this.search, toPage === 'next' ? ++this.page : --this.page)

      this.selection = null
    },
    // Download selected Image
    downloadImage (image) {
      axios({
        url: image.src,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]))
        const fileLink = document.createElement('a')

        fileLink.href = fileURL
        fileLink.setAttribute('download', 'image.jpeg')
        document.body.appendChild(fileLink)

        fileLink.click()
      })
    },
    zoomImage (image) {
      this.dialog = true
      this.zoomedImage = image
    }
  }
}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  width: 100%;
  opacity: 0.8;
  position: absolute;
  align-items: center;
  justify-content: center;
}
</style>
