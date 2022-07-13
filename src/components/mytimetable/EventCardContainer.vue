<template>
  <div
    class="day-time-table__event"
    :style="{
      position: 'absolute',
      left: `${12}% `,
      top: `${timeStart - parentTimeStart}px`,
      height: timeEnd - timeStart + 'px',
      width: `${100 - 12}% `,
    }"
  >
    <EventCard :dayEvent="dayEvent" />

    <template v-if="dayEvent.subP.length > 0">
      <EventCardContainer
        v-for="(subevent, index) in dayEvent.subP"
        :key="'dfdsa' + index"
        :dayEvent="subevent"
        :parentStart="dayEvent.timeStart"
      />
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/mytimetable/EventCard.vue";

export default {
  name: "EventCardContainer",
  components: { EventCard },
  props: { dayEvent: {}, parentStart: { type: Date, default: null } },
  computed: {
    timeStart() {
      return (
        ((this.dayEvent.timeStart.getHours() * 60 +
          this.dayEvent.timeStart.getMinutes()) /
          60) *
        200
      );
    },
    timeEnd() {
      return (
        ((this.dayEvent.timeEnd.getHours() * 60 +
          this.dayEvent.timeEnd.getMinutes()) /
          60) *
        200
      );
    },
    parentTimeStart() {
      return this.parentStart
        ? ((this.parentStart.getHours() * 60 + this.parentStart.getMinutes()) /
            60) *
            200
        : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.day-time-table__event {
  content: "";
  position: absolute;
}
</style>
