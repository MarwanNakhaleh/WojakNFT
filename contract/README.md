# NFT minter

One important non-gimmicky use case for NFTs is membership or access passes.

I went through the first cohort of [NFT14](https://nft14.xyz) to learn basic NFT creation and transfer at a high level. I used [Canva](https://canva.com) to create the backgrounds and accessories for the Wojak NFT.

Next, I used a tool called [nft-art-generator](https://github.com/NotLuksus/nft-art-generator) to create the composite images and necessary NFT metadata from all the different backgrounds and accessories. I then uploaded those assets to [Pinata](https://app.pinata.cloud) to have access to them from decentralized cloud storage.

After that, I created the smart contract, largely with the help of [OpenZeppelin Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard). I attached the metadata Pinata URL to the base URI for the contract.

Finally, I used Javascript and Hardhat to create scripts to mint the NFTs and be able to transfer them from address to address. One other neat thing, I learned about a logger called [winston](https://www.npmjs.com/package/winston#quick-start) that really easily creates and stores nice pretty log messages.