<template>
  <div v-if="user">
    <div class="row">
      <div class="container col-12 col-lg-9 col-xl-9">
        <h4 class="mx-5 my-2">{{ user.username }}'s Dashboard</h4>
        <hr class="mx-4" />
        <div class="container-fluid">
          <div
            class="d-flex justify-content-between align-items-center mx-4 my-1"
          >
            <h4 class="fw-light">All Items</h4>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>

        <hr class="mx-4" />
        <div class="row mb-5 mx-1">
          <div
            class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-2 mb-4"
            v-for="item in user.items"
            :key="item.name"
          >
            <ItemCard :item="item" />
          </div>

          
        </div>
      </div>
      <div class="col-lg-3 col-xl-3 bg-body-tertiary cart ">
        <CartVue />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import ItemCard from "@/components/ItemCard.vue";
import CartVue from '@/components/Cart.vue';

export default {
  components: { ItemCard, CartVue },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.auth.user);
    const cart = computed(() => store.state.cart.cart);


    return { user, cart};
  },
};
</script>

<style scoped>
.cart {
  /* Set default height */
  height: 100rem; /* Height from lg to xxl */
  position: relative;

  /* Media query for sm to md */
  @media (max-width: 992px) {
    height: 0vh; /* Height at xl to md */
    position: fixed;
  }
}
</style>
