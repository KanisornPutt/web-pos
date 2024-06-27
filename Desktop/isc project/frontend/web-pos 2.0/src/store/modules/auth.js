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
};

const mutations = {
  custom_state(state, text) {
    state.status = text;
  },
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

      const response = await axios.post(
        `/api/v1/auth/getChallenge?email=${user.email}`
      );
      const challenge = response.data;

      console.log("this is challange", challenge);

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: Uint8Array.from(atob(challenge), (c) => c.charCodeAt(0)),
          rpId: "localhost", // Replace with your specific localhost domain/port
          userVerification: "required", // Ensure user verification is required
        },
      });

      let clientDataJSON = credential.response.clientDataJSON;

      let clientData;
      try {
        let clientDataText = new TextDecoder().decode(clientDataJSON);
        clientData = JSON.parse(clientDataText);
        console.log("clientDataJSON:", clientData);
      } catch (error) {
        console.error("Error parsing clientDataJSON:", error);
      }

      console.log("this is login credential", credential);
      const payload = {
        password: user.password,
        challenge: clientData.challenge,
        fidoId: credential.id,
        email: user.email,
      };
      //
      let tokenresponse;
      if (user.oauthMethod) {
        tokenresponse = await axios.post(
          "/api/v1/auth/authenticateOauthFido",
          payload
        );
      } else {
        tokenresponse = await axios.post("/api/v1/auth/authenticate", payload);
      }
      const token = tokenresponse.data.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userDetails = await axios.get("/api/users/" + user.email, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userDto = userDetails.data;
      console.log("token from login", token);

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
      const alreadyRegisterd = response.data.alreadyRegistered;
      if (!alreadyRegisterd) {
        await dispatch("registerfido", user);
      } else {
        await dispatch("login", user);
      }
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

  async registerfido({ commit }, user) {
    try {
      if (user == null) {
        console.log("fido fail to register");
        return;
      }
      console.log(user.email);
      const response = await axios.post(
        `/api/v1/auth/getChallenge?email=${user.email}`
      );
      const challenge = response.data;

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: Uint8Array.from(atob(challenge), (c) => c.charCodeAt(0)),
          rp: {
            id: "localhost", // Replace with your specific localhost domain/port
            name: "Local Example App",
          },
          user: {
            id: new Uint8Array(16), // Replace with actual random user ID (required by WebAuthn spec)
            name: user.email, // Replace with the user's email or identifier
            displayName: user.show_name, // Replace with the user's display name
          },
          pubKeyCredParams: [{ type: "public-key", alg: -7 }], // Example, use appropriate algorithms
          authenticatorSelection: {
            authenticatorAttachment: "cross-platform",
            requireResidentKey: true,
          },
          timeout: 60000, // Optional timeout value in milliseconds
          attestation: "direct", // Optional attestation preference
        },
      });

      console.log("sign in WebAuthn credential created:", credential);

      let clientDataJSON = credential.response.clientDataJSON;

      let clientData;
      try {
        let clientDataText = new TextDecoder().decode(clientDataJSON);
        clientData = JSON.parse(clientDataText);
        console.log("clientDataJSON:", clientData);
      } catch (error) {
        console.error("Error parsing clientDataJSON:", error);
      }

      const payload = {
        challenge: clientData.challenge,
        fidoId: credential.id,
        email: user.email,
      };

      const tokenresponse = await axios.post(
        "/api/v1/auth/registerWithFido",
        payload
      );
      const token = tokenresponse.data.token;

      console.log("sign up token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userDetails = await axios.get("/api/users/" + user.email, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userDto = userDetails.data;

      commit("auth_success", { token, user: userDto });
    } catch (error) {
      console.error("Failed to register with WebAuthn:", error);
    }
  },

  async updateUser({ state, commit }) {
    const url = "/api/users/" + state.user.email; // Replace with your API endpoint
    const token = state.token; // Replace with your actual Bearer token

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("setUser", response.data);
    } catch (error) {
      console.error("There was an error!", error);
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
  email: (state) => state.user.email,
  storeId: (state) => state.user.storeId,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
