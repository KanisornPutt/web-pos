<template>
  <form @submit.prevent="handleRegister">
    <div class="my-3">
      <label class="form-label">firstname</label>
      <input type="text" class="form-control" v-model="firstname" placeholder="firstname" />
    </div>
    <div class="my-3">
      <label class="form-label">lastname</label>
      <input type="text" class="form-control" v-model="lastname" placeholder="lastname" />
    </div>
    <div class="my-3">
      <label class="form-label">Username</label>ß
      <input type="text" class="form-control" v-model="show_name" placeholder="username" />
    </div>
    <div class="mb-3">
      <label class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
        placeholder="name@example.com"
        v-model="email"
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input type="password" class="form-control" v-model="password" placeholder="password must be of 8 charactors or more" />
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
      <p v-show="errorMessage" class="fs-6 text-center text-danger">{{errorMessage}}</p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const firstname = ref("");
    const lastname = ref("");
    const show_name = ref("");
    const email = ref("");
    const password = ref("");
    const username = ref("");
    const checkbox = ref(false);
    const errorMessage = ref("")

    const router = useRouter();
    const store = useStore()

    const handleRegister = async() => {
      try {
        errorMessage.value = ""
         const registerUser = {
          firstname: firstname.value,
          lastname: lastname.value,
          show_name: show_name.value,
          email: email.value,
          password: password.value
        }
        await store.dispatch("auth/register",registerUser)

        router.push('/login')
        
        // Handle successful registration (redirect, show success message, etc.)
      } catch (error) {
        errorMessage.value = error.message;
      }
    }
    
    // const handleSubmit = async () => {

    //     username.value = username.value.trim()
    //     email.value = email.value.trim().toLowerCase()

    //     try {
    //         await store.dispatch('auth/signup', {
    //             username: username.value,
    //             email: email.value,
    //             password: password.value
    //         })
    //         router.push('/dashboard')
            
    //     } catch (err) {
    //         console.log(err);
    //         alert(err.message)
    //     }


    // }

    return { firstname, lastname , show_name,email, password, checkbox, username, handleRegister,errorMessage };
  },
};
</script>

<style></style>
