import axios from "axios";

const state = {
  token: localStorage.getItem("token") || "",
  status: "",
  show_name: localStorage.getItem("show_name") || "",
  // user: JSON.parse(localStorage.getItem("user")) || null,
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, payload) {
    state.status = "";
    state.token = payload.token;
    state.show_name = payload.show_name;
    localStorage.setItem("token", payload.token);
    localStorage.setItem("showName", payload.show_name);
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.show_name = "";
    localStorage.removeItem("token");
    localStorage.removeItem("showName");
  },
  // setUser(state, user) {
  //   console.log("calling set user");
  //     state.user = user;
  //     localStorage.setItem("user", JSON.stringify(user));
  //   },
  //   clearUser(state) {
  //     state.user = null;
  //     localStorage.removeItem("user");
  //     console.log("cleared user");
  //   },
};

const actions = {
  async register({ commit }, user) {
    try {
      commit("auth_request");
      const response = await axios.post("/api/v1/auth/register", user);
      const token = response.data.token;
      // Handle the token and other data as needed

      return response;
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
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
      const showName = userDetails.data.show_name;
      commit("auth_success", { token, show_name: "showName" });
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
      const showName = userDetails.data.show_name;
      commit("auth_success", { token, show_name: showName });
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
  async logout({ commit }) {
    commit("logout");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  },
  // async signup(context, { username, email, password }) {
  //     try {
  //       const res = await axios.post("http://localhost:3000/users", {
  //         username: username,
  //         email: email,
  //         password: password,
  //         items: [],
  //       });
  //       console.log(res);
  //       if (res.status === 201) {
  //         alert("Signed up successfully");
  //         context.commit("setUser", res.data);
  //         console.log(username);
  //       }
  //     } catch (error) {
  //       console.error("An error occurred while signing up:", error);
  //       throw error;
  //     }
  //   },

  // async login(context, { email, password }) {
  //   console.log("Calling auth/login...");
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:3000/users?email=${email}`
  //     );
  //     if (res.status === 200 && res.data.length > 0) {
  //       if (password === res.data[0].password)
  //         context.commit("setUser", res.data[0]);
  //       else throw new Error("Incorrect email or password");

  //     } else {
  //       throw new Error("Incorrect email or password");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while logging in:", error);
  //     throw error;
  //   }
  // },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
  showName: (state) => state.showName,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
