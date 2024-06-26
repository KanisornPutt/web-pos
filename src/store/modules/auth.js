import axios from "axios";

const state = {
  token: localStorage.getItem("token") || null,
  status: "",
  user: JSON.parse(localStorage.getItem("user")) || null,
  clientId:
    "38181892421-dcmv3r9nvnkbalt85nskg16qtlc8e7n5.apps.googleusercontent.com",
  redirectUri: "http://localhost:8020/redirect",
  responseType: "code",
  scope: "email profile", // adjust scopes as needed
  state: "YOUR_STATE", // a random string to prevent CSRF attacks
  storeData: JSON.parse(localStorage.getItem("storeData")) || null,
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, payload) {
    state.status = "";
    state.token = payload.token;
    state.user = payload.user;
    localStorage.setItem("token", payload.token);
    localStorage.setItem("user", JSON.stringify(payload.user));
  },

  setUser(state, requestUser) {
    state.user = requestUser;
    localStorage.setItem("user", JSON.stringify(requestUser));
    if (!requestUser.storeId) {
      localStorage.removeItem("storeData");
    }
  },

  setStore(state, requestStore) {
    console.log("Setting Store");
    state.storeData = requestStore;
    localStorage.setItem("storeData", JSON.stringify(requestStore));
  },

  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("storeData");
  },
  loginWithOAuth() {
    console.log("oauth");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${state.clientId}&redirect_uri=${state.redirectUri}&response_type=${state.responseType}&scope=${state.scope}&state=${state.state}`;
    window.location.href = authUrl;
  },
};

const actions = {
  async register({ commit }, user) {
    try {
      commit("auth_request");
      const response = await axios.post("/api/v1/auth/register", user);
      const token = response.data.token;
      return response;
    } catch (error) {
      console.log(error);
      if (error.response.status !== 200) {
        commit("auth_error");
        throw new Error("This email is already registered.");
      } else {
        commit("auth_error");
        throw error;
      }
    }
  },

  async login({ commit, dispatch }, user) {
    try {
      commit("auth_request");
      const response = await axios.post("/api/v1/auth/authenticate", user);
      const token = response.data.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userDetails = await axios.get("/api/users/" + user.email, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userDto = userDetails.data;
      commit("auth_success", { token, user: userDto });
      return response;
    } catch (error) {
      commit("auth_error");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      throw error;
    }
  },

  async oauth({ commit, dispatch }, user) {
    try {
      commit("auth_request");
      const response = await axios.post("/api/v1/auth/oauth", user);
      const token = response.data.token;
      const userDetails = await axios.get("/api/users/" + user.email, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userDto = userDetails.data;
      console.log("UserDto : ", userDto);
      commit("auth_success", { token, user: userDto });

      return response;
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        commit("auth_error");
        throw new Error("oauth denied");
      } else {
        commit("auth_error");
        throw error;
      }
    }
  },

  async getUser({ state, commit }) {
    const url = "/api/users/" + state.user.email; // Replace with your API endpoint
    const token = state.token; // Replace with your actual Bearer token

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userDto = response.data;
      commit("setUser", userDto);

      if (userDto.storeId) {
        const getStoreUrl = "/api/stores/" + state.user.storeId;

        try {
          const response = await axios.get(getStoreUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          commit("setStore", response.data);
        } catch (error) {
          console.error("There was an error: ", error);
          if (error.response.status === 404) {
            console.log("Does not found store");
          }
        }
      } else {
        localStorage.removeItem("storeData");
      }
    } catch (error) {
      console.error("There was an error!", error);
      throw error;
    }
  },

  async updateUser({ commit }, payload) {
    console.log("updating user");
    const url = "api/users/" + state.user.userId; // Replace with your API endpoint
    const token = state.token; // Replace with your actual Bearer token
    const userChangeRequest = payload;
    try {
      const response = await axios.put(url, userChangeRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // If you're sending JSON data
        },
      });
      const userDto = response.data;
      commit("setUser", userDto);
      return true;
    } catch (error) {
      console.error("There was an error : ", error);
      return false;
    }
  },

  async logout({ commit }) {
    commit("logout");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
  showName: (state) => state.user.showName,
  user: (state) => state.user,
  storeId: (state) => state.user.storeId,
  storeData: (state) => state.storeData,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
