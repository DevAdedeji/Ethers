<template>
  <div class="home">
    <div class="connect" v-show="getConnect">
      <button @click="connect">Connect to wallet</button>
    </div>
    <div :class="getConnect ? 'details dont-show' : 'details show'">
      <div class="account-details">
        <p>You have:</p>
        <p id="amt">{{ getBalance }} ETH</p>
        <p>Your address:</p>
        <p id="address">{{ getAddress }}</p>
      </div>
      <form @submit.prevent="send" class="transfer">
        <p id="title">Transfer ETH:</p>
        <div class="address">
          <label for="address">Receiver's Address:</label>
          <input type="text" id="receiverAaddress" required />
        </div>
        <div class="address">
          <label for="amount">Amount:</label>
          <input type="text" id="amount" required />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {},
  methods: {
    ...mapActions(["connectToWallet"]),
    connect() {
      this.connectToWallet();
    },
    async send() {
      const signer = await this.connectToWallet();
      let receiverAddress = document.getElementById("receiverAaddress").value;
      let amount = document.getElementById("amount").value;
      let tx = {
        to: receiverAddress,
        value: ethers.utils.parseEther(amount),
      };
      signer.sendTransaction(tx).then((txObj) => {
        console.log("txHash", txObj.hash);
        document.getElementById("amount").value = "";
        document.getElementById("receiverAaddress").value = "";
        alert("Done");
      });
    },
  },
  computed: {
    ...mapGetters(["getBalance", "getAddress", "getConnect"]),
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

.home .details {
  width: 40%;
  max-height: 90vh;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.home .details .account-details {
  width: 90%;
  margin: 20px auto;
  background: black;
  border-radius: 5px;
  padding: 10px;
  color: #fff;
}

.home .details .account-details #amt {
  font-size: 25px;
}

.home .details .transfer {
  width: 90%;
  margin: 20px auto;
}

.home .details .transfer #title {
  font-size: 20px;
}

.home .details .transfer div {
  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.home .details .transfer div input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  outline: none;
}

.home .details .transfer button {
  width: 100%;
  padding: 10px 0;
}

.home .details.show {
  display: block;
}

.home .details.dont-show {
  display: none;
}

.home button:hover {
  transform: scale(1.1);
}

@media (max-width: 900px) {
  .home .details {
    width: 90%;
    margin: 0 auto;
  }
  .home .details .account-details #address {
    font-size: 12px;
  }
}
</style>