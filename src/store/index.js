import { createStore } from 'vuex'
import Web3Modal from "web3modal"
import { providers, Signer, ethers, Wallet } from "ethers"

export default createStore({
  state: {
    balance: "0",
    address: "",
    Notconnected: true,
  },
  actions: {
    //Function to connect the wallet and will return a signer to sign transactons
    async connectToWallet({ commit, state }) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      let balance = await provider.getBalance(address)
      let eth = ethers.utils.formatEther(balance)
      commit('setBalance', eth)
      commit('setConnected', false)
      commit('setAddress', address)
      return signer;
    },
  },
  mutations: {
    setBalance: (state, balance) => (state.balance = balance),
    setConnected: (state, connected) => (state.Notconnected = connected),
    setAddress: (state, address) => (state.address = address)
  },
  getters: {
    getBalance: (state) => { return state.balance },
    getAddress: (state) => { return state.address },
    getConnect: (state) => { return state.Notconnected }
  }
})
