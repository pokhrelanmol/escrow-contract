// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Escrow {
    event Approved(address approver, uint amount);
    event IssueRaised();
    event IssueResolved();
    address public depositor;
    address public beneficiary;
    address public arbiter;
    bool public isApproved;
    bool public isIssueRaised;
    uint public amountToWithdraw;

    constructor(address _arbiter, address _beneficiary) payable {
        depositor = msg.sender;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
    }

    modifier onlyDepositer() {
        require(msg.sender == depositor, "Only depositor can raise issue");
        _;
    }
    modifier onlyBeneficiary() {
        require(msg.sender == beneficiary, "Only beneficiary can withdraw");
        _;
    }
    modifier onlyArbiterOrDepositor() {
        require(
            msg.sender == arbiter || msg.sender == depositor,
            "Only arbiter or depositor can take this action"
        );
        _;
    }

    function approve() external onlyArbiterOrDepositor {
        require(isIssueRaised == false, "Issue is raised cannot approve");
        require(isApproved == false, "Already approved");

        uint balance = address(this).balance;
        amountToWithdraw = balance;
        isApproved = true;
        emit Approved(msg.sender, balance);
    }

    function raiseIssue() external onlyDepositer {
        isIssueRaised = true;
        emit IssueRaised();
    }

    function resolveIssueAndApproveFund() external onlyArbiterOrDepositor {
        isIssueRaised = false;
        isApproved = true;
        amountToWithdraw = address(this).balance;
        emit IssueResolved();
        emit Approved(msg.sender, amountToWithdraw);
    }

    function withdraw() external onlyBeneficiary {
        require(isApproved == true, "Not approved");
        require(isIssueRaised == false, "Issue is raised cannot withdraw");
        require(msg.sender == beneficiary, "Only beneficiary can withdraw");
        (bool success, ) = payable(beneficiary).call{value: amountToWithdraw}(
            ""
        );
        require(success, "Transfer failed");
        amountToWithdraw = 0;
    }

    /***********
     * GETTERS *
     ***********/

    function getDepositor() public view returns (address) {
        return depositor;
    }

    function getBeneficiary() public view returns (address) {
        return beneficiary;
    }

    function getArbiter() public view returns (address) {
        return arbiter;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
