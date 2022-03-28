<template>
  <div class="details">
    <p>{{ getBalance }}</p>
    <p></p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getBalance"]),
  },
};
</script>

<style>
</style>