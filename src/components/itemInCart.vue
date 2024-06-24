<template>
  <div
    class="container mb-2"
    data-bs-toggle="collapse"
    :href="collapseHref"
    role="button"
    @click="updateCart"
    aria-expanded="false"
    :aria-controls="collapseHref"
  >
    <div class="row align-items-center">
      <div class="col-3">
        <p class="mb-0">
          x <span>{{ item.amount }}</span>
        </p>
      </div>
      <div class="col-6">
        <p class="mb-0">{{ item.name }}</p>
      </div>
      <div class="col-3">
        <p class="mb-0 text-end">{{ item.price * item.amount }}</p>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-3"></div>
      <div class="col-9">
        <div v-for="(selection, i) in item.selectedOptions" :key="i">
          <p class="fw-light my-0">
            - <span>{{ selection }}</span>
          </p>
        </div>
        <p class="fw-light my-0">{{ item.note }}</p>
      </div>
    </div>
  </div>

  <div class="collapse" :id="collapseId">
    <div class="card card-body">
      <!-- Amount -->
      <p class="mt-2 mb-1">Amount</p>
      <div
        class="row justify-content-center align-items-center"
        style="width: 100%"
      >
        <div class="col-3 text-start">
          <button class="btn btn-outline-secondary" @click="setAmount(-1)">
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
          <button class="btn btn-outline-secondary" @click="setAmount(1)">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: ["itemId"],
  setup(props) {
    const store = useStore();
    const item = computed(() => {
      return store.getters.getItemFromCartById(props.itemId);
    });
    const collapseId = ref("collapse-" + props.itemId);
    const collapseHref = ref("#collapse-" + props.itemId);
    const amount = ref(item.value.amount);

    const setAmount = (load) => {
      amount.value = amount.value + load;
      if (amount.value <= 0) amount.value = 0;
      if (amount.value >= item.stock) amount.value = item.stock;
      item.value.amount = amount.value;
    };

    const handleAmountInput = (event) => {
      let inputValue = event.target.value;
      inputValue = inputValue.replace(/\D/g, "");
      amount.value = parseInt(inputValue);
      if (isNaN(amount.value)) amount.value = 0;
      setAmount(0);
    };

    const updateCart = () => {
    amount.value = item.value.amount
      if (item.value.amount === 0) {
        console.log('calling removeItemFromCart');
        store.commit("removeItemFromCart", props.itemId);
      }
    };

    return {
      collapseHref,
      collapseId,
      amount,
      setAmount,
      handleAmountInput,
      updateCart,
      item,
    };
  },
};
</script>

<style></style>
