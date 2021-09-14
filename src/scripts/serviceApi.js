import { configApi } from "./configApi.js";

export const getUserData = () => {
  return fetch(configApi.baseUrl + configApi.endPoint.listUsers).then((data) =>
    data.json()
  );
};
