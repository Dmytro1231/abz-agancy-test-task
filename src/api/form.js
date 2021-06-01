import axios from "axios";

const getPositions = () => {
  return axios.get(
    "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
  );
};

const getToken = () => {
  return axios.get(
    "https://frontend-test-assignment-api.abz.agency/api/v1/token"
  );
};

export default {
  getPositions,
  getToken
};
