<template>
  <div class="calendar-header">
    <div class="calendar-modules">
      <router-link
        :to="`/mytimetable/${pathSplited[2]}/${pathSplited[3]}`"
        :class="{ highlighted: pathSplited[1] == 'mytimetable' }"
        v-text="'Моё расписание'"
      />

      <router-link
        :to="`/tobeagreed/${pathSplited[2]}/${pathSplited[3]}`"
        :class="{ highlighted: pathSplited[1] == 'tobeagreed' }"
        v-text="'На согласовании'"
      />
    </div>

    <div class="date-selection">
      <div class="custom-date">
        <div class="custom-date__text">28 февраля - 6 марта</div>
        <div class="custom-date__button">Д</div>
      </div>

      <div class="period-selection date-selection__period-selection">
        <router-link
          :to="`/${pathSplited[1]}/day/${pathSplited[3]}`"
          class="period__day"
          :class="{ highlighted: pathSplited[2] == 'day' }"
          v-text="'День'"
        />
        <router-link
          :to="`/${pathSplited[1]}/week/${pathSplited[3]}`"
          class="period__week"
          :class="{ highlighted: pathSplited[2] == 'week' }"
          v-text="'Неделя'"
        />
        <router-link
          :to="`/${pathSplited[1]}/month/${pathSplited[3]}`"
          class="period__month"
          :class="{ highlighted: pathSplited[2] == 'month' }"
          v-text="'Месяц'"
        />
      </div>

      <div class="view-selection date-selection__view-selection">
        <router-link
          :to="`/${pathSplited[1]}/${pathSplited[2]}/rows`"
          class="view-selection__rows"
          :class="{ highlighted: pathSplited[3] == 'rows' }"
          v-text="'R'"
        />
        <router-link
          :to="`/${pathSplited[1]}/${pathSplited[2]}/dates`"
          class="view-selection__dates"
          :class="{ highlighted: pathSplited[3] == 'dates' }"
          v-text="'M'"
        />
      </div>

      <div class="create-meeting date-selection__create-meeting">Создать</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarHeader",
  components: {},
  mounted() {},
  computed: {
    pathSplited() {
      return this.$router.currentRoute.value.path.split("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-header {
  height: 78px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  border-bottom: 1px solid #eeeeee;
}

.calendar-modules {
  display: flex;
  gap: 30px;

  a {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #8e8e8e;

    text-decoration: none;
  }

  .highlighted {
    font-weight: 700;
    color: #222222;
  }
}

.date-selection {
  display: flex;
  align-items: center;
}

.custom-date {
  display: flex;
  width: 220px;
  justify-content: space-between;
}

.period-selection {
  display: flex;
  align-items: center;

  background: #f5f5f5;
  border-radius: 100px;
  height: 34px;

  a {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #aeaeae;
    text-decoration: none;
    height: 100%;

    padding-left: 17px;
    padding-right: 17px;

    display: flex;
    align-items: center;
  }

  .period__week {
    padding-left: 11px;
    padding-right: 12px;
  }

  .highlighted {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;

    display: flex;
    align-items: center;

    color: #ffffff;

    border-radius: 100px;
    background: linear-gradient(94.4deg, #6a3093 0%, #a044ff 100%);
  }
}

.view-selection {
  display: flex;
}

.date-selection {
  &__period-selection {
    margin-left: 20px;
  }

  &__view-selection {
    margin-left: 10px;
  }

  &__create-meeting {
    margin-left: 10px;
  }

  .custom-date {
    flex: 1 0 220px;
    max-width: 220px;
    align-items: center;
    padding-bottom: 8px;
    padding-top: 8px;
    border-bottom: 1px solid #eeeeee;

    &__text {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #222222;
    }
  }

  .view-selection {
    display: flex;
    align-items: center;

    background: #f5f5f5;
    border-radius: 100px;
    height: 34px;

    a {
      height: 32px;
      width: 32px;
      font-weight: 500;
      font-size: 14px;
      color: #aeaeae;
      text-decoration: none;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .highlighted {
      font-weight: 600;

      color: #ffffff;
      border-radius: 100px;
      background: linear-gradient(94.4deg, #6a3093 0%, #a044ff 100%);
    }
  }
}
</style>
