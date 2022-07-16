# How to Run

For simplicity I have pulled a docker image from [devnet](https://github.com/Shard-Labs/starknet-devnet) and use it on my m1 mac

## Steps to follow

```
npm install 
```
```
docker-compose up 
```

```
yarn compile
```

```
npx hardhat test
```
## About the environment 

This works with devnet version : `0.2.2-arm`  ->  docker image config
this works with cairo-lang version : `0.8.1-arm` -> set in hardhat config.
## Difficulties

Transactions take long to load in devnet
