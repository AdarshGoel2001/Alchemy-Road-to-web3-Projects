const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`address ${address} balance is: `, await getBalance(address));
    idx++;
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipperAddress = memo.from;
    const tipper = memo.name;
    const message = memo.message;
    console.log(
      `at ${timestamp}, ${tipper} (${tipperAddress}) said ${message}`
    );
  }
}

async function main() {
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buymeAcoffee = await BuyMeACoffee.deploy();
  await buymeAcoffee.deployed();

  console.log("BuyyMecofee deployed to, ", buymeAcoffee.address);

  const addresses = [owner.address, tipper.address, buymeAcoffee.address];
  console.log("====starts====");
  await printBalances(addresses);

  const tip = { value: hre.ethers.utils.parseEther("1") };

  await buymeAcoffee.connect(tipper).buyCoffee("Bhoomika", "Enjoy!!", tip);
  await buymeAcoffee.connect(tipper2).buyCoffee("Omkar", "Maze kar", tip);
  await buymeAcoffee
    .connect(tipper3)
    .buyCoffee("Nikunj", "Aiyeee, phod diya bhai", tip);

  console.log("====coffee now bought=== ");
  await printBalances(addresses);

  await buymeAcoffee.connect(owner).withdrawTips();

  console.log("====tips withdrawn===");
  await printBalances(addresses);

  console.log("====memos====");
  const memos = await buymeAcoffee.getMemos();
  await printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
