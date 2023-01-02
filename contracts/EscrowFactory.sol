// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Escrow.sol";
import "hardhat/console.sol";

contract EscrowFactory {
      event EscrowCreated(address newEscrow);

      address[] public escrows;

      
  
      function createEscrow(address _arbiter, address _beneficiary) external payable {
            Escrow _newEscrow= new Escrow(_arbiter, _beneficiary);
            (bool success, ) = payable(address(_newEscrow)).call{value:msg.value}("");  //why is this not working?
            require(success,"Failed to send ether to escrow");
            escrows.push(address(_newEscrow));
            emit EscrowCreated(address(_newEscrow));
      }
        
      function getEscrows() external view returns (address[] memory) {
            return escrows;
      }
      
}