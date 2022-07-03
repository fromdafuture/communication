<template>
  <div class="header">
    <div class="logo">
      <div class="logo__image"><img src="@/assets/logo.svg" alt="К" /></div>
      <div class="logo__text">Коммуникации</div>
    </div>

    <div class="nav-and-user">
      <nav class="navigation">
        <router-link to="/mytimetable/day/dates"
          ><div class="navigation__link">Мои события</div></router-link
        >
        <router-link to="/1"
          ><div class="navigation__link">Настроить расписание</div></router-link
        >
        <router-link to="/2"
          ><div class="navigation__link">Группы</div></router-link
        >
        <router-link to="/3"
          ><div class="navigation__link">Интергации</div></router-link
        >
        <router-link to="/4"
          ><div class="navigation__link">Архив</div></router-link
        >
      </nav>

      <div class="account account-margin">
        <div class="user__name">Константин А.</div>
        <div class="user__photo">
          <img
            class="user__photo-img"
            src="@/assets/user-photos/user001.png"
            alt="К"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  border-bottom: 1px solid #eeeeee;
}

.logo {
  width: 212px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__image {
    height: 24px;
  }

  &__text {
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;
  }
}

.nav-and-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  gap: 69px;
}

nav {
  display: flex;
  gap: 30px;
  height: 100%;

  a {
    text-decoration: none;
    color: #222222;

    font-weight: 500;
    font-size: 14px;

    display: flex;
    align-items: center;
    position: relative;
    &.router-link-exact-active {
      font-weight: 600;
    }

    &:hover:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: calc(50% - 16px);
      width: 32px;
      height: 2px;

      background: linear-gradient(94.4deg, #6a3093 0%, #a044ff 100%);
      border-radius: 1px 1px 0px 0px;
    }
  }
}

.account {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
