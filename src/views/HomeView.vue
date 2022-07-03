<template>
  <div class="home">
    <CalendarHeader />
    <img alt="Vue logo" src="../assets/logo.png" />
    <router-view></router-view>
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
