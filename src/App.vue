<template>
  <MainHeader />
  <router-view />
</template>

<script>
import MainHeader from "@/components/Headers/MainHeader.vue";

export default {
  name: "HomeView",
  components: {
    MainHeader,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Montserrat", sans-serif;
}
</style>
