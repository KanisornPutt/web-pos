import { createStore } from "vuex";
import axios from "axios";

import auth from './modules/auth'
import cart from "./modules/cart";
import store from "./modules/store";

export default createStore({
  modules: {
    auth,
    store,
    cart,
  },
});
