<template>
  <v-container class="container-custom" style="padding-top: 150px">
    <v-row dense>
      <v-col
        v-for="card in cards"
        :key="card.title"
        :cols="card.flex"
      >
        <v-card color="primary darken-1">
          <v-img
            :src="card.src"
            :lazy-src="card.src"
            class="white--text align-end"
            height="150px"
          >
            <span class="gradient-background" :class="$vuetify.theme.dark ? 'gradient-background--dark' : ''" />

            <v-card-title class="text-h2 font-weight-bold primary--text text--lighten-1 gradient-background__title">
              {{ card.title }}
            </v-card-title>
          </v-img>

          <v-text-field
            v-model="card.field.value"
            :label="card.field.label"
            color="primary lighten-1"
            class="mt-3"
            flat
            filled
            dense
            hide-details
          />

          <v-card-subtitle class="primary--text text--lighten-1 text-h6">
            You can get key <a class="primary--text text--lighten-1 text-h6" :href="card.keyUrl" target="_blank">here</a>
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="12" class="d-flex align-center justify-center mt-3">
        <v-btn large color="primary darken-3 px-15" @click="saveKeys">
          <span class="primary--text text--lighten-1">Save</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    cards: [
      { title: 'Unsplash', src: '/pages/settings/unsplash.jpg', flex: 12, field: { value: '', label: 'Unsplash key' }, keyUrl: 'https://unsplash.com/oauth/applications' },
      { title: 'Pixabay', src: '/pages/settings/pixabay.jpg', flex: 6, field: { value: '', label: 'Pixabay key' }, keyUrl: 'https://pixabay.com/api/docs/' },
      { title: 'Pexels', src: '/pages/settings/pexels.jpg', flex: 6, field: { value: '', label: 'Pexels key' }, keyUrl: 'https://www.pexels.com/api/new/' },
    ],
  }),
  mounted () {
    const apiKeys = JSON.parse(localStorage.getItem('imageAPIKeys'))

    if (!apiKeys) {
      return
    }

    this.cards.forEach((card) => {
      card.field.value = apiKeys[card.title.toLowerCase()]
    })
  },
  methods: {
    saveKeys () {
      const keys = this.cards.map(card => card.title.toLowerCase())
      const values = this.cards.map(card => card.field.value)
      const obj = {}

      keys.forEach((key, index) => {
        obj[key] = values[index]
      })

      localStorage.setItem('imageAPIKeys', JSON.stringify(obj))
    }
  }
}
</script>

<style scoped lang="scss">
.gradient-background {
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  display: block;
  position: absolute;
  background: linear-gradient(25deg, #e8d3ff, #c6cfff, #deecff);
  background-size: 600% 600%;
  animation: ImageGradientAnimation 6s ease infinite;

  &__title {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }

  &--dark {
    background: linear-gradient(25deg, #18122B, #393053, #443C68);
    background-size: 600% 600%;
  }
}

@keyframes ImageGradientAnimation {
  0%, 100% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%
  }
}
</style>
