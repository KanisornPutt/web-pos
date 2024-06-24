import axios from "axios";

const state = {
    user: JSON.parse(localStorage.getItem("user")) || null,
  };
  
  const mutations = {
    setUser(state, user) {
      console.log("calling set user");
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      },
      clearUser(state) {
        state.user = null;
        localStorage.removeItem("user");
        console.log("cleared user");
      },
  };
  
  const actions = {
    async signup(context, { username, email, password }) {
        try {
          const res = await axios.post("http://localhost:3000/users", {
            username: username,
            email: email,
            password: password,
            items: [],
          });
          console.log(res);
          if (res.status === 201) {
            alert("Signed up successfully");
            context.commit("setUser", res.data);
            console.log(username);
          }
        } catch (error) {
          console.error("An error occurred while signing up:", error);
          throw error;
        }
      },
  
      async login(context, { email, password }) {
        console.log("Calling auth/login...");
        try {
          const res = await axios.get(
            `http://localhost:3000/users?email=${email}`
          );
          if (res.status === 200 && res.data.length > 0) {
            if (password === res.data[0].password)
              context.commit("setUser", res.data[0]);
            else throw new Error("Incorrect email or password");
  
          } else {
            throw new Error("Incorrect email or password");
          }
        } catch (error) {
          console.error("An error occurred while logging in:", error);
          throw error;
        }
      },
  };
  
  const getters = {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  