<template>
  <div
    class="modal modal-md fade modal-fullscreen-md-down"
    id="addNewProductModal"
    tabindex="-1"
    aria-labelledby="itemModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit="addProduct">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addNewProductModalLabel">
              Adding New Product
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" style="max-height: 75vh; overflow-y: auto">
            <div class="row justify-content-center">
              <div
                class="col-8 col-md-4 m-4 d-flex justify-content-center align-items-center"
              >
                <img
                  src="@/assets/product.png"
                  class="rounded-4"
                  alt=""
                  style="height: 30vh"
                />
              </div>

              <div class="col-10 col-md-6">
                <!-- Product Name -->
                <div class="mb-3">
                  <label for="nameInput" class="form-label"
                    >Product Name:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="nameInput"
                    aria-describedby="nameError"
                    required
                    placeholder="Product Name"
                    v-model="productName"
                  />
                  <div id="nameError" class="form-text">{{ nameError }}</div>
                </div>

                <!-- Product Description -->
                <div class="mb-3">
                  <label for="desInput" class="form-label">Description:</label>
                  <textarea
                    class="form-control description-input"
                    id="desInput"
                    rows="2"
                    placeholder="Product Description"
                    v-model="description"
                  ></textarea>
                </div>

                <!-- Price -->
                <div class="mb-3">
                  <label for="priceInput" class="form-label">Price:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="priceInput"
                    aria-describedby="priceError"
                    required
                    placeholder="00.00"
                    v-model="price"
                    step="0.01"
                  />
                  <div id="priceError" class="form-text">{{ priceError }}</div>
                </div>
              </div>
            </div>

            <!-- Under picture -->
            <div class="row justify-content-center">
              <!-- Category -->
              <div class="col-10 col-md-6">
                <label for="categorySelect" class="form-label">Category:</label>
                <select
                  class="form-select"
                  id="categorySelect"
                  aria-label="Default select example"
                  v-model="selectedCategory"
                >
                  <option value="---NONE---">NONE</option>
                  <option
                    v-for="(category, index) in storeData.categories"
                    :key="index"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                  <option value="---NEW---">Add New Category</option>
                </select>
                <div v-if="selectedCategory === '---NEW---'" class="mt-2">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter New Category"
                    v-model="newCategory"
                    required
                  />
                </div>
              </div>

              <!-- Stock -->
              <div class="col-10 col-md-6">
                <div>
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    id="flexCheckDefault"
                    v-model="isStockEnabled"
                  />
                  <label for="stockInput" class="form-label">Stock:</label>
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="stockInput"
                  aria-describedby="stockError"
                  required
                  placeholder="0"
                  v-model="stock"
                  :disabled="!isStockEnabled"
                  step="1"
                />
                <div id="stockError" class="form-text">{{ stockError }}</div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer" style="height: 20%">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-success">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const storeData = computed(() => store.getters["auth/storeData"]);

    console.log(storeData.value.categories);

    const productName = ref("");
    const nameError = ref("");
    const description = ref("");
    const price = ref("");
    const priceError = ref("");
    const selectedCategory = ref("---NONE---");
    const newCategory = ref("");
    const isStockEnabled = ref(false);
    const stock = ref("");
    const stockError = ref("");

    const clearForm = () => {
        productName.value = "";
        nameError.value = "";
        description.value = "";
        price.value = "";
        priceError.value = "";
        selectedCategory.value = "---NONE---";
        newCategory.value = "";
        isStockEnabled.value = false;
        stock.value = "";
        stockError.value = "";
    }

    const addProduct = async () => {

        var category = "";

        if (selectedCategory.value === "---NONE--")
            category = "";
        else if (selectedCategory.value === "---NEW---")
            category = newCategory.value.trim();
        else category = selectedCategory.value;

        var saveStock = null;

        if (isStockEnabled.value)
            saveStock = stock.value;

        const productDto = {
            name: productName.value.trim(),
            description: productName.value.trim(),
            price: price.value,
            category: category,
            stock: saveStock
        }

        console.log(productDto);

        await store.dispatch("products/addProduct", productDto);
        clearForm();
    }


    return {
      productName,
      nameError,
      description,
      price,
      priceError,
      storeData,
      selectedCategory,
      newCategory,
      isStockEnabled,
      stock,
      stockError,
      addProduct,
    };
  },
};
</script>

<style></style>
