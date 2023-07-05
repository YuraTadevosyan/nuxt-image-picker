<template>
  <div ref="footer" class="footer" />
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
    this.$refs.footer.style.backgroundImage = 'url(/background/light/footer/1.svg)'

    this.$watch(
      () => {
        return this.$vuetify.theme.dark
      },
      (val) => {
        this.index = 2

        this.clearInterval()

        this.$refs.footer.style.backgroundImage = `url(/background/${val ? 'dark' : 'light'}/footer/1.svg)`

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
        this.$refs.footer.style.backgroundImage = `url(/background/${this.$vuetify.theme.dark ? 'dark' : 'light'}/footer/${this.index}.svg)`
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
.footer {
  z-index: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-size: cover;
  background-position: bottom;
}
</style>
