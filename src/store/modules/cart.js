const state = {
    cart: [],
  };
  
  const mutations = {
    clearCart(state) {
        state.cart = []
        console.log("Cart cleared");
      },
  
      addItemToCart(state, item) {
        item.id = uuidv4(); // Assign a unique ID to the item
        state.cart.push(item);
        console.log("Item added to cart:", item);
      },
  
      removeItemFromCart(state, itemId) {
        state.cart = state.cart.filter(item => item.id !== itemId);
      },
  };
  
  const actions = {
    login({ commit }, user) {
      // Perform login logic
      commit('SET_USER', user);
    },
    logout({ commit }) {
      // Perform logout logic
      commit('SET_USER', null);
    },
  };
  
  const getters = {
    getItemFromCartById: (state) => (itemId) => {
        return state.cart.find(item => item.id === itemId);
      }
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  