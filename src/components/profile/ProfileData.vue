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
        <h6 class="text-secondary">Email</h6>
        <h5>{{ user.email }}</h5>
      </div>
      <div class="text-start my-3">
        <h6 class="text-secondary">Store</h6>
        <h5 v-if="user.storeId">{{storData.name}}</h5>
        <div v-else>
          <h5>No Store</h5>
          <a class="btn btn-lg btn-orange text-light" href="/storeSetup">Link to One Now</a>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 d-flex justify-content-end mb-4">
      <!-- Move the button to a new row and align it to the right -->
      <button class="btn btn-secondary text-light me-3" style="width: 9rem; height: 3rem;">
        Edit Profile
      </button>
  </div>

</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const user = computed(() => store.getters["auth/user"]);
    const storData = computed(() => store.getters["store/storeData"])
    
    return { user, storData };
  },
};
</script>

<style></style>
