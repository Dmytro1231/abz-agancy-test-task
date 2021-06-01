import axios from "@/api/axios";

const getUsers = apiUrl => {
  return axios.get(apiUrl);
};


export default {
  getUsers
};
