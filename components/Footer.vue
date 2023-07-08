<template>
  <div ref="footer" class="footer" :class="$vuetify.theme.dark ? 'footer--dark': ''" />
</template>

<style lang="scss" scoped>
.footer {
  z-index: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-size: cover;
  background-position: bottom;
  background-image: url(/background/light/footer/1.svg);
  animation: bgImageLight 12s linear infinite;
  will-change: background-image;

  &--dark {
    animation-name: bgImageDark;
  }
}

@keyframes bgImageLight {
  0%,100% { background-image: url(/background/light/footer/1.svg) }
  20% { background-image: url(/background/light/footer/2.svg) }
  40% { background-image: url(/background/light/footer/3.svg) }
  60% { background-image: url(/background/light/footer/4.svg) }
  80% { background-image: url(/background/light/footer/5.svg) }
}

@keyframes bgImageDark {
  0%,100% { background-image: url(/background/dark/footer/1.svg) }
  20% { background-image: url(/background/dark/footer/2.svg) }
  40% { background-image: url(/background/dark/footer/3.svg) }
  60% {  background-image: url(/background/dark/footer/4.svg) }
  80% { background-image: url(/background/dark/footer/5.svg) }
}
</style>
