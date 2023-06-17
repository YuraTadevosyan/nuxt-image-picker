<template>
  <section ref="intro" class="intro d-flex align-center justify-center">
    <h1 class="primary--text text--lighten-1">
      Welcome to Image Picker App
    </h1>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      index: 2,
      intervalId: null
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
    // Stop fetching notifications
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

<style scoped>
.intro {
  margin: -16px;
  background-size: cover;
  background-position: top right;
  min-height: 900px;
}
</style>
