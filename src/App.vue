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
  mounted() {
    this.$router.push("/mytimetable/day/dates");
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}

#app {
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
}
</style>
