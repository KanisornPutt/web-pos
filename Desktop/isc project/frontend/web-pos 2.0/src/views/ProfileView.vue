<template>
  <div class="container m-5 mx-auto border border-hide border-tertiary rounded-4" v-if="isLoggined">
    <ProfileData />
  </div>
</template>

<script>
import ProfileData from "@/components/profile/ProfileData.vue";
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  components: { ProfileData },
  setup() {
    const store = useStore();
    const isLoggined = computed(() => store.getters['auth/isAuthenticated']);

    return {isLoggined}
  }
};
</script>

<style scode>
@media (max-width: 768px) {
  .border-hide {
    border: none !important; /* Hide the border */
  }
}
</style>
