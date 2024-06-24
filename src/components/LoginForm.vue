<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
        v-model="email"
        placeholder="name@example.com"
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        v-model="password"
        placeholder="password"
        required
      />
    </div>

    <div class="row justify-content-center">
      <button type="submit" class="btn btn-primary col-6">Login</button>

      <p class="fs-6 text-center">
        Don't have an account yet?
        <a href="/signup" class="text-decoration-none">Signup now</a>
      </p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {


      email.value = email.value.trim().toLowerCase();

      try {
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        router.push('/dashboard')
      } catch (err) {
        console.log(err);
        alert(err.message);
        email.value = "";
        password.value = "";

      }


    };

    return { email, password, handleSubmit };
  },
};
</script>

<style></style>
