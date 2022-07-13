<template>
  <div class="card">
    <div class="card__content">
      <div class="card__header">
        <div class="card__header-period">{{ timeLabel }}</div>
        <div class="card__header-title">{{ dayEvent.event.title }}</div>
      </div>

      <div class="card__text">
        {{ dayEvent.event.text }}
      </div>
    </div>

    <div class="card__bottom">
      <div class="card__participants">
        <div class="card__participants-imgs">
          <div
            class="card__participants-img"
            v-for="info in participantsInfo"
            :key="info.id"
          >
            <img
              v-if="info.userImage"
              :src="info.userImage"
              :alt="info.userInitials"
            />
            <div
              v-else
              v-text="info.userInitials"
              class="card__participants-img-replacement"
              :style="{ backgroundColor: hashColor(info.userName) }"
            />
          </div>
          <div
            class="card__participants-rest"
            v-if="restParticipantsCount > 0"
            v-text="`+${restParticipantsCount}`"
          />
        </div>
        <div class="card__user"></div>
      </div>
    </div>

    <div class="level-pin" v-text="dayEvent.event.id" />
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: ["dayEvent"],
  data() {
    return {
      visibleParticipants: [],
      restParticipantsCount: 0,
    };
  },
  mounted() {
    this.calcVisibleParticipants();
    window.addEventListener("resize", this.calcVisibleParticipants);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.calcVisibleParticipants);
  },
  computed: {
    participantsInfo() {
      return this.visibleParticipants
        .map((userId) => {
          const user = this.$store.state.userTimeline.users.find(
            (user) => user.id == userId
          );
          if (!user) return null;

          const userImage = user.avatar || null;

          const userInitials = (user.name || "")
            .split(" ")
            .map((t) => t.substring(0, 1))
            .join("")
            .substring(0, 4)
            .toUpperCase();

          return userImage || !!userInitials
            ? {
                userId,
                userImage,
                userInitials,
                userName: user.name,
              }
            : null;
        })
        .filter((t) => t);
    },
    timeLabel() {
      return `${this.dayEvent.event.timeStart
        .getHours()
        .toString()
        .padStart(2, "0")}:${this.dayEvent.event.timeStart
        .getMinutes()
        .toString()
        .padStart(2, "0")} - ${this.dayEvent.event.timeEnd
        .getHours()
        .toString()
        .padStart(2, "0")}:${this.dayEvent.event.timeEnd
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    },
  },
  methods: {
    hashColor(s) {
      let hash = s.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);

      if (hash < 0) hash = -hash;

      return "#" + hash.toString().substring(0, 6);
    },
    calcVisibleParticipants() {
      const maxParticipants =
        Math.floor(this.$el.getBoundingClientRect().width / 32) - 1;
      this.visibleParticipants = this.dayEvent.event.participants.slice(
        0,
        maxParticipants
      );

      this.restParticipantsCount =
        this.dayEvent.event.participants.length - maxParticipants;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 24px 38px 3px rgb(0 0 0 / 14%),
    0px 9px 46px 8px rgb(0 0 0 / 12%), 0px 11px 15px -7px rgb(0 0 0 / 20%);
  border-radius: 10px;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  position: relative;

  &:hover {
    z-index: 100;
  }
  &__content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__header {
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;

    display: flex;
    gap: 15px;
    flex-wrap: nowrap;

    &-period {
      white-space: nowrap;
      color: #222222;
    }

    &-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__text {
    margin-top: 10px;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #222222;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__bottom {
    min-height: 32px;

    display: flex;
    justify-content: space-between;
  }

  &__participants {
    display: flex;
    flex-wrap: nowrap;

    &-imgs {
      display: flex;
      margin-left: 10px;
      align-items: center;
    }

    &-img {
      margin-left: -10px;
      width: 32px;
      height: 32px;
    }

    &-img-replacement {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: aqua;
      font-weight: 700;
      font-size: 10px;
      line-height: 12px;
    }

    &-rest {
      margin-left: 5px;
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
    }
  }
}

.level-pin {
  position: absolute;
  left: -6px;
  top: -6px;

  border: 1px solid rgb(255, 130, 130);
  background-color: rgb(255, 191, 191);
  border-radius: 20px;
  color: rgba(0, 0, 0, 0.459);
  font-size: 9px;

  padding: 2px 4px;
  display: flex;
  min-width: 18px;
  justify-content: center;
  align-items: center;
}
</style>
