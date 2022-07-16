%lang starknet

# from starkware.cairo.common.uint256 import Uint256


@contract_interface
namespace IERC721X:
    func mint(to : felt):
    end
    func getCreator() -> (creator : felt):
    end

end