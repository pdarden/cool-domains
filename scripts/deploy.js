const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("grid");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
	let txn = await domainContract.register("wild",  {value: hre.ethers.utils.parseEther('0.3')});
	await txn.wait();
  console.log("Minted domain wild.grid");

  txn = await domainContract.setRecord("wild", "Am I a banana or a grid??");
  await txn.wait();
  console.log("Set record for wild.grid");

  const address = await domainContract.getAddress("wild");
  console.log("Owner of domain wild:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
