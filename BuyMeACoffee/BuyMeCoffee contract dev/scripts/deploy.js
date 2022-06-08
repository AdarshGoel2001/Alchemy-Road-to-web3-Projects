const hre = require("hardhat");

async function main() {
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buymeAcoffee = await BuyMeACoffee.deploy();
  await buymeAcoffee.deployed();
  console.log("BuyyMecofee deployed to, ", buymeAcoffee.address);
  console.log("My name is phil");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
