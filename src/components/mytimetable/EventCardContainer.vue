<template>
  <div
    class="day-time-table__event"
    :style="{
      position: 'absolute',
      left: `${dayEvent.left}px`,
      left: `${10}% `,
      top: `${dayEvent.timeStart * 50 - parentStart}px`,
      height: (dayEvent.timeEnd - dayEvent.timeStart) * 50 + 'px',
      width: `${100 - 10}% `,
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
  props: { dayEvent: {}, parentStart: { type: Number, default: 0 } },
};
</script>

<style lang="scss" scoped>
.day-time-table__event {
  content: "";
  position: absolute;
  background-color: #129f0243;
}
</style>
