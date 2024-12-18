<template>
  <Alert />
  <router-view />
</template>

<script>
import Alert from "@/components/shared/Alert.vue";

export default {
  components: {
    Alert,
  },
};
</script>
