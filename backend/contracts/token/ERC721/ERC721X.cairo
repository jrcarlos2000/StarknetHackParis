%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.starknet.common.syscalls import get_contract_address, get_caller_address
from contracts.token.ERC721.ERC721_base import (
    ERC721_name, ERC721_symbol, ERC721_balanceOf, ERC721_ownerOf, ERC721_getApproved,
    ERC721_isApprovedForAll, ERC721_mint, ERC721_burn, ERC721_initializer, ERC721_approve,
    ERC721_setApprovalForAll, ERC721_transferFrom, ERC721_safeTransferFrom)
from contracts.token.ERC20.IERC20 import IERC20
from starkware.cairo.common.math import (assert_not_zero, assert_in_range, assert_le, unsigned_div_rem, assert_not_equal)
from starkware.cairo.common.uint256 import (
    Uint256,
    uint256_add,
    uint256_sub,
    uint256_le,
    uint256_lt,
    uint256_check,
    uint256_eq,
)
from contracts.token.ERC721.ERC721_Metadata_base import (
    ERC721_Metadata_initializer,
    ERC721_Metadata_tokenURI,
    ERC721_Metadata_setBaseTokenURI,
)
from contracts.utils.Ownable_base import (
    Ownable_initializer,
    Ownable_only_owner,
    Ownable_get_owner,
    Ownable_transfer_ownership
)

@storage_var
func id_counter_storage() -> (id_counter : Uint256):
end
@storage_var
func creator_storage() -> (address : felt):
end

@storage_var
func address_has_minted(address : felt) -> (has_minted : felt):
end

@constructor
func constructor{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }(name: felt, vault: felt, creator : felt, base_token_uri_len: felt, base_token_uri: felt*, token_uri_suffix: felt):
    ERC721_initializer(name, name)
    ERC721_Metadata_initializer()
    Ownable_initializer(vault)
    ERC721_Metadata_setBaseTokenURI(base_token_uri_len, base_token_uri, token_uri_suffix)
    internal_mint(creator)
    creator_storage.write(creator)
    return ()
end

@view
func getOwner{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }() -> (owner: felt):
    let (owner) = Ownable_get_owner()
    return (owner=owner)
end

@view
func getCreator{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }() -> (creator: felt):
    let (creator) = creator_storage.read()
    return (creator=creator)
end

@view
func name{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }() -> (name: felt):
    let (name) = ERC721_name()
    return (name)
end

@view
func balanceOf{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }(owner: felt) -> (balance: Uint256):
    let (balance: Uint256) = ERC721_balanceOf(owner)
    return (balance)
end

@view
func ownerOf{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }(token_id: Uint256) -> (owner: felt):
    let (owner: felt) = ERC721_ownerOf(token_id)
    return (owner)
end

@view
func tokenURI{
        syscall_ptr: felt*,
        pedersen_ptr: HashBuiltin*,
        range_check_ptr
    }() -> (token_uri_len: felt, token_uri: felt*):
    let (token_uri_len, token_uri) = ERC721_Metadata_tokenURI(Uint256(1,0))
    return (token_uri_len=token_uri_len, token_uri=token_uri)
end

@external
func mint{
        pedersen_ptr: HashBuiltin*,
        syscall_ptr: felt*,
        range_check_ptr
    }(to: felt):
    Ownable_only_owner()
    let (has_minted) = address_has_minted.read(to)
    assert_not_equal(has_minted,1)
    internal_mint(to)
    return ()
end

@external
func burn{
        pedersen_ptr: HashBuiltin*,
        syscall_ptr: felt*,
        range_check_ptr
    }(token_id: Uint256):
    Ownable_only_owner()
    ERC721_burn(token_id)
    return ()
end

func internal_mint{pedersen_ptr : HashBuiltin*, syscall_ptr : felt*, range_check_ptr}(
      _to : felt) -> (token_id : Uint256):
    alloc_locals
    let to = _to
    let (id_counter : Uint256) = id_counter_storage.read()
    let one_as_uint256 : Uint256 = Uint256(1,0)
    let (new_id_counter , _) = uint256_add(id_counter,one_as_uint256)
    id_counter_storage.write(new_id_counter)
    ERC721_mint(to,new_id_counter)
    address_has_minted.write(to,1)
    tempvar syscall_ptr = syscall_ptr
    tempvar pedersen_ptr = pedersen_ptr
    tempvar range_check_ptr = range_check_ptr
    return (new_id_counter)
end