<template>
  <div class="home">
    <section ref="intro" class="home__intro d-flex flex-column align-center justify-center" :class="$vuetify.theme.dark ? 'home__intro--dark' : ''">
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

      <section class="home__about d-flex py-15 flex-column align-center">
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
        <UIAnimatedBlob :is-dark="$vuetify.theme.dark" />

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
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      thirdPartyImagePickers: [
        { title: 'Unsplash', icon: '', description: 'The internet’s source for visuals. Powered by creators everywhere.', url: 'https://unsplash.com/' }
      ],
    }
  },
  head: () => {
    return {
      link: [
        { rel: 'preload', as: 'image', href: '/background/light/intro/1.svg' },
        { rel: 'preload', as: 'image', href: '/background/light/intro/2.svg' },
        { rel: 'preload', as: 'image', href: '/background/light/intro/3.svg' },
        { rel: 'preload', as: 'image', href: '/background/light/intro/4.svg' },
        { rel: 'preload', as: 'image', href: '/background/light/intro/5.svg' },
        { rel: 'preload', as: 'image', href: '/background/dark/intro/1.svg' },
        { rel: 'preload', as: 'image', href: '/background/dark/intro/2.svg' },
        { rel: 'preload', as: 'image', href: '/background/dark/intro/3.svg' },
        { rel: 'preload', as: 'image', href: '/background/dark/intro/1.svg' },
        { rel: 'preload', as: 'image', href: '/background/dark/intro/5.svg' },
      ]
    }
  },
}
</script>

<style scoped lang="scss">
.home {
  &__intro {
    margin: -16px;
    background-size: cover;
    background-position: top right;
    min-height: 900px;
    background-image: url(/background/light/intro/1.svg);
    animation: bgImageLight 12s linear infinite;
    will-change: background-image;

    &--dark {
      animation-name: bgImageDark;
    }
  }

  &__discover,
  &__about,
  &__get-started {
    max-width: 50vw;
    margin: 0 auto;
  }

  &__get-started {
    position: relative;
  }
}

@keyframes bgImageLight {
  0%,100% { background-image: url(/background/light/intro/1.svg) }
  20% { background-image: url(/background/light/intro/2.svg) }
  40% { background-image: url(/background/light/intro/3.svg) }
  60% { background-image: url(/background/light/intro/4.svg) }
  80% { background-image: url(/background/light/intro/5.svg) }
}

@keyframes bgImageDark {
  0%,100% { background-image: url(/background/dark/intro/1.svg) }
  20% { background-image: url(/background/dark/intro/2.svg) }
  40% { background-image: url(/background/dark/intro/3.svg) }
  60% {  background-image: url(/background/dark/intro/4.svg) }
  80% { background-image: url(/background/dark/intro/5.svg) }
}
</style>
