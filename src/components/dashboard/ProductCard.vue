<template>
  <div
    class="card m-0 .w-100"
    data-bs-toggle="modal"
    :data-bs-target="modalId"

  >
    <img src="@/assets/product.png" class="card-img-top fixed-img" :alt="product.name" />
    <div class="card-body">
      <div class="card-info" style="height: 80px; overflow: hidden">
        <h5 class="card-title" style="max-height: 50px; overflow: hidden">
          {{ product.name }}
        </h5>
        <p class="card-text">{{ product.price }} THB</p>
      </div>
    </div>
  </div>


  <!-- Modal -->
  <ProductModal :product="product" :id="modalName"/>
</template>

<script>
import { ref } from 'vue';
import ProductModal from '@/components/dashboard/ProductModal.vue';
export default {
  props: ["product"],
  components: {ProductModal},
  computed: {
    
  },
  setup(props) {
    const modalName = ref(props.product.name.replace(/\s+/g, '') + "Modal");
    const modalId = ref("#" + modalName.value);

    return {modalId, modalName}
  }
};
</script>

<style scoped>
.fixed-img {
  width: 100%;
  height: 158px;
  object-fit: cover;
}
</style>
