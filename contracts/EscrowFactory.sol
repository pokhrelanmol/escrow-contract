// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Escrow.sol";
import "hardhat/console.sol";

contract EscrowFactory {
      event EscrowCreated(address newEscrow);
      address[] public escrows;
       
      /**
      * @dev Creates a new escrow contract and sends the ether to it
      * @param _arbiter The address of the arbiter
      * @param _beneficiary The address of the beneficiary

       */ 
     function createEscrow(address _arbiter, address _beneficiary) external payable {
            Escrow _newEscrow= new Escrow(_arbiter, _beneficiary);
            (bool success, ) = payable(address(_newEscrow)).call{value:msg.value}("");
            require(success,"Failed to send ether to escrow");
            escrows.push(address(_newEscrow));
            emit EscrowCreated(address(_newEscrow));
      }
        
      function getEscrows() external view returns (address[] memory) {
            return escrows;
      }
      function removeEscrow(address _escrow) external {
            uint index = 0;
            for(uint i = 0; i < escrows.length; i++) {
                  if(escrows[i] == _escrow) {
                        index = i;
                        break;
                  }
            }
            escrows[index] = escrows[escrows.length - 1];
            escrows.pop();
      }
      
}