import { createStore } from 'vuex'
import Web3Modal from "web3modal"
import { providers, Signer, ethers, Wallet } from "ethers"

export default createStore({
  state: {
    balance: "0",
  },
  actions: {
    async connectToWallet({ commit, state }, needSigner = false) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      if (needSigner) {
        const signer = provider.getSigner()
        return signer
      }
      let balance = await provider.getBalance("ethers.eth")

      balance = ethers.utils.formatEther(balance)

      commit('setBalance', balance)

      return provider
    },
  },
  mutations: {
    setBalance: (state, balance) => (state.balance = balance)
  },
  getters: {
    getBalance: (state) => { return state.balance }
  }
})
