<template>
  <div>
    <h1>Step 2 login with Passkey</h1>
    <button class="btn btn-primary" @click="handleRegister">Register</button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const email = computed(() => store.getters["auth/showName"]);
    const handleRegister = async () => {
      try {
        errorMessage.value = "";
        const registerUser = {
          show_name: show_name.value.trim(),
          email: email.value.trim().toLowerCase(),
        };
        await store.dispatch("auth/registerfido", registerUser);

        router.push("/dashboard");

        // Handle successful registration (redirect, show success message, etc.)
      } catch (error) {
        errorMessage.value = error.message;
      }
    };
  },
};
</script>

<style></style>
