import { createStore } from "vuex";

import users from "@/store/modules/users";
import form from "@/store/modules/form";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    form
  }
});
