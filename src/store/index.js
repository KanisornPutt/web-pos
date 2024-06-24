import { createStore } from "vuex";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import auth from './modules/auth'
import cart from "./modules/cart";

export default createStore({
  modules: {
    auth,
    cart
  },
});
