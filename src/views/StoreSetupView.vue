<template>
  <div class="container m-5 mx-auto">
    <div class="row justify-content-center">
      <div
        class="col-12 col-md-10 col-lg-8 p-5 border border-hide border-tertiary rounded-4"
      >
        <div>
          <form
            v-if="activeForm === 'createFrom'"
            @submit.prevent="createStore"
          >
            <h2>Create New Store</h2>
            <div class="mb-3">
              <label for="storeName" class="form-label">Store Name</label>
              <input
                type="text"
                class="form-control"
                id="storeName"
                placeholder="Name of your store"
                required
                v-model="storeName"
              />
            </div>
            <div class="mb-3">
              <label for="createStoreCode" class="form-label">Store Code</label>
              <input
                type="text"
                class="form-control"
                id="createStoreCode"
                placeholder="Unique Code for your store, used for invitation"
                required
                v-model="createStoreCode"
              />
            </div>
            <div class="mb-3">
              <label for="createStorePassword" class="form-label"
                >Store Password</label
              >
              <input
                type="password"
                class="form-control"
                id="createStorePassword"
                placeholder="Password of at least 8 characters for invitaion"
                required
                v-model="createStorePassword"
              />
            </div>
            <button type="submit" class="btn btn-primary my-2">
              Create Store
            </button>

            <hr />
            <p class="">Not an Owner?</p>
            <button
              type="button"
              class="btn btn-primary"
              @click="toggleForms('JoinForm')"
            >
              Join an Existing Store
            </button>
          </form>

          <form v-if="activeForm === 'JoinForm'" @submit.prevent="joinStore">
            <h2>Join an Existing Store</h2>
            <div class="mb-3">
              <label for="joinStoreCode" class="form-label">Store Code</label>
              <input
                type="text"
                class="form-control"
                id="joinStoreCode"
                placeholder="Store Code given by the store admin"
                required
                v-model="joinStoreCode"
              />
            </div>
            <div class="mb-3">
              <label for="joinStorePassword" class="form-label"
                >Store Password</label
              >
              <input
                type="password"
                class="form-control"
                id="joinStorePassword"
                placeholder="Store Password given by the store admin"
                required
                v-model="joinStorePassword"
              />
            </div>
            <button type="submit" class="btn btn-primary my-2">
              Join Store
            </button>
            <hr />
            <p class="">Creating a New Store?</p>
            <button
              type="button"
              class="btn btn-primary"
              @click="toggleForms('createFrom')"
            >
              Create a New Store
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import store from "@/store/modules/store";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const activeForm = ref("createFrom");

    const clearForms = () => {
      storeName.value = "";
      createStoreCode.value = "";
      createStorePassword.value = "";
      joinStoreCode.value = "";
      joinStorePassword.value = "";
    };

    const toggleForms = (formName) => {
      clearForms();
      activeForm.value = formName;
    };

    const storeName = ref("");
    const createStoreCode = ref("");
    const createStorePassword = ref("");
    const joinStoreCode = ref("");
    const joinStorePassword = ref("");

    const createStore = async () => {
      const createStoreRequest = {
        name: storeName.value,
        storeCode: createStoreCode.value,
        password: createStorePassword.value,
      };
      console.log(createStoreRequest);

      const validation = await store.dispatch(
        "store/createStore",
        createStoreRequest
      );
      if (validation) {
        router.push("/dashboard");
      } else {
        alert("Store code has already been used");
        createStoreCode.value = "";
        createStorePassword.value = "";
      }
    };

    const joinStore = async () => {
      const joinStoreRequest = {
        storeCode: joinStoreCode.value,
        password: joinStorePassword.value,
      };
      console.log(joinStoreRequest);
      const validation = await store.dispatch(
        "store/joinStore",
        joinStoreRequest
      );
      if (validation) {
        router.push("/dashboard");
      } else {
        alert("Inccorect Store code or password");
        createStoreCode.value = "";
        createStorePassword.value = "";
      }
    };

    return {
      activeForm,
      toggleForms,
      storeName,
      createStoreCode,
      createStorePassword,
      joinStoreCode,
      joinStorePassword,
      createStore,
      joinStore,
    };
  },
};
</script>

<style scode>
@media (max-width: 768px) {
  .border-hide {
    border: none !important; /* Hide the border */
  }
}
</style>
