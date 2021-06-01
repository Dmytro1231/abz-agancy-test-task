import usersApi from "@/api/users";
import axios from "axios";

const state = {
  data: null,
  link: "",
  isLoading: false,
  error: null,
  noLink: false,
  sort_by: "registration_timestamp",
  sort_ascending: true
};

const getters = {
  hideButton: state => {
    if (state.link === null) {
      state.noLink = !state.noLink;
    }
    return state.noLink;
  },
  sorted_items(state) {
    if (state.data) {
      const items = [...state.data].sort((a, b) => {
        if (a[state.sort_by] > b[state.sort_by]) {
          return 1;
        }
        if (a[state.sort_by] < b[state.sort_by]) {
          return -1;
        }
        return 0;
      });

      if (!state.sort_ascending) {
        items.reverse();
      }

      return items;
    } else return state.data;
  }
};

export const mutationTypes = {
  getUsersStart: "[users] Get Users Start",
  getUsersSuccess: "[users] Get Users Success",
  getUsersFailure: "[users] Get Users Failure",

  getLinkStart: "[users] Get link Start",
  getLinkSuccess: "[users] Get link Success",
  getLinkFailed: "[users] Get link Failure",

  getNewUsersStart: "[users] Get new Users Start",
  getNewUsersSuccess: "[users] Get new Users Success",
  getNewUsersFailed: "[users] Get new Users Failure"
};

export const actionTypes = {
  getUsers: "[users] Get Users",
  getLink: "[users] Get link for new users",
  getNewUsers: "[users] Get new Users"
};

const mutations = {
  [mutationTypes.getUsersStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getUsersSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getUsersFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  [mutationTypes.getLinkStart]() {},
  [mutationTypes.getLinkSuccess](state, payload) {
    state.link = payload;
  },
  [mutationTypes.getLinkFailed](state, payload) {
    state.error = payload;
    state.link = null;
  },

  [mutationTypes.getNewUsersStart]() {},
  [mutationTypes.getNewUsersSuccess](state, payload) {
    state.data.push(...payload);
  },
  [mutationTypes.getNewUsersFailed]() {}
};

const actions = {
  [actionTypes.getUsers]({ commit }) {
    return new Promise(resolve => {
      commit(mutationTypes.getLinkStart);
      commit(mutationTypes.getUsersStart);
      usersApi
        .getUsers()
        .then(response => {
          commit(mutationTypes.getLinkSuccess, response.data.links.next_url);
          commit(mutationTypes.getUsersSuccess, response.data.users);
          resolve(response.data.users);
        })
        .catch(e => {
          commit(mutationTypes.getLinkFailed, e);
          commit(mutationTypes.getUsersFailure, e);
        });
    });
  },
  [actionTypes.getNewUsers]({ commit, state }) {
    return new Promise(resolve => {
      commit(mutationTypes.getNewUsersStart);
      axios
        .get(state.link)
        .then(response => {
          commit(mutationTypes.getLinkSuccess, response.data.links.next_url);
          commit(mutationTypes.getNewUsersSuccess, response.data.users);
          resolve(response.data.users);
        })
        .catch(() => {
          commit(mutationTypes.getNewUsersFailed);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
