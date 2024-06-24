<template>
  <form @submit.prevent="handleSubmit">
    <div class="my-3">
      <label class="form-label">Username</label>
      <input type="text" class="form-control" v-model="username" placeholder="username" required/>
    </div>
    <div class="mb-3">
      <label class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
        placeholder="name@example.com"
        v-model="email"
        required
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input type="password" class="form-control" v-model="password" placeholder="password must be of 8 charactors or more" required/>
    </div>
    <div class="my-3 form-check">
      <input type="checkbox" class="form-check-input" v-model="checkbox" />
      <label class="form-check-label">
        <a href="#terms">Accept conditions & terms</a></label
      >
    </div>

    <div class="row justify-content-center">

      <button type="submit" class="btn btn-primary col-6">Sign Up</button>

      <p class="fs-6 text-center">
        Already have an account?
        <a href="/login" class="text-decoration-none col-12">Login now</a>
      </p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const username = ref("");
    const checkbox = ref(false);

    const router = useRouter();
    const store = useStore()
    
    const handleSubmit = async () => {

        username.value = username.value.trim()
        email.value = email.value.trim().toLowerCase()

        try {
            await store.dispatch('auth/signup', {
                username: username.value,
                email: email.value,
                password: password.value
            })
            router.push('/dashboard')
            
        } catch (err) {
            console.log(err);
            alert(err.message)
        }


    }

    return { email, password, checkbox, username, handleSubmit };
  },
};
</script>

<style></style>
