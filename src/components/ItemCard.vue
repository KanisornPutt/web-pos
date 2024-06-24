<template>
  <div
    class="card m-0"
    data-bs-toggle="modal"
    :data-bs-target="modalId"
    style="width: 10rem"
  >
    <img :src="imgSrc" class="card-img-top fixed-img" :alt="item.name" />
    <div class="card-body">
      <div class="card-info" style="height: 80px; overflow: hidden">
        <h5 class="card-title" style="max-height: 50px; overflow: hidden">
          {{ item.name }}
        </h5>
        <p class="card-text">{{ item.price }} THB</p>
      </div>
      <p class="card-text fw-light">Stock: {{ item.stock }}</p>
    </div>
  </div>


  <!-- Modal -->
  <ItemModal :item="item" :id="modalName"/>
</template>

<script>
import { ref } from 'vue';
import ItemModal from '@/components/ItemModal.vue';
export default {
  props: ["item"],
  components: {ItemModal},
  computed: {
    imgSrc() {
      try {
        return require(`@/assets/${this.item.img}`);
      } catch (e) {
        console.error(`Image not found: ${this.item.img}`);
        return "";
      }
    },
  },
  setup(props) {
    const modalName = ref(props.item.name.replace(/\s+/g, '') + "Modal");
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
