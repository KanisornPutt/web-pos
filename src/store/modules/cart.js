import { v4 as uuidv4 } from 'uuid';


const state = {
    cart: [],
  };
  
  const mutations = {
    clearCart(state) {
        state.cart = []
        console.log("Cart cleared");
      },
  
      addItemToCart(state, productInCart) {
        productInCart.cartId = uuidv4(); // Assign a unique ID to the item
        state.cart.push(productInCart);
        console.log("Item added to cart:", productInCart);
      },
  
      removeItemFromCart(state, cartId) {
        state.cart = state.cart.filter(productInCart => productInCart.cartId !== cartId);
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
  