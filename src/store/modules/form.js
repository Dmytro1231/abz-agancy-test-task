import positionsApi from "@/api/form";

const state = {
  positions: null,
  isLoading: false,
  error: null,
  token: ""
};

export const mutationTypes = {
  getPositionStart: "[form] Get position start",
  getPositionSuccess: "[form] Get position success",
  getPositionFailed: "[form] Get position failed",

  getTokenStart: "[form] Get token start",
  getTokenSuccess: "[form] Get token success",
  getTokenFailed: "[form] Get token failed"
};

export const actionTypes = {
  getPositons: "[form] get Positions",
  getToken: "[form] get token"
};

const mutations = {
  [mutationTypes.getPositionStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getPositionSuccess](state, payload) {
    state.isLoading = false;
    state.positions = payload;
  },
  [mutationTypes.getPositionFailed](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  [mutationTypes.getTokenStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getTokenSuccess](state, payload) {
    state.isLoading = false;
    state.token = payload;
  },
  [mutationTypes.getTokenFailed](state, payload) {
    state.isLoading = false;
    state.error = payload;
  }
};

const actions = {
  [actionTypes.getPositons]({ commit }) {
    return new Promise(resolve => {
      commit(mutationTypes.getPositionStart);
      positionsApi
        .getPositions()
        .then(response => {
          commit(mutationTypes.getPositionSuccess, response.data.positions);
          resolve(response.data.positions);
        })
        .catch(e => {
          commit(mutationTypes.getPositionFailed, e);
        });
    });
  },
  [actionTypes.getToken]({ commit }) {
    return new Promise(resolve => {
      commit(mutationTypes.getTokenStart);
      positionsApi
        .getToken()
        .then(response => {
          commit(mutationTypes.getTokenSuccess, response.data.token);
          localStorage.setItem("token", response.data.token);
          resolve(response.data.token);
        })
        .catch(err => {
          commit(mutationTypes.getTokenFailed, err);
          localStorage.removeItem("token");
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
