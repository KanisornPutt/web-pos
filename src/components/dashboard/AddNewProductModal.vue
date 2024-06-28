<template>
  <div
    class="modal modal-lg fade modal-fullscreen-md-down"
    id="addNewProductModal"
    tabindex="-1"
    aria-labelledby="itemModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <form @submit.prevent="console.log('Submit')">
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
          <div class="modal-body" style="max-height: 90%; overflow-y: auto">
            <form>
              <div class="row justify-content-center">
                <div
                  class="col-6 col-md-4 m-4 d-flex justify-content-center align-items-center"
                >
                  <img
                    src="@/assets/product.png"
                    class="rounded-4"
                    alt=""
                    style="height: 30vh"
                  />
                </div>

                <div class="col-10 col-md-6">
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
                      v-model="productName"
                    />
                    <div id="nameError" class="form-text">nameError</div>
                  </div>
                  <div class="mb-3">
                    <label for="desInput" class="form-label"
                      >Description:</label
                    >
                    <textarea
                      class="form-control description-input"
                      id="desInput"
                      rows="2"
                      v-model="description"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
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
export default {
    setup() {
        const productName = ref("")
        

        return {
            productName,
        }
    }


};
</script>

<style></style>
