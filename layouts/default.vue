<template>
  <v-theme-provider root>
    <v-app class="app">
      <Header />

      <v-main class="primary pt-0">
        <v-container fluid>
          <Nuxt />
        </v-container>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>
<script setup>
</script>
