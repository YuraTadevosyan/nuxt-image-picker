<template>
  <div class="home">
    <section ref="intro" class="home__intro d-flex flex-column align-center justify-center">
      <h1 class="primary--text text--lighten-1">
        Welcome to Image Picker App
      </h1>
      <h2 :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">
        We Provide the <em>best app</em> for getting images by prompt
      </h2>
    </section>

    <v-container>
      <section class="home__discover d-flex pb-10 flex-column">
        <span :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">Discover</span>

        <h3 class="primary--text text--lighten-1 text-h3 mt-5">
          Easily explore images from Unsplash, Pixabay, and Pexels all in one place!
        </h3>
      </section>

      <v-divider class="primary lighten-1" />

      <section class="home__about d-flex py-15 flex-column">
        <h3 class="primary--text text--lighten-1 text-h3 mb-5">
          Unleash Your Creativity!
        </h3>

        <div class="text-h6" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">
          Welcome to the ultimate image picker prompt where Unsplash, Pixabay, and Pexels unite! Dive deep into the ocean of breathtaking images and discover the perfect one just a click away.
          <br><br>
          Say goodbye to tedious image searches and hello to a world filled with endless possibilities. We’ve gathered the finest, royalty-free images for you to explore and use.
          <br><br>
          Whether you’re a designer, content creator, or just someone in need of a beautiful background, our image picker prompt delivers the good stuff right to your screen.
        </div>
      </section>

      <v-divider class="primary lighten-1" />

      <section class="home__get-started d-flex py-10 flex-column align-center mx-auto mb-10">
        <AnimatedBlob :is-dark="$vuetify.theme.dark" />

        <h3 class="primary--text text--lighten-1 text-h3 mt-5">
          Ready to Dive In?
        </h3>

        <div class="text-center text-h6 my-4" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">
          Begin your journey towards visual perfection now! Don’t miss out on the incredible collection of stunning images. Experience the power of the ultimate Image Picker!
        </div>

        <v-btn
          class="primary--text text--lighten-1 mr-4"
          color="primary darken-2"
        >
          Start Exploring Now
        </v-btn>
      </section>

      <!--      <v-divider class="primary lighten-1" />-->
    </v-container>

    <!--    <section>-->
    <!--      “A masterpiece of image exploration - unleash your creativity!”-->
    <!--    </section>-->
  </div>
</template>

<script>
import AnimatedBlob from '~/components/UI/AnimatedBlob.vue'

export default {
  components: { AnimatedBlob },
  data: () => {
    return {
      index: 2,
      intervalId: null,
      thirdPartyImagePickers: [
        { title: 'Unsplash', icon: '', description: 'The internet’s source for visuals. Powered by creators everywhere.', url: 'https://unsplash.com/' }
      ],
    }
  },
  mounted () {
    this.$refs.intro.style.backgroundImage = 'url(/background/light/intro/1.svg)'

    this.$watch(
      () => {
        return this.$vuetify.theme.dark
      },
      (val) => {
        this.index = 2

        this.clearInterval()

        this.$refs.intro.style.backgroundImage = `url(/background/${val ? 'dark' : 'light'}/intro/1.svg)`

        if (!this.intervalId) {
          this.setIntervalIntro()
        }
      }
    )

    if (!this.intervalId) {
      this.setIntervalIntro()
    }
  },
  beforeDestroy () {
    if (this.intervalId) {
      this.clearInterval()
    }
  },
  methods: {
    clearInterval () {
      clearInterval(this.intervalId)

      this.intervalId = null
    },
    setIntervalIntro () {
      this.intervalId = setInterval(() => {
        this.$refs.intro.style.backgroundImage = `url(/background/${this.$vuetify.theme.dark ? 'dark' : 'light'}/intro/${this.index}.svg)`
        if (this.index === 5) {
          this.index = 1
        } else {
          this.index++
        }
      }, 3000)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  &__intro {
    margin: -16px;
    background-size: cover;
    background-position: top right;
    min-height: 900px;
  }

  &__discover,
  &__about,
  &__get-started {
    max-width: 50vw;
  }

  &__get-started {
    position: relative;
  }
}
</style>
