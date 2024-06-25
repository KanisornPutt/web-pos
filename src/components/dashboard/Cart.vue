<template>
  <!-- Navbar for less than lg screen -->
  <nav class="navbar navbar-expand-lg d-lg-none bg-body-tertiary fixed-bottom">
    <a class="navbar-brand mx-4" href="#">Total: {{ totalPrice }} THB</a>
    <button
      class="btn btn-success ms-auto mx-4"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasResponsive"
      aria-controls="offcanvasResponsive"
    >
      Cart({{ cart.length }})
    </button>
  </nav>

  <!-- Offcanvas -->
  <div
    class="offcanvas-lg offcanvas-end bg-body-tertiary"
    tabindex="-1"
    id="offcanvasResponsive"
    aria-labelledby="offcanvasResponsiveLabel"
    style="width: 100%'"
  >
    <!-- Offcanvas Header -->
    <div
      class="offcanvas-header position-fixed top-0 bg-body-tertiary d-none"
      style="width: 100%"
    >
      <h3>Cart({{ cart.length }})</h3>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        data-bs-target="#offcanvasResponsive"
        aria-label="Close"
      >
        CLOSE
      </button>
    </div>

    <!-- Offcavas Body -->

    <div class="oc-body ">
      <h3 class="my-1">Cart({{ cart.length }})</h3>
      <hr />
      <div
        class="offcanvas-body"
        style="overflow-y: auto; max-height: calc(100vh - 150px)"
      >
        <!-- items in cart  -->
        <div class="container-fluid">
          <div v-for="(item, i) in cart" :key="i" class="row my-3">
            <ItemInCart :itemId="item.id" />
          </div>
        </div>
      </div>

      <!-- offcanvas footer -->
      <div
        class="position-fixed bottom-0 bg-body-tertiary px-4 pt-1 pb-4"
        style="width: 100%"
      >
        <h5>Total: {{ totalPrice }} THB</h5>
        <button class="btn btn-success" @click="console.log(cart)">
          Checkout
        </button>
        <button class="btn btn-outline-danger mx-3" @click="clearCart">
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import ItemInCart from "./itemInCart.vue";
export default {
  components: { ItemInCart },
  setup() {
    const store = useStore();
    const cart = computed(() => store.state.cart.cart);
    const clearCart = () => {
      store.commit("cart/clearCart");
    };

    const totalPrice = computed(() => {
      if (cart.value.length === 0) {
        return 0;
      }
      return cart.value.reduce(
        (acc, item) => acc + item.price * item.amount,
        0
      );
    });

    return { clearCart, cart, totalPrice };
  },
};
</script>

<style scoped>
.oc-body {
  /*from lg to xxl */
  width: 22vw;
  position: fixed;

  /* Media query for sm to md */
  @media (max-width: 992px) {
    width: 350px;
    margin: 20px ;
    position: relative;
  }
}
</style>
