// const { ArgentAccount } = require( "hardhat/types");
const { starknet, ethers } = require("hardhat");
const { ArgentAccount, OpenZeppelinAccount } = require("@shardlabs/starknet-hardhat-plugin/dist/src/account");
const { iterativelyCheckStatus } = require("@shardlabs/starknet-hardhat-plugin/dist/src/types");
const { expect } = require("chai");
const fs = require('fs');
const ERC721_name = starknet.shortStringToBigInt('Carlos');
const ERC721_symbol = starknet.shortStringToBigInt('CAR');
const tokenDecimals = ethers.utils.parseUnits('1');
let cAccount,cAccount0,cAccount1, cVault, cNFT, cDummyToken;

const feltToString = (val) => {
    return starknet.bigIntToShortString(val);
}
const stringToFelt = (val) => {
    return starknet.shortStringToBigInt(val);
}

const increaseTime = async (timestamp) => {
    await starknet.devnet.increaseTime(timestamp);
    await cAccount.invoke(cVault,'dummy_invoke');
    return
}
const main = async () =>{
    starknet.devnet.restart();
    console.log('deploying accounts');
    cAccount = await starknet.deployAccount('OpenZeppelin');
    cAccount0 = await starknet.deployAccount('OpenZeppelin');
    cAccount1 = await starknet.deployAccount('OpenZeppelin');
    console.log('deploying contracts');

    const cfDummyToken = await starknet.getContractFactory('dummy_token');
    cDummyToken = await cfDummyToken.deploy({
    name : '323287074983686041199982', 
    symbol: '4478027', 
    initial_supply : {low : 0n , high : 100000000000000000000n}, 
    recipient : BigInt (cAccount.address)
    });
    const cfVault = await starknet.getContractFactory('Vault');
    cVault = await cfVault.deploy({
    _owner : BigInt(cAccount.address),
    _token_address : BigInt(cDummyToken.address)
    });

    const cfNFt = await starknet.getContractFactory('ERC721X');
    cNFT = await cfNFt.deploy({
      name : stringToFelt('Meetup in London'),
      vault : BigInt(cAccount.address), // here owner is the account but must change to vault
      creator : BigInt(cAccount.address),
      base_token_uri : [stringToFelt('emerson'), stringToFelt('ramos')],
      token_uri_suffix : stringToFelt('none')
    })

    const contract_addresses = {

        DummyToken : cDummyToken.address,
        Vault : cVault.address,
        cNFT : cNFT.address
    }
    console.log(contract_addresses);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});