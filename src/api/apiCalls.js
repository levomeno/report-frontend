import axios from "axios";

let apiEndpoint;
if (process.env.NODE_ENV === "production") {
  apiEndpoint = process.env.REACT_APP_DEPLOYED_API_URL; // Use deployed endpoint in production
} else {
  apiEndpoint = process.env.REACT_APP_LOCAL_API_URL; // Use local endpoint in development
}

export const login = (user) => {
  return axios.post(`${apiEndpoint}/api/login`, user);
};

export const listTransactions = (filter, token) => {
  const page = filter.page;
  console.log(filter);
  let url = `${apiEndpoint}/api/transaction/list`;
  if (page > 0) {
    url = url + `?page=${page}`;
  }
  console.log(url);
  return axios.post(url, filter, {
    headers: {
      API_KEY: token,
    },
  });
};

export const getTransaction = (transactionId, token) => {
  let url = `${apiEndpoint}/api/transaction`;
  return axios.post(
    url,
    { transactionId },
    {
      headers: {
        API_KEY: token,
      },
    }
  );
};

export const getClient = (transactionId, token) => {
  let url = `${apiEndpoint}/api/client`;
  return axios.post(
    url,
    { transactionId },
    {
      headers: {
        API_KEY: token,
      },
    }
  );
};
