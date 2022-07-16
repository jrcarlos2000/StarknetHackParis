%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.starknet.common.syscalls import get_caller_address
from contracts.utils.Ownable_base import (
    Ownable_initializer,
    Ownable_only_owner,
    Ownable_get_owner,
    Ownable_transfer_ownership
)
from starkware.cairo.common.math import (assert_not_zero)
from starkware.cairo.common.uint256 import (
    Uint256,
    uint256_add,
    uint256_sub,
    uint256_le,
    uint256_lt,
    uint256_check,
    uint256_eq,
)
from contracts.token.ERC721.IERC721X import IERC721X
from contracts.token.ERC20.IERC20 import IERC20
# for simplicity we only support IPFS hash codes which are usually 32 bytes

struct user_core:
    member prefix : felt 
    member suffix : felt
end 

struct event_core:
    member prefix : felt
    member suffix : felt
    member owner_address : felt
    member stake : Uint256
end
@storage_var
func event_counter_storage() -> (id : Uint256):
end
@storage_var
func event_storage(event_id : Uint256) -> (event : event_core):
end
@storage_var
func user_storage(user_address : felt) -> (user_uri : user_core):
end
@storage_var
func event_counter_for_address(user_address : felt) -> (id : felt):
end
@storage_var
func event_for_index_for_address(user_address : felt, id : Uint256) -> (id : felt):
end
@storage_var
func is_host_registered(address : felt) -> (is_registered : felt):
end
@storage_var
func token_storage() -> (address : felt):
end
@storage_var
func is_user_registerd_in_event(event_id : Uint256, address : felt) -> (is_registered : felt):
end

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    _owner : felt, _token_address : felt):
    token_storage.write(_token_address)
    Ownable_initializer(_owner)
    return ()
end
@view
func get_event{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    event_id : Uint256) -> (event : event_core):
    let (event) = event_storage.read(event_id)
    return (event)
end
@external
func register_as_host{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    info_uri_prefix : felt, info_uri_suffix : felt):
    let (sender_address) = get_caller_address()
    let (is_registered) = is_host_registered.read(sender_address)
    assert is_registered = 0
    is_host_registered.write(sender_address,1)
    let user_instance = user_core(
        prefix=info_uri_prefix,
        suffix=info_uri_suffix
    )
    user_storage.write(sender_address,user_instance)
    return ()
end 
@external
func launch_event{pedersen_ptr : HashBuiltin*, syscall_ptr : felt*, range_check_ptr}(
    _event_uri_preffix : felt, _event_uri_suffix : felt, _stake : Uint256, ERC721_address : felt) -> (event_id : Uint256):

    alloc_locals
    let (sender_address) = get_caller_address()
    _is_owner_of_ERC721(sender_address,ERC721_address)
    
    let (is_registered) = is_host_registered.read(sender_address)
    assert_not_zero(is_registered)

    let (event_id : Uint256) = event_counter_storage.read()
    let one_as_uint256 : Uint256 = Uint256(1,0)
    let (new_id,_) = uint256_add(event_id,one_as_uint256)
    let event_instance = event_core(
        prefix=_event_uri_preffix,
        suffix=_event_uri_suffix,
        owner_address=sender_address,
        stake=_stake    
    )
    tempvar syscall_ptr = syscall_ptr
    tempvar pedersen_ptr = pedersen_ptr
    tempvar range_check_ptr = range_check_ptr
    event_storage.write(new_id,event_instance)
    event_counter_storage.write(new_id)
    return(new_id)

end

@external
func attend{pedersen_ptr : HashBuiltin*, syscall_ptr : felt*, range_check_ptr}(
    _event_id : Uint256):

    alloc_locals
    let event_id = _event_id
    let (sender_address) = get_caller_address()
    let (token_address) = token_storage.read()
    let (event_read) = event_storage.read(event_id)
    let (user_balance_256) = IERC20.balanceOf(contract_address = token_address, account = sender_address)
    let (is_equal) = uint256_eq(user_balance_256,event_read.stake)
    is_user_registerd_in_event.write(event_id,sender_address,1)
    tempvar syscall_ptr = syscall_ptr
    tempvar pedersen_ptr = pedersen_ptr
    tempvar range_check_ptr = range_check_ptr
    assert is_equal = 1
    return ()
end

# func launch_event{pedersen_ptr : HashBuiltin, syscall_ptr : felt*, range_check_ptr}(
#     _event_uri_preffix : felt, _event_uri_suffix : felt, _user_uri_preffix : felt, _user_uri_suffix : felt, _stake : Uint256) -> (event_id : felt):
# end

func _is_owner_of_ERC721{pedersen_ptr : HashBuiltin*, syscall_ptr : felt*, range_check_ptr}(
    owner : felt, address : felt):
    let (creator) = IERC721X.getCreator(contract_address=address)
    assert owner = creator
    return ()
end
