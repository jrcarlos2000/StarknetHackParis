// const { ArgentAccount } = require( "hardhat/types");
const { starknet, ethers } = require("hardhat");
const { ArgentAccount, OpenZeppelinAccount } = require("@shardlabs/starknet-hardhat-plugin/dist/src/account");
const { iterativelyCheckStatus } = require("@shardlabs/starknet-hardhat-plugin/dist/src/types");
const { expect } = require("chai");

const ERC721_name = starknet.shortStringToBigInt('Carlos');
const ERC721_symbol = starknet.shortStringToBigInt('CAR');
const tokenDecimals = ethers.utils.parseUnits('1');
let cAccount, cVault, cNFT, cDummyToken;

const feltToString = (val) => {
  return starknet.bigIntToShortString(val);
}
const stringToFelt = (val) => {
  return starknet.shortStringToBigInt(val);
}

describe("Testing", function () {

  this.timeout(1000_000);
  starknet.devnet.restart();
  
  it("should deploy accounts", async function () {
    cAccount = await starknet.deployAccount('OpenZeppelin');
    cAccount0 = await starknet.deployAccount('OpenZeppelin');
    cAccount1 = await starknet.deployAccount('OpenZeppelin');
  })

  it("should deploy core contracts", async function () {

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
  })

  it('balance check after deployment',async () => {
    const balance = (await cNFT.call('balanceOf',{
      owner : BigInt(cAccount.address)
    }))['balance'];
    expect(balance.low).to.equal(1n);
  })

  it('owner can mint NFTs', async function () {

    await cAccount.invoke(cNFT,'mint',{
      to : BigInt(cAccount0.address)
    })
    const balance0 = (await cNFT.call('balanceOf',{
      owner : BigInt(cAccount0.address)
    }))['balance'];
    expect(balance0.low).to.equal(1n);

  })

  it('NFT cant be minted twice', async function () {

    let error = false;

    try {
      await cAccount.call(cNFT,'mint',{
        to : BigInt(cAccount0.address)
      });
    } catch (e) {
      error = true
    }
    expect(error).to.equal(true);

  })

  it("cant launch event if not a host", async function (){

    let error = false
    try {
      await cAccount.call(cVault,'launch_event',{
        _event_uri_preffix : starknet.shortStringToBigInt('Hola'), 
        _event_uri_suffix : starknet.shortStringToBigInt('Emerson'),
        _stake : {low: 10000n, high : 0n},
        ERC721_address : BigInt(cNFT.address)
      });
    }catch (e){
      error = true
    }
    expect(error).to.equal(true);
  })

  it("registered host can launch event", async function (){

    await cAccount.invoke(cVault,'register_as_host',{
      info_uri_prefix : stringToFelt('Hola'),
      info_uri_suffix : stringToFelt('Hola')
    });

    await cAccount.invoke(cVault,'launch_event',{
      _event_uri_preffix : stringToFelt('Hola'), 
      _event_uri_suffix : stringToFelt('Emerson'),
      _stake : {low: 10000n, high : 0n},
      ERC721_address : BigInt(cNFT.address)
    });
  })

})