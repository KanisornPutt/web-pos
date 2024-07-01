<template>
  <div v-if="user">
    <div class="row">
      <div class="container col-12 col-lg-9 col-xl-9">
        <div class="row mt-3">
          <div class="col-6">
            <h4 class="mx-5 my-2">{{ showName }}'s Dashboard</h4>
          </div>
          <div class="col-6 text-end">
            <h4 v-if="isLinkedToStore" class="mx-5 my-2">
              {{ storeData.name }}
              <small class="text-secondary">{{ user.role }} </small>
            </h4>
          </div>
        </div>

        <hr class="mx-4" />

        <!-- User with no store -->
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
        <div v-if="isLinkedToStore">
          <div class="container-fluid">
            
            <!-- Header -->
            <div
              class="d-flex justify-content-between align-items-center mx-4 my-1"
            >
              <div class="row">
                <h4 class="col-6 fw-light">All Items</h4>
                <button
                  v-if="isAdmin"
                  class=" col-6 btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#addNewProductModal"
                  style="width: 60%;"
                >
                  Add New Product
                </button>
              </div>

              <form class="d-flex" role="search">
                <input
                  v-model="searchQuery"
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>

          <hr class="me-5" />

          <!-- Products -->
          <AddNewProductModal />

          <!-- Loaded Product -->
          <div v-if="products">
            <!-- Have a product -->
            <div v-if="filteredProducts.length">
              <div class="row mb-5 mx-1">
                <div
                  class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-2 mb-4"
                  v-for="(product, index) in filteredProducts"
                  :key="index"
                >
                  <ProductCard :product="product" @click="console.log(product)"/>
                </div>
              </div>
            </div>

            <!-- No Product in store -->
            <div v-else>
              <div class="container-fluid">
                <div
                  class="row justify-content-center align-items-center"
                  style="height: 50vh"
                >
                  <div class="col-12 text-center">
                    <h4 class="m-3">It seems your store has no product.</h4>
                    <img
                      class="m-3"
                      src="../assets/empty-icon.png"
                      alt="Empty"
                      style="height: 16vh"
                    />
                    <br />
                    <button
                      v-if="isAdmin"
                      class="btn btn-lg btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#addNewProductModal"
                    >
                      Add New Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading Product -->
          <div v-else>
            <div class="container-fluid">
              <div
                class="row justify-content-center align-items-center"
                style="height: 20vh"
              >
                <div class="col-12 text-center text-secondary">
                  <h1 class="display-6">Loading Product...</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import ProductCard from "@/components/dashboard/ProductCard.vue";
import CartVue from "@/components/dashboard/Cart.vue";
import AddNewProductModal from "@/components/dashboard/AddNewProductModal.vue";

export default {
  components: { ProductCard, CartVue, AddNewProductModal },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters["auth/user"]);
    const showName = computed(() => store.getters["auth/showName"]);
    const storeId = computed(() => store.getters["auth/storeId"]);
    const storeData = computed(() => store.getters["auth/storeData"]);
    const isLinkedToStore = computed(() => store.getters["auth/storeData"]);
    const cart = computed(() => store.state.cart.cart);
    const role = computed(() => store.getters["auth/role"]);
    const isAdmin = role.value === "ADMIN";

    const products = ref(null);
    const searchQuery = ref("");

    const getProducts = async (user) => {
      const result = await store.dispatch("products/getProducts", user);
      return result;
    };

    const filteredProducts = computed(() => {
      if (!products.value) return [];
      return products.value.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    onMounted(async () => {
      products.value = await getProducts(user.value);
      console.log(products.value);
      if (products.value) console.log(products.value.length);
    });

    return {
      user,
      cart,
      storeId,
      showName,
      isLinkedToStore,
      storeData,
      products,
      isAdmin,
      searchQuery,
      filteredProducts,
    };
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
