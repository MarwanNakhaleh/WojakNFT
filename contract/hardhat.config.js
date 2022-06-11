require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const { task } = require("hardhat/config");
const winston = require('winston');

async function mintNft(address) {
  //logging
  const logConfiguration = {
    'transports': [
      new winston.transports.Console(),
      new winston.transports.File({
          filename: 'logs/tasks.log'
      })
  ]
  };
  const logger = winston.createLogger(logConfiguration);

  const NFT = await hre.ethers.getContractFactory("Wojak");
  const nft = await NFT.attach(process.env.RINKEBY_NFT);

  logger.info(`NFT deployed to: ${nft.address}`);

  //Mint token
  var nextTokenId = await nft.totalSupply();
  var tx = await nft.safeMint(address);
  
  logger.info(`Next NFT Minted ID: ${nextTokenId.toString()}, Owner of NFT: ${address}, Hash location of Minted NFT: ${tx.hash}`);
}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("mintOwner", "Mint Wojak NFT to another address")
  .setAction(async () => {
    const [owner] = await hre.ethers.getSigners();
    await mintNft(owner.address)
  })


task("mintAddress", "Mint Wojak NFT to another address")
  .addParam("account", "the account that should receive the token")
  .setAction(async (taskArgs) => {
    await mintNft(taskArgs.account)
  })

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: process.env.ALCHEMY_HTTP_RINKEBY,
      accounts: [process.env.DEPLOYER_PK]
    }
  }
};
