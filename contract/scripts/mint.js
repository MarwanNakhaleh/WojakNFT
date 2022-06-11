// contract was deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3 on 6/6/2022

async function main() {
    const [owner] = await hre.ethers.getSigners();

    const NFT = await hre.ethers.getContractFactory("Wojak");
    const nft = await NFT.attach(process.env.RINKEBY_NFT);
  
    await nft.deployed();
  
    console.log("Wojak deployed to: ", nft.address);

    // Mint token
    nextTokenId = await nft.totalSupply();
    tx = await nft.safeMint(owner.address);
    
    console.log("Next NFT Minted ID: ", nextTokenId.toString());
    console.log("Owner of NFT: ", owner.address);
    console.log("Hash location of Minted NFT: ", tx.hash);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  