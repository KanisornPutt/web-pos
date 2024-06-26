<template>
  <div v-if="user">
    <div class="row">
      <div class="container col-12 col-lg-9 col-xl-9">
        <div class="row mt-3">
          <div class="col-6">
            <h4 class="mx-5 my-2">{{ showName }}'s Dashboard</h4>
          </div>
          <div class="col-6 text-end">
            <h4 v-if="isLinkedToStore" class="mx-5 my-2">{{ storeData.name }}</h4>
          </div>
        </div>

        <hr class="mx-4" />

        <div v-if="!isLinkedToStore" class="container">
          <div
            class="row justify-content-center align-items-center"
            style="height: 50vh"
          >
            <div class="col-6 col-md-4 text-center">
              <h4>No Store Found</h4>
              <a class="btn btn-lg btn-orange text-light" href="/storeSetup"
                >Link to One Now</a
              >
            </div>
          </div>
        </div>

        <!-- For User's with Store id -->
        <dir v-if="isLinkedToStore">
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

          <hr class="me-5" />
          <div class="row mb-5 mx-1">
            <div
              class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-2 mb-4"
              v-for="item in user.items"
              :key="item.name"
            >
              <ItemCard :item="item" />
            </div>
          </div>
        </dir>
      </div>
      <div
        v-if="isLinkedToStore"
        class="col-lg-3 col-xl-3 bg-body-tertiary cart"
      >
        <CartVue />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ItemCard from "@/components/dashboard/ItemCard.vue";
import CartVue from "@/components/dashboard/Cart.vue";

export default {
  components: { ItemCard, CartVue },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters["auth/user"]);
    const showName = computed(() => store.getters["auth/showName"]);
    const storeId = computed(() => store.getters["auth/storeId"]);
    const storeData = computed(() => store.getters["auth/storeData"]);
    const isLinkedToStore = computed(
      () => store.getters["auth/storeData"]
    );
    const cart = computed(() => store.state.cart.cart);

    onMounted(() => {
      console.log("mounting...");
    });

    return { user, cart, storeId, showName, isLinkedToStore, storeData };
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
