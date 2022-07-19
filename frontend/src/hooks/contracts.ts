import { useContract } from '@starknet-react/core';
import { Abi } from 'starknet';

import DummyTokenAbi from '../abi/dummy_token_abi.json';
import VaultAbi from '../abi/Vault_abi.json';
import ERC721XAbi from '../abi/ERC721X_abi.json';

export function useDummyTokenContract() {
  return useContract({
    abi: DummyTokenAbi as Abi,
    address:
      '0x02fec52d16817eb51a209c27d28fac83cf843a4764437b295182d604ef34171d',
  });
}

export function useVaultContract() {
  return useContract({
    abi: VaultAbi as Abi,
    address:
      '0x044b74640e494f923d756823c2a46c5b96f46c11d71ed659e3796f02b747d9c4',
  });
}

export function useNFTContract() {
  return useContract({
    abi: ERC721XAbi as Abi,
    address:
      '0x06e68ba05a4bcc535cb58755302c16d32d671a6b65b83a98db64affbba638f59',
  });
}
