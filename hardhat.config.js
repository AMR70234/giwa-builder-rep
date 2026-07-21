require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const GIWA_RPC_URL = process.env.GIWA_RPC_URL || "https://sepolia-rpc.giwa.io";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    giwaSepolia: {
      url: GIWA_RPC_URL,
      chainId: 91342,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};
