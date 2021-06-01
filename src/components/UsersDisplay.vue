<template>
  <div class="wrapper-users">
    <McvLoading v-if="loading" />
    <McvError v-if="error" />
    <div class="users-item" v-for="(user, idx) in sorted_items" :key="idx">
      <div class="img-cover">
        <img :src="user.photo" width="70" height="70" />
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="35" cy="35" r="35" fill="white" />
          <path
            d="M34.9524 70C15.6305 70.0018 -0.0753237 54.2415 0.000271752 34.9298C0.0776671 15.5786 15.7241 -0.0341429 35.0046 5.60763e-05C54.3588 0.036055 69.944 15.593 69.9998 34.937C70.0574 54.3045 54.3678 70 34.9524 70ZM11.2442 57.5552C24.1494 71.3212 46.1603 71.0656 58.7145 57.5642C58.4499 57.2582 58.198 56.9306 57.9082 56.639C56.6014 55.325 55.0535 54.3369 53.3814 53.5917C51.1964 52.6179 48.9447 51.7917 46.738 50.8666C45.6923 50.4274 44.6466 49.9648 43.6638 49.4032C42.5425 48.7642 41.8153 47.8031 41.7829 46.4315C41.7577 45.3245 41.7217 44.2158 41.6713 43.1088C41.6372 42.3888 41.8333 41.7714 42.2815 41.1936C43.9842 38.9887 44.8716 36.485 44.8878 33.6915C44.8896 33.2523 45.0731 32.9859 45.4043 32.7249C46.1423 32.1399 46.7974 31.4505 46.9954 30.4984C47.2078 29.476 47.359 28.4356 47.4562 27.3935C47.5354 26.5457 47.4436 25.7177 46.3655 25.6295C46.5167 24.3497 46.7164 23.1672 46.7866 21.9792C46.927 19.5529 46.6642 17.1824 45.4421 15.0152C44.3892 13.1487 42.8017 12.1245 40.631 12.0417C40.343 12.0309 40.0479 11.9427 39.7725 11.8473C37.0222 10.9023 34.182 10.6125 31.3508 11.1777C25.8395 12.2757 22.5421 17.0132 23.2045 22.6524C23.3197 23.6262 23.505 24.5909 23.6688 25.6349C22.9129 25.6745 22.4683 26.1101 22.4827 26.8301C22.5223 28.9702 22.5619 31.1337 24.4554 32.6439C24.9288 33.0219 25.0494 33.4971 25.098 34.0551C25.1663 34.856 25.2581 35.6588 25.3859 36.4526C25.6847 38.3173 26.7719 39.8059 27.7474 41.352C27.9886 41.7354 28.1848 42.2178 28.2028 42.6624C28.2514 43.8882 28.2028 45.1175 28.1758 46.3451C28.1488 47.5763 27.5836 48.5266 26.5775 49.2088C26.1077 49.5274 25.6271 49.8496 25.1088 50.0692C23.8704 50.5966 22.6123 51.0826 21.3524 51.5559C18.7425 52.5387 16.1579 53.5719 13.8378 55.1594C12.8659 55.8236 11.9677 56.5634 11.2442 57.5552Z"
            fill="#D0CFCF"
          />
        </svg>
      </div>
      <h3 class="user__name">
        {{ user.name.slice(0, 30) }}
        <span v-if="user.name.length >= 30">...</span>
      </h3>
      <p class="user__position">
        {{ user.position.slice(0, 30) }}
        <span v-if="user.position.length >= 30">...</span>
      </p>
      <CustomTooltip :text="user.email">
        <p class="user__email">{{ user.email.slice(0, 21) }}</p>
        <span v-if="user.email.length >= 21">...</span>
      </CustomTooltip>
      <p class="user__phone">
        {{ user.phone }}
      </p>
    </div>
  </div>

  <button @click.prevent="fetchNewUsers()" v-show="!hideButton">
    <a class="btn">Show more</a>
  </button>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { actionTypes } from "@/store/modules/users";

import McvLoading from "@/components/Loading";
import McvError from "@/components/Error";
import CustomTooltip from "@/components/CustomTooltip";

export default {
  name: "UsersDisplay",
  computed: {
    ...mapState({
      usersList: (state) => state.users.data,
      loading: (state) => state.users.isLoading,
      error: (state) => state.users.error,
    }),
    ...mapGetters(["hideButton", "sorted_items"]),
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch(actionTypes.getUsers);
    },
    fetchNewUsers() {
      this.$store.dispatch(actionTypes.getNewUsers);
    },
  },
  mounted() {
    this.fetchUsers();
  },
  components: {
    McvLoading,
    McvError,
    CustomTooltip,
  },
};
</script>

<style lang="scss" scoped>
.wrapper-users {
  display: grid;
  grid-template-columns: 283px 283px 283px;
  grid-template-rows: auto auto;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
  row-gap: 30px;
  column-gap: 30px;
  margin-bottom: 51px;

  .users-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 282px;
    height: 313px;
    background-color: #fff;
    border-radius: 10px;
    padding: 38px 30px 10px 30px;

    .img-cover {
      position: relative;
      margin-bottom: 7px;
      svg {
        position: absolute;
        left: 0;
      }
      img {
        position: relative;
        border-radius: 50%;
        z-index: 10;
      }
    }

    .user__name {
      word-wrap: break-word;
      width: 100%;
      line-height: initial;
    }
    .user__position {
      line-height: 25px;
    }
    .user__email {
      margin-bottom: 5px;
      word-wrap: break-word;
      width: 100%;
    }
  }
}

/* Wide Screens 2560px  ----------- */
@media only screen and (min-width: 2560px) {
  .wrapper-users {
    grid-template-columns: 360px 360px 360px;
    .users-item {
      width: 360px;
    }
  }
}

/* Tablets (вертикальная и горизонтальная) ----------- */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .wrapper-users {
    grid-template-columns: 344px 344px;
    column-gap: 20px;
    row-gap: 12px;
    .users-item {
      margin-right: 12px;
      width: 344px;
      height: 313px;
      padding: 36px 30px 28px 30px;
      justify-content: initial;

      .img-cover {
        img {
          margin-bottom: 0;
        }
      }

      .user__name {
        margin-bottom: 0;
      }
      .user__position {
        margin-bottom: 4px;
      }
      .user__email {
        margin-bottom: 4px;
      }
    }
  }
}

/* Mobile ----------- */
@media only screen and (min-width: 320px) and (max-width: 767px) {
  .wrapper-users {
    grid-template-columns: 1fr;
    grid-row-gap: 22px;
    .users-item {
      width: 328px;
      height: 313px;
      margin-bottom: 0px;
      .img-cover {
        img {
          margin-bottom: 0px;
        }
      }

      .user__name {
        margin-bottom: 4px;
      }
      .user__position {
        margin-bottom: 4px;
      }
      .user__email {
        margin-bottom: 4px;
      }
    }
  }
}
</style>