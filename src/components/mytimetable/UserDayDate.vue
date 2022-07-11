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
          <template v-if="day == 2">
            <EventCardContainer
              v-for="event in computedEvents(day)"
              :key="event.id"
              :dayEvent="event"
            />
          </template>
        </div>
      </div>

      <div class="day-time-table">
        <div class="day-time-table__date" v-if="events.length > 0">
          <div
            v-for="(event, index) in events.filter((t) => t.day == 2)"
            :key="event.id"
            class="day-time-table__event"
            :style="{
              top: `${event.timeStart * 50}px`,
              left: index * 5 + 'px',
              height: (event.timeEnd - event.timeStart) * 50 + 'px',
              border: '1px dashed green',
            }"
          >
            {{ event.id }}
          </div>
        </div>
        <!-- <div class="day-time-table__date" v-if="events.length > 0">
          <div
            v-for="event in computedEvents(1)"
            :key="event.id"
            class="day-time-table__event"
            :style="{
              position: 'absolute',
              transform: `translate( ${event.left}px, 
              ${event.timeStart * 50}px)`,
              height: (event.timeEnd - event.timeStart) * 50 + 'px',
              width: '100%',
            }"
          >
            {{ event.ev.id }}
            <template v-if="event.subP.length > 0">
              <div
                v-for="(subevent, index) in event.subP"
                :key="'dfdsa' + index"
                class="day-time-table__event"
                :style="{
                  position: 'absolute',
                  top: `${(subevent.timeStart - event.timeStart) * 50}px`,
                  left: '10%',
                  width: `${100 - 10}% `,
                  height: (subevent.timeEnd - subevent.timeStart) * 50 + 'px',
                }"
              >
                {{ subevent.ev.id }}

                <div
                  v-for="(subsubevent, index1) in subevent.subP"
                  :key="'dfdsghgha' + index1"
                  class="day-time-table__event"
                  :style="{
                    position: 'absolute',
                    top: `${
                      (subsubevent.timeStart -
                        event.timeStart -
                        subevent.timeStart) *
                      50
                    }px`,
                    left: '10%',
                    width: `${100 - 10}% `,
                    height:
                      (subsubevent.timeEnd - subsubevent.timeStart) * 50 + 'px',
                  }"
                >
                  {{ subsubevent.ev.id }}
                </div>
              </div>
            </template>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
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
      events: [],
    };
  },
  beforeMount() {
    this.setCurrentTime();
  },
  beforeUnmount() {
    this.thisUpdateClear();
  },
  mounted() {
    //this.$refs.dayContainer.scrollTo(0, this.currentTimeOffset - 25);
    this.events = customEvents;

    //this.timeUpdateInit();
    this.computedEvents(1);
  },
  computed: {
    firstDate() {
      const date = new Date(this.date);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);

      const newd = new Date(date.setDate(diff));

      return newd;
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
      const time = new Date(new Date(Date.now()).setMilliseconds(0));

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
      const day = date.getDate().toString().padStart(2, 0);
      const month = date.getMonth().toString().padStart(2, 0);
      return `${weekDay} ${day}.${month}`;
    },
    computedEvents(day) {
      const dayEvents = this.events.filter((t) => t.day == day);

      // const includeInPeriod = (pp, dayEvent) => {
      //   debugger;
      //   if (
      //     !pp.some((timeZone) => {
      //       debugger;
      //       if (
      //         (dayEvent.timeStart >= timeZone.timeStart &&
      //           dayEvent.timeStart <= timeZone.timeEnd) ||
      //         (dayEvent.timeEnd >= timeZone.timeStart &&
      //           dayEvent.timeEnd <= timeZone.timeEnd) ||
      //         (dayEvent.timeStart <= timeZone.timeStart &&
      //           dayEvent.timeEnd >= timeZone.timeEnd)
      //       ) {
      //         return includeInPeriod(timeZone.subP, dayEvent);
      //       } else {
      //         pp.push({
      //           timeStart: dayEvent.timeStart,
      //           timeEnd: dayEvent.timeEnd,
      //           ev: dayEvent,
      //           width: 100,
      //           subP: [],
      //         });
      //         return true;
      //       }
      //     })
      //   ) {
      //     pp.push({
      //       timeStart: dayEvent.timeStart,
      //       timeEnd: dayEvent.timeEnd,
      //       ev: dayEvent,
      //       width: 100,
      //       subP: [],
      //     });
      //   }
      // };

      const includeInPeriod = (dayEvent, periods, level) => {
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
              includeInPeriod(dayEvent, timeZone.subP, level + 1);
              return true;
            }
          })
        ) {
          periods.push({
            timeStart: dayEvent.timeStart,
            timeEnd: dayEvent.timeEnd,
            ev: dayEvent,
            width: 100,
            left: level * 10,
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

const customEvents = [
  { timeStart: 0, timeEnd: 1, day: 1, id: 1, text: "1234567 890" },
  { timeStart: 0.9, timeEnd: 6, day: 1, id: 2, text: "1234567 890" },
  { timeStart: 0.8, timeEnd: 6, day: 1, id: 2222, text: "1234567 890" },
  { timeStart: 3, timeEnd: 4, day: 1, id: 3, text: "1234567 890" },
  { timeStart: 5, timeEnd: 6, day: 1, id: 4, text: "1234567 890" },
  { timeStart: 8, timeEnd: 9, day: 1, id: 5, text: "1234567 890" },
  { timeStart: 0, timeEnd: 1, day: 2, id: 10, text: "1234567 890" },
  { timeStart: 0.9, timeEnd: 6, day: 2, id: 20, text: "1234567 890" },
  { timeStart: 0.8, timeEnd: 6, day: 2, id: 22220, text: "1234567 890" },
  { timeStart: 3, timeEnd: 4, day: 2, id: 30, text: "1234567 890" },
  { timeStart: 5, timeEnd: 6, day: 2, id: 40, text: "1234567 890" },
  { timeStart: 8, timeEnd: 9, day: 2, id: 50, text: "1234567 890" },
];

const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
</script>

<style lang="scss" scoped>
.day-container {
  width: 100%;
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

  border: 1px solid blue;
  background-color: #eb57573d;

  display: flex;

  padding-left: 50px;
  padding-right: 50px;

  &__date {
    width: 250px;
    color: #aeaeae;
    border: 1px dashed grey;
    position: relative;
  }

  &__event {
    content: "";
    position: absolute;
    background-color: #aabbcc77;

    float: left;
  }
}
</style>
