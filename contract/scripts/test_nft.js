// Wojak deployed to:  0x5FbDB2315678afecb367f032d93F642f64180aa3
// Deployer NFT Count:  1
// Addr1 NFT Count:  2
// Addr2 NFT Count:  0

async function main() {
  const [deployer, addr1, addr2] = await hre.ethers.getSigners();

  const NFT = await hre.ethers.getContractFactory("Wojak");
  const nft = await NFT.deploy();

  await nft.deployed();

  console.log("Wojak deployed to: ", nft.address);

  await nft.safeMint(deployer.address);
  await nft.safeMint(addr1.address);
  await nft.safeMint(addr1.address);

  async function printBalances() {
    console.log("Deployer NFT Count: ", (await nft.balanceOf(deployer.address)).toString());
    console.log("Addr1 NFT Count: ", (await nft.balanceOf(addr1.address)).toString());
    console.log("Addr2 NFT Count: ", (await nft.balanceOf(addr2.address)).toString());
  } 

  await printBalances();

  await nft.connect(addr1).transferFrom(addr1.address, addr2.address, 2);
  console.log("NFT with token ID 2 transferred from addr1 to addr2.");

  await printBalances();

  console.log(await nft.tokenURI(0));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
