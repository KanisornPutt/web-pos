<template>
  <h2>
    {{user.username}} 's dashboard
  </h2>
  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, temporibus sint tempora adipisci soluta odio eligendi! Aliquid, exercitationem officia dicta ratione qui illum. Alias velit aliquid accusantium modi ea recusandae.</p>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore();
        const user = computed(() => store.state.auth.user);
    
    
        return {user}
    }
}
</script>

<style>

</style>