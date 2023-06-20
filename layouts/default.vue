<template>
  <v-theme-provider root>
    <v-app class="app">
      <Header ref="header" />

      <v-main class="primary pt-0 main">
        <v-container fluid class="main-container">
          <Nuxt />
        </v-container>

        <Footer ref="footer" />
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<style scoped lang="scss">
.main {
  position: relative;

  &-container {
    z-index: 2;
    position: relative;
    padding-bottom: 20vh
  }
}
</style>
