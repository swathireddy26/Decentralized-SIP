const fs = require("fs");
const { ethers } = require("hardhat");

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Uni = await ethers.getContractFactory("Uni");
  const uni = await Uni.deploy(routerAddress);

  console.log("Uni Contract Address ", uni.address);

  const data_uni = {
    address: uni.address,
    abi: JSON.parse(uni.interface.format("json")),
  };
  fs.writeFileSync("frontend/src/Uni.json", JSON.stringify(data_uni));

  const Keeper = await ethers.getContractFactory("Keeper");
  const keeper = await Keeper.deploy(60, uni.address);

  console.log("Keeper Contract Address ", keeper.address);

  const data_keeper = {
    address: keeper.address,
    abi: JSON.parse(keeper.interface.format("json")),
  };
  fs.writeFileSync("frontend/src/Keeper.json", JSON.stringify(data_keeper));
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
