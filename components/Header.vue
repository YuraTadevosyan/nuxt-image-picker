<template>
  <v-app-bar
    absolute
    app
    color="transparent"
    elevation="0"
    height="100px"
    class="header py-3"
  >
    <v-row align="center" justify="space-between">
      <v-col>
        <v-img
          width="200px"
          :src="!isDark ? '/logo-dark.png' : '/logo.png'"
          :lazy-src="!isDark ? '/logo-dark.png' : '/logo.png'"
          class="pointer"
          @click="$router.push('/')"
        />
      </v-col>

      <v-col class="d-flex justify-end">
        <NuxtLink active-class="font-weight-bold" class="text-h4 font-weight-medium primary--text text--lighten-1 text-decoration-none mx-15" to="/generate">
          Generate
        </NuxtLink>

        <NuxtLink active-class="font-weight-bold" class="text-h4 font-weight-medium primary--text text--lighten-1 text-decoration-none mr-15" to="/settings">
          Settings
        </NuxtLink>

        <v-icon color="primary lighten-1" style="min-width: 40px" @click="changeTheme">
          mdi-theme-light-dark
        </v-icon>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  data: () => {
    return {
      isDark: false,
    }
  },
  methods: {
    changeTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.isDark = this.$vuetify.theme.dark
    }
  }
}
</script>

<style scoped>
.header {
  z-index: 3;
}
</style>
