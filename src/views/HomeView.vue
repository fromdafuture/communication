<template>
  <div class="home">
    <CalendarHeader />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CalendarHeader from "@/components/Headers/CalendarHeader.vue";

export default {
  name: "HomeView",
  components: {
    CalendarHeader,
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
}
</style>
