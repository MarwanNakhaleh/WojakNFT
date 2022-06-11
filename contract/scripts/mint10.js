const winston = require("winston");

async function main() {
  const logConfiguration = {
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: "logs/minting.log",
      }),
    ],
  };
  const logger = winston.createLogger(logConfiguration);
  const [owner] = await hre.ethers.getSigners();

  const NFT = await hre.ethers.getContractFactory("Wojak");
  const nft = await NFT.attach(process.env.RINKEBY_NFT);

  await nft.deployed();

  logger.info("Wojak deployed to: ", nft.address);

  // Mint token
  for (let i = 0; i < 10; i++) {
    var nextTokenId = await nft.totalSupply();
    var tx = await nft.safeMint(owner.address);
    
    logger.info(`Next NFT Minted ID: ${nextTokenId.toString()}, Owner of NFT: ${owner.address}, Hash location of Minted NFT: ${tx.hash}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
