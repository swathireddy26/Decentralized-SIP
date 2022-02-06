require("@nomiclabs/hardhat-ethers");
require("dotenv").config({ path: "./.env" });

const alchemy_url =
  "https://polygon-mumbai.g.alchemy.com/v2/9x-Tz-nk4215sm_qx2ACXC_Ulw3aXVA_";

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: alchemy_url,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.7.5",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
