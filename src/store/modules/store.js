import axios from "axios";

const state = {
    storeData: JSON.parse(localStorage.getItem("storeData")) || null,
    token: localStorage.getItem("token") || "",
};

const mutations = {
    setStore(state, requestStore) {
        console.log("Setting Store");
        state.storeData = requestStore;
        localStorage.setItem("storeData", JSON.stringify(requestStore));
    },
  
};

const actions = {
    async updateStore({ state, commit }) {
        console.log("updating store...");
        console.log("token : " + state.token);
        console.log(state.user);
        const url = "/api/stores/200"; // Replace with your API endpoint
        const token = state.token; // Replace with your actual Bearer token
    
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            commit("setStore", response.data);
            
        } catch (error) {
            console.error('There was an error: ', error);
            if (error.response.status === 404) {
                console.log("Does not found store");
            } 
        }
      },


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
            commit("setStore", response.data);
            return true;
            
        } catch (error) {
            console.error('There was an error : ', error);
            return false;
        }
      },



};

const getters = {
    isLinkedToStore: (state) => !!state.storeData
  
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
