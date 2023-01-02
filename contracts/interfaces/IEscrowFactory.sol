// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
interface IEscrowFactory {
    function createEscrow(address _arbiter,address _beneficiary) external payable;
    function getEscrows() external view returns(address[] memory);
      function removeEscrow(address _escrow) external;
}