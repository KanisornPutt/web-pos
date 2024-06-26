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
          <input
            type="text"
            class="border border-secondary rounded-1"
            v-model="firstname"
            style="width: 95%"
          />
        </div>
        <div class="col-6">
          <h6 class="text-secondary">Lastname</h6>
          <input
            type="text"
            class="border border-secondary rounded-1"
            v-model="lastname"
            style="width: 95%"
          />
        </div>
      </div>
      <div class="text-start my-3">
        <h6 class="text-secondary">Username</h6>
        <input
            type="text"
            class="border border-secondary rounded-1"
            v-model="showName"
            style="width: 95%"
          />
      </div>
      <div class="text-start my-3">
        <h6 class="text-secondary">Email</h6>
        <h5>{{ user.email }}</h5>
      </div>
      <div class="text-start my-3">
        <h6 class="text-secondary">Store</h6>
        <div class="d-flex align-items-center" v-if="user.storeId">
          <h5 class="mb-0 me-3">{{ storeData.name }}</h5>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Leave Store
          </button>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Leaving Store
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <h4>Are you sure?</h4>
                <p>This process cannot be undone.</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  cancel
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  @click="leaveStore"
                >
                  Yes, I'm sure.
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!user.storeId">
          <h5>No Store</h5>
          <a class="btn btn-lg btn-orange text-light" href="/storeSetup"
            >Link to One Now</a
          >
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 d-flex justify-content-end mb-4">
    <!-- Move the button to a new row and align it to the right -->
    <button
      class="btn btn-secondary text-light me-3"
      style="width: 9rem; height: 3rem"
      @click="toggleContent"
    >
      Discard Changes
    </button>
    <button
      class="btn btn-success text-light me-3"
      style="width: 9rem; height: 3rem"
      @click="saveChanges"
    >
      Save Changes
    </button>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  emits: ["toggleContent"],
  setup(props, { emit }) {
    const store = useStore();
    const user = computed(() => store.getters["auth/user"]);
    const storeData = computed(() => store.getters["auth/storeData"]);
    const firstname = ref(user.value.firstname);
    const lastname = ref(user.value.lastname);
    const showName = ref(user.value.showName);

    const toggleContent = () => {
      emit("toggleContent");
    };

    const saveChanges = () => {
      const userChangeRequest = {
        firstname: firstname.value,
        lastname: lastname.value,
        showName: showName.value,
      }

      console.log(userChangeRequest);
      store.dispatch('auth/updateUser', userChangeRequest);
      emit("toggleContent");
    }

    const leaveStore = () => {
      store.dispatch("store/leaveStore")
    }

    return {
      user,
      storeData,
      toggleContent,
      firstname,
      lastname,
      showName,
      saveChanges,
      leaveStore,

    };
  },
};
</script>

<style scoped>
input {
  font-size: 20px;
}
</style>
