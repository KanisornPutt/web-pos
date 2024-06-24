<template>
  <div
    class="modal fade modal-fullscreen-md-down"
    tabindex="-1"
    aria-labelledby="itemModalLabel"
    aria-hidden="true"
    ref="itemModal"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="itemModalLabel">{{ item.name }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="row">
            <!-- Img -->
            <div class="col-6">
              <img
                :src="imgSrc"
                class="card-img-top fixed-img"
                :alt="item.name"
              />
            </div>

            <!-- Body -->
            <div class="col-6">
              <h5 class="mb-0">{{ item.name }}</h5>
              <small class=".fs-2 mt-0 mb-2">{{ item.description }}</small>

              <!-- Options -->
              <div v-for="(o, index) in item.options" :key="index">
                <p class="mt-2 mb-0">
                  {{ o.for }}
                  <span class=".fs-1 fw-light" v-if="o.req"> required </span>
                </p>
                <div v-for="choice in o.choices" :key="choice">
                  <!-- Req implementation  -->
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      :name="'option' + index"
                      :value="choice"
                      v-model="selectedOptions[index]"
                      required
                    />
                    <label class="form-check-label">
                      {{ choice }}
                    </label>
                  </div>
                </div>
              </div>

              <!-- Notes Textbox -->
              <p class="mt-2 mb-0">Notes</p>
              <textarea
                class="border border-secondary mt-0"
                name="addons"
                id="addons"
                style="
                  height: 5rem;
                  width: 90%;
                  m-2
                "
                v-model="note"
              ></textarea>

              <!-- Amount -->
              <p class="mt-2 mb-1">Amount</p>
              <div
                class="row justify-content-center align-items-center"
                style="width: 100%"
              >
                <div class="col-3 text-start">
                  <button
                    class="btn btn-outline-secondary"
                    @click="setAmount(-1)"
                  >
                    <i class="bi bi-dash"></i>
                  </button>
                </div>
                <div class="col-6 text-center">
                  <textarea
                    type="text"
                    class="form-control fw-bold ms-2"
                    v-model="amount"
                    style="height: 1rem"
                    @input="handleAmountInput"
                  ></textarea>
                </div>
                <div class="col-3 text-end">
                  <button
                    class="btn btn-outline-secondary"
                    @click="setAmount(1)"
                  >
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>


            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Close
          </button>
          <button
            type="button"
            @click="handleAddToCart"
            class="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle";

export default {
  props: ["item"],
  setup(props) {
    const store = useStore();
    const cart = computed(() => store.state.cart.cart);
    const itemModal = ref(null);
    const selectedOptions = ref(Array(props.item.options.length).fill(null));
    const invalidMsg = ref("");
    const note = ref("");
    const amount = ref(1);
    const item = props.item;

    const imgSrc = computed(() => {
      try {
        return require(`@/assets/${props.item.img}`);
      } catch (e) {
        console.error(`Image not found: ${props.item.img}`);
        return "";
      }
    });

    const isFormValid = computed(() =>
      selectedOptions.value.every((option) => option !== null)
    );

    const handleAddToCart = () => {
      if (isFormValid.value) {
        const itemWithSelectedOptions = {
          ...props.item,
          selectedOptions: selectedOptions.value,
          amount: amount.value,
          note: note.value.trim(),
        };
        store.commit('cart/addItemToCart', itemWithSelectedOptions)
        closeModal();
      } else {
        invalidMsg.value = "Please select all of the required options";
        console.log(invalidMsg.value);
      }
    };

    const setAmount = (load) => {
      amount.value = amount.value + load;
      if (amount.value <= 0) amount.value = 0;
      if (amount.value >= item.stock) amount.value = item.stock;
    };

    const handleAmountInput = (event) => {
      let inputValue = event.target.value;
      inputValue = inputValue.replace(/\D/g, "");
      amount.value = parseInt(inputValue);
      if (isNaN(amount.value)) amount.value = 0;
      setAmount(0);
    };

    const closeModal = () => {
      const modalElement = itemModal.value;
      const modalInstance = bootstrapBundle.Modal.getInstance(modalElement);
      selectedOptions.value = Array(props.item.options.length).fill(null);
      amount.value = 1;
      note.value = "";
      if (modalInstance) {
        modalInstance.hide();
      }
    };

    return {
      imgSrc,
      handleAddToCart,
      closeModal,
      handleAmountInput,
      itemModal,
      selectedOptions,
      isFormValid,
      amount,
      setAmount,
      note,
    };
  },
};
</script>

<style>
.fixed-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.form-check-input:invalid {
  border-color: red;
}
</style>
