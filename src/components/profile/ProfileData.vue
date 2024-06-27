<template>
  <div class="row justify-content-center">
    <div
      class="col-6 col-md-4 m-4 d-flex justify-content-center align-items-center"
    >
      <img src="@/assets/null-user.png" class="rounded-4" alt="" />
    </div>
    <div class="col-8 col-md-6 m-5 mb-0">
      <div class="row text-start">
        <div class="col-6">
          <h6 class="text-secondary">Firstname</h6>
          <h5>{{ user.firstname }}</h5>
        </div>
        <div class="col-6">
          <h6 class="text-secondary">Lastname</h6>
          <h5>{{ user.lastname }}</h5>
        </div>
      </div>
      <div class="text-start my-3">
        <h6 class="text-secondary">Username</h6>
        <h5>{{ user.showName }}</h5>
      </div>
      <div class="text-start my-3">
        <h6 class="text-secondary">Email</h6>
        <h5>{{ user.email }}</h5>
      </div>
      <div class="text-start my-3">
        <div v-if="user.storeId">
          <div class="row text-start">
            <div class="col-6">
              <h6 class="text-secondary">Store</h6>
              <h5>{{ storData.name }}</h5>
            </div>
            <div class="col-6">
              <h6 class="text-secondary">Role</h6>
              <h5>{{ user.role }}</h5>
            </div>
          </div>
        </div>
        <div v-else>
          <h6 class="text-secondary">Store</h6>
          <h5>No Store</h5>
          <a class="btn btn-lg btn-orange text-light" href="/storeSetup"
            >Link to One Now</a
          >
        </div>
      </div>
    </div>
  </div>
    <!-- Footer -->
  <div class="col-12 d-flex justify-content-end mb-4 p-3">
    <button
      class="btn btn-secondary text-light me-3"
      style="width: 9rem; height: 3rem"
      data-bs-toggle="modal"
      data-bs-target="#checkPasswordModal"
    >
      Edit Profile
    </button>

    <CheckPasswordModal
      modalId="checkPasswordModal"
      modelTitle="Edit Profile Data"
      @continue="toggleContent"
    />
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import CheckPasswordModal from "../CheckPasswordModal.vue";
import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle";
export default {
  components: { CheckPasswordModal },
  emits: ["toggleContent"],
  setup(props, { emit }) {
    const store = useStore();
    const user = computed(() => store.getters["auth/user"]);
    const storData = computed(() => store.getters["auth/storeData"]);

    const toggleContent = () => {
      const modalElement = document.getElementById("checkPasswordModal");
      const modal = bootstrapBundle.Modal.getInstance(modalElement);
      modal.hide();
      emit("toggleContent");
    };

    return { user, storData, toggleContent };
  },
};
</script>

<style></style>
