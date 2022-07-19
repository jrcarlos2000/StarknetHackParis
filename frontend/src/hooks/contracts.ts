import { useContract } from '@starknet-react/core';
import { Abi } from 'starknet';

import DummyTokenAbi from '../abi/dummy_token_abi.json';
import VaultAbi from '../abi/Vault_abi.json';
import ERC721XAbi from '../abi/ERC721X_abi.json';

export function useDummyTokenContract() {
  return useContract({
    abi: DummyTokenAbi as Abi,
    address:
      '0x00bf60057d43d218c87c38dbedb69ab9762cab17961645f84f172f078a1326f9',
  });
}

export function useVaultContract() {
  return useContract({
    abi: VaultAbi as Abi,
    address:
      '0x047d1f51b6fd8e6019e42b51c5b265480c197cd4bda7b0fcc7ee0b39ac845d79',
  });
}

export function useNFTContract() {
  return useContract({
    abi: ERC721XAbi as Abi,
    address:
      '0x010f6e7d81a4edf96411a02543ce7a3254f6ca1b0956aaa67dfcf916309a2950',
  });
}
