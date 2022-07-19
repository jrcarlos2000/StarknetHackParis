import { useContract } from '@starknet-react/core';
import { Abi } from 'starknet';

import DummyTokenAbi from '../abi/dummy_token_abi.json';
import VaultAbi from '../abi/Vault_abi.json';
import ERC721XAbi from '../abi/ERC721X_abi.json';

export function useDummyTokenContract() {
  return useContract({
    abi: DummyTokenAbi as Abi,
    address:
      '0x0531dd2116258fd980bce43ade3024a2094a61c19db9b42c1c391ea5db1d1036',
  });
}

export function useVaultContract() {
  return useContract({
    abi: VaultAbi as Abi,
    address:
      '0x0275eb86c3f0ab2fcd1819a86d598e17d078b2865d261f7f3380f31666c4863e',
  });
}

export function useNFTContract() {
  return useContract({
    abi: ERC721XAbi as Abi,
    address:
      '0x034cce1fc5795e6f5cb894f1f9f87b744d91233b81d662371fe52506a397714f',
  });
}
