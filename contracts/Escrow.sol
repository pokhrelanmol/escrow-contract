// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./interfaces/IEscrowFactory.sol";
contract Escrow {
    event Approved(address indexed approver, uint amount);
    event IssueRaised();
    event IssueResolved();
    event Withdrawn(address beneficiary, uint amount);

    address public immutable depositor;
    address public immutable beneficiary;
    address public immutable  arbiter;

    address public constant ESCROW_FACTORY_ADDRESS = 0x5FbDB2315678afecb367f032d93F642f64180aa3;

    bool public isApproved;
    bool public haveIssue;
    bool public isIssueRaised;
    uint232 public amountToWithdraw;
    

    constructor(address _arbiter, address _beneficiary) payable {
        depositor = tx.origin;
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
        require(haveIssue == false, "Issue is raised cannot approve");
        require(isApproved == false, "Already approved");
        if(msg.sender == arbiter){
            require(isIssueRaised == true, "Arbiter cannot approve if issue is not raised");
        }
        uint balance = address(this).balance;
        amountToWithdraw = uint232(balance);
        isApproved = true;
        emit Approved(msg.sender, balance);
    }

    function raiseIssue() external onlyDepositer {
        haveIssue = true;
        isIssueRaised = true;
        emit IssueRaised();
    }

    function resolveIssue() external onlyArbiterOrDepositor {
        require(haveIssue,"Issue is not raised");
        haveIssue = false;
        emit IssueResolved();
    }

    function withdraw() external onlyBeneficiary {
        require(isApproved == true, "Not approved");
        require(haveIssue == false, "Issue is raised cannot withdraw");
        require(msg.sender == beneficiary, "Only beneficiary can withdraw");
        require(amountToWithdraw > 0, "Nothing to withdraw");
        (bool success, ) = payable(beneficiary).call{value: amountToWithdraw}(
            ""
        );
        require(success, "Transfer failed");
        amountToWithdraw = 0;
        emit Withdrawn(beneficiary, amountToWithdraw);
        IEscrowFactory(ESCROW_FACTORY_ADDRESS).removeEscrow(address(this));
        selfdestruct(payable(depositor));
       

    }
    receive() external payable {
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
