<template>
  <div class="animated" :class="isDark ? 'dark' : ''" />
</template>

<script>
export default {
  props: {
    isDark: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped lang="scss">
.animated {
  background-image: linear-gradient(120deg, #DEECFF 0%, #C6CFFF 100%);
  border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
  width: 300px;
  height: 300px;
  animation: morph 3s linear infinite;
  transform-style: preserve-3d;
  outline: 1px solid transparent;
  will-change: border-radius;
  z-index: -1;

  &:after,
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    left: 0; top: 0;
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    box-shadow: 5px 5px 89px rgba(0, 102, 255, 0.21);
    will-change: border-radius, transform, opacity;
    animation-delay: 200ms;
    background-image: linear-gradient(120deg, rgba(0,67,255,.55) 0%, rgba(232, 211, 255, 0.89) 100%);
  }

  &.dark {
    background-image: linear-gradient(120deg, #443C68 0%, #393053 100%);

    &:after,
    &:before {
      background-image: linear-gradient(120deg, rgba(0,67,255,.55) 0%, rgba(24, 18, 43, 0.89) 100%);
    }
  }

  &:before {
    animation: morph 3s linear infinite;
    opacity: .21;
    animation-duration: 1.5s;
  }
}

@keyframes morph{
  0%,100%{
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    transform: translate3d(0,0,0) rotateZ(0.01deg);
  }
  34%{
    border-radius: 70% 30% 46% 54% / 30% 29% 71% 70%;
    transform:  translate3d(0,5px,0) rotateZ(0.01deg);
  }
  50%{
    opacity: .89;
    transform: translate3d(0,0,0) rotateZ(0.01deg);
  }
  67%{
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60% ;
    transform: translate3d(0,-3px,0) rotateZ(0.01deg);
  }
}
</style>
