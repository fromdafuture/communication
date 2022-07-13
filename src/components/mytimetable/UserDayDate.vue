<template>
  <div class="day-container" ref="dayContainer">
    <div class="day-header">
      <div class="day-header__date" v-for="day in 7" :key="day">
        {{ getDayString(day - 1) }}
      </div>
    </div>
    <div class="day-background">
      <div
        v-for="index in 96"
        :key="index"
        class="time-line"
        :style="{ top: 10 + (index - 1) * 50 + 'px' }"
      >
        <div class="time-line__time" v-if="(index - 1) % 4 == 0">
          {{ (index - 1) / 4 }}:00
        </div>
        <div class="time-line__line"></div>
      </div>

      <div class="current-time" :style="{ top: 50 + currentTimeOffset + 'px' }">
        <div class="current-time__time">
          <div class="time-line__time-inner">{{ currentTimeStr }}</div>
        </div>
        <div class="current-time__line"></div>
      </div>

      <div class="day-time-table" style="backgroun-color: #44556677">
        <div v-for="day in 7" :key="day" class="day-time-table__date">
          <div class="day-time-table__event-card-container">
            <EventCardContainer
              v-for="dayEvent in computedEvents(day - 1)"
              :key="dayEvent.id"
              :dayEvent="dayEvent"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EventCardContainer from "@/components/mytimetable/EventCardContainer.vue";

export default {
  name: "HomeView",
  components: { EventCardContainer },
  data() {
    return {
      date: Date.now(),
      currentTimeStr: "",
      currentTimeOffset: 0,
      intervalId: "",
    };
  },
  beforeMount() {
    this.setCurrentTime();
  },
  beforeUnmount() {
    this.thisUpdateClear();
  },
  mounted() {
    this.$refs.dayContainer.scrollTo(0, this.currentTimeOffset - 25);

    this.timeUpdateInit();
    this.computedEvents(1);
  },
  computed: {
    ...mapState({
      events: (state) => state.userTimeline.events,
    }),
    firstDate() {
      const date = new Date(this.date);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);

      date.setDate(diff);
      date.setHours(0, 0, 0);
      return date;
    },
  },
  methods: {
    timeUpdateInit() {
      this.intervalId = setInterval(() => {
        this.setCurrentTime();
      }, 1000);
    },
    thisUpdateClear() {
      clearInterval(this.intervalId);
    },
    setCurrentTime() {
      let time = new Date();
      time.setMilliseconds(0);

      const hours = time.getHours();
      const minutes = time.getMinutes().toString().padStart(2, 0);
      const offset =
        time.getHours() * 200 +
        (time.getMinutes() * 200) / 60 +
        (time.getSeconds() * 200) / 3600;

      this.currentTimeOffset = offset;

      this.currentTimeStr = `${hours}:${minutes}`;
    },
    getDayString(dayDiff) {
      const date = new Date(this.firstDate);
      date.setDate(date.getDate() + dayDiff);

      const weekDay = days[date.getDay()];
      const day = date.getDate().toString().padStart(2, "0");
      const month = date.getMonth().toString().padStart(2, "0");
      return `${weekDay} ${day}.${month}`;
    },
    computedEvents(dayDiff) {
      const dateStart = new Date(this.firstDate);
      dateStart.setDate(dateStart.getDate() + dayDiff);
      const dayEnd = new Date(dateStart);
      dayEnd.setHours(23, 59, 59);

      const dayEvents = this.events
        .filter((t) => t.timeStart >= dateStart && t.timeStart <= dayEnd)
        .sort((t, d) => (t.timeStart < d.timeStart ? -1 : 1));

      const includeInPeriod = (dayEvent, periods) => {
        if (
          !periods.some((timeZone) => {
            if (
              (dayEvent.timeStart >= timeZone.timeStart &&
                dayEvent.timeStart <= timeZone.timeEnd) ||
              (dayEvent.timeEnd >= timeZone.timeStart &&
                dayEvent.timeEnd <= timeZone.timeEnd) ||
              (dayEvent.timeStart <= timeZone.timeStart &&
                dayEvent.timeEnd >= timeZone.timeEnd)
            ) {
              includeInPeriod(dayEvent, timeZone.subP);
              return true;
            }
          })
        ) {
          periods.push({
            timeStart: dayEvent.timeStart,
            timeEnd: dayEvent.timeEnd,
            event: dayEvent,
            width: 100,
            subP: [],
          });
        }
        return true;
      };

      const periods = [];

      dayEvents.forEach((event) => includeInPeriod(event, periods, 0));

      return periods;
    },
  },
};

const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
</script>

<style lang="scss" scoped>
.day-container {
  width: 100%;
  min-width: 1024px;
  height: 100%;
  border: 1px solid red;
  background-color: #f5f5f5;
  position: relative;
  overflow: auto;
  scroll-behavior: smooth;
}

.day-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 35px;
  z-index: 10;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;

  &__date {
    width: 100%;

    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    text-align: center;

    color: #aeaeae;
  }
}

.day-background {
  position: absolute;
  top: 35px;
  left: 0;
  width: 100%;
  height: 1000px;
}

.time-line {
  width: 100%;
  position: absolute;

  &__time {
    position: absolute;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #aeaeae;

    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-50%);
  }

  &__line {
    color: #aeaeae;
    border-top: 1px dashed;
    margin-left: 50px;
  }
}

.current-time {
  position: absolute;
  width: 100%;

  &__time {
    position: absolute;

    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-50%);

    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
  }

  &__line {
    color: #eb5757;
    border-top: 1px solid;
    margin-left: 50px;
  }
}

.time-line__time-inner {
  width: 35px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #eb5757;
  border-radius: 50px;
}

.day-time-table {
  content: "";
  position: absolute;

  width: 100%;

  top: 10px;
  left: 0;

  background-color: #eb57573d;

  display: flex;

  padding-left: 50px;
  padding-right: 50px;

  &__date {
    width: 250px;
    color: #aeaeae;
    position: relative;
  }

  &__event-card-container {
    position: absolute;
    left: -12%;
    width: 110%;
  }
}
</style>
