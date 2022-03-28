<template>
  <div class="home">
    <button @click="connect">Connect to wallet</button>
    <p>{{ getBalance }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {},
  methods: {
    ...mapActions(["connectToWallet"]),
    connect() {
      this.connectToWallet();
      // this.$router.push("/details");
    },
  },
  computed: {
    ...mapGetters(["getBalance"]),
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.home button {
  border: none;
  outline: none;
  background-color: blue;
  color: #fff;
  padding: 20px;
  font-size: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: 0.5s all;
}

.home button:focus {
  transform: scale(0.9);
}
</style>