import axios from "axios";

const state = {
    storeData: JSON.parse(localStorage.getItem("storeData")) || null,
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || null,
};

const mutations = {

  
};

const actions = {

    async getProducts({state}) {
        console.log("fetching products");
        const url = `api/products/${state.user.storeId}/${state.user.userId}`; // Replace with your API endpoint
        const token = state.token; // Replace with your actual Bearer token
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const products = response.data;
          console.log(products);
          return products;
        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response.data);
                console.error("Error status:", error.response.status);
                console.error("Error headers:", error.response.headers);
            } else if (error.request) {
                console.error("Error request:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
            console.error("Error config:", error.config);
            return Promise.reject(error);
        }
    }




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
