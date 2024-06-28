import axios from "axios";

const state = {
};

const mutations = {

  
};

const actions = {

    async getProducts({rootGetters}, user) {
        console.log("fetching products");
        console.log(user);
        if (!user.storeId) {
            console.log("User is not linked to a store");
            return null;
        }

        const url = `api/products/${user.storeId}/${user.userId}`; // Replace with your API endpoint
        const token = rootGetters["auth/token"];
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
            return null;
        }
    },


    async addProduct({rootGetters}, productDto) {
        console.log("adding products");
        const user = rootGetters["auth/user"];
        console.log(user);
        console.log(productDto);
        if (!user.storeId) {
            console.log("User is not linked to a store");
            return null;
        }

        const url = `api/products/${user.storeId}/${user.userId}`; // Replace with your API endpoint
        const token = rootGetters["auth/token"];
        try {
          const response = await axios.post(url, productDto,{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const responseProduct = response.data;
          console.log(responseProduct);
          return;
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
            return null;
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
