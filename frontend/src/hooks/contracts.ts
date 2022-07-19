import { useContract } from '@starknet-react/core';
import { Abi } from 'starknet';

import DummyTokenAbi from '../abi/dummy_token_abi.json';
import VaultAbi from '../abi/Vault_abi.json';
import ERC721XAbi from '../abi/ERC721X_abi.json';

export function useDummyTokenContract() {
  return useContract({
    abi: DummyTokenAbi as Abi,
    address:
      '0x00b0b58b110e22f06f1427414f508c1c424fa2535cb3b6ee187c77f1646030c4',
  });
}

export function useVaultContract() {
  return useContract({
    abi: VaultAbi as Abi,
    address:
      '0x03f02c98e4f452fe3d1734ecb754e2f6899fe735df6ad115af5ddce94a63c799',
  });
}

export function useNFTContract() {
  return useContract({
    abi: ERC721XAbi as Abi,
    address:
      '0x03c16ee9c4ae82a6cff7ea7569d2fe73d21bbff303e3c88bdb7e9dd289dbd0cb',
  });
}
