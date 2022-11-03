const HDWalletProvider = require("@truffle/hdwallet-provider")
const {privateKey, publicKey} = require("./privatekey")

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
    },
    live: {
      provider: function() {
        return new HDWalletProvider(privateKey, "https://mainnet.infura.io/v3/a07aaaeb8e1c4277a1d9354b5b420548")
      },
      network_id: 1,
      gasPrice: 51e9,
      from: publicKey,
      gas: 8e6
    },
    testnet: {
      provider: () => new HDWalletProvider(privateKey, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 8e6
    }
  },

  compilers: {
    solc: {
      version: "0.5.16",
      docker: false,
      settings: {
       optimizer: {
         enabled: true,
         runs: 200
       },
       evmVersion: "byzantium"
      }
    }
  }
}
