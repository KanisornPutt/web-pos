import axios from "axios";

const state = {
  token: localStorage.getItem("token") || "",
  status: "",
  user: JSON.parse(localStorage.getItem("user")) || "",
  clientId: "38181892421-dcmv3r9nvnkbalt85nskg16qtlc8e7n5.apps.googleusercontent.com",
  redirectUri: "http://localhost:8020/redirect",
  responseType: "code",
  scope:  "email profile", // adjust scopes as needed
  state:"YOUR_STATE", // a random string to prevent CSRF attacks
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


  async login({ commit }, user) {
    try {
      commit("auth_request");
      const response = await axios.post("/api/v1/auth/authenticate", user);
      const token = response.data.token;
      console.log(response);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("/api/users/" + user.email);
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


  async oauth({ commit }, user) {
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
      console.log("UserDto : " ,userDto);
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


  async updateUser({ state, commit }) {
    const url = "/api/users/" + state.user.email; // Replace with your API endpoint
    const token = state.token; // Replace with your actual Bearer token

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        commit("setUser", response.data);
        
    } catch (error) {
        console.error('There was an error!', error);
        throw error;
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
