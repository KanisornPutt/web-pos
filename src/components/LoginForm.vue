<template>
  <form @submit.prevent>
    <div class="mb-3">
      <label class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
        v-model="email"
        placeholder="name@example.com"
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        v-model="password"
        placeholder="password"
      />
    </div>

    <div class="row justify-content-center">
      <button type="button" class="btn btn-primary col-6" @click="handleSubmit">Login</button>
      <button type="button" @click="loginWithOAuth" class="btn btn-primary col-6">Login with Google</button>
      <p class="fs-6 text-center">
        Don't have an account yet?
        <a href="/signup" class="text-decoration-none">Signup now</a>
      </p>
      <p v-show="errorMessage" class="fs-6 text-center text-danger">{{errorMessage}}</p>
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

    const clientId = '38181892421-dcmv3r9nvnkbalt85nskg16qtlc8e7n5.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:8020/redirect';
    const responseType = 'code';
    const scope = 'email profile'; // adjust scopes as needed
    const state = 'YOUR_STATE'; // a random string to prevent CSRF attacks

    const errorMessage = ref("")
    
    const handleSubmit = async () => {
      try {
        errorMessage.value = ""
        const loginUser = {
          email: email.value,
          password: password.value
        }
        await store.dispatch("auth/login",loginUser)
        router.push('/dashboard')
      } catch (error) {
        console.error("Error during login:", error);
        errorMessage.value = "Wrong_UserName_Or_Password"
      }


      // email.value = email.value.trim().toLowerCase();

      // try {
      //   await store.dispatch("auth/login", {
      //     email: email.value,
      //     password: password.value,
      //   });
      //   router.push('/dashboard')
      // } catch (err) {
      //   console.log(err);
      //   alert(err.message);
      //   email.value = "";
      //   password.value = "";

      // }


    };

    const loginWithOAuth = () => {
      console.log("oauth")
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;
      window.location.href = authUrl;
    };


    return { email, password, handleSubmit, loginWithOAuth, errorMessage };
  },
};
</script>

<style></style>
