// contract was deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3 on 6/6/2022

async function main() {
  const NFT = await hre.ethers.getContractFactory("Wojak");
  const nft = await NFT.deploy();

  await nft.deployed();

  console.log("Wojak deployed to: ", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
