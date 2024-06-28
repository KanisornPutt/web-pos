import axios from "axios";

const state = {
    storeData: JSON.parse(localStorage.getItem("storeData")) || null,
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || null,
};

const mutations = {
    setStore(state, requestStore) {
        console.log("Setting Store");
        console.log(requestStore);
        state.storeData = requestStore;
        localStorage.setItem("storeData", JSON.stringify(requestStore));
    },
  
};

const actions = {

    async createStore({state, commit}, payload ) {
        console.log("Creating store");
        const url = "/api/stores/" + state.user.userId; // Replace with your API endpoint
        const token = state.token; // Replace with your actual Bearer token
        const storeData = payload
        try {
            const response = await axios.post(url, storeData, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json' // If you're sending JSON data
                }
              });
              commit("auth/setStore", response.data, {root: true});
            return true;
            
        } catch (error) {
            console.error('There was an error : ', error);
            return false;
        }
      },

      async joinStore({state, commit}, payload) {
        console.log("Joining store");
        const url = "/api/stores/join/" + state.user.userId; // Replace with your API endpoint
        const token = state.token; // Replace with your actual Bearer token
        const joinRequest = payload
        try {
            const response = await axios.put(url, joinRequest, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json' // If you're sending JSON data
                }
              });
              commit("auth/setStore", response.data, {root: true});
            return true;
            
        } catch (error) {
            console.error('There was an error : ', error);
            return false;
        }
      },


      async leaveStore({state, commit}) {
        console.log("Leaving store");
        const url = "/api/users/removeStore/" + state.user.userId; 
        const token = state.token;
        try {
            const response = await axios.put(url, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                }
              });
              commit("auth/setUser", response.data, {root: true});

            return true;
            
        } catch (error) {
            console.error('There was an error : ', error);
            return false;
        }
      },



};

const getters = {
  
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
