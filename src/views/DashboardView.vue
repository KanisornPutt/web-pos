<template>
  <h2>
    {{user.username}} 's dashboard
  </h2>
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