// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./interfaces/IEscrowFactory.sol";


error ESCROW__NotDepositor();
error ESCROW__NotBeneficiary();
error ESCROW__NotArbiterOrDepositor();

contract Escrow {
    event Approved(address indexed approver, uint256 amount);
    event IssueRaised(string reason);
    event IssueResolved();
    event Withdrawn(address beneficiary, uint256 amount);

    address public immutable depositor;
    address public immutable beneficiary;
    address public immutable arbiter;

    address public immutable escrowContractFactory;

    bool public isApproved;
    bool public haveIssue;
    bool public isIssueRaised;
    uint232 public amountToWithdraw;
    string public issueReason;

    constructor(address _arbiter, address _beneficiary) payable {
        depositor = tx.origin;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        escrowContractFactory = msg.sender;
    }

    modifier onlyDepositer() {
        if(msg.sender != depositor)
            revert ESCROW__NotDepositor();
        _;
    }
    modifier onlyBeneficiary() {
        if(msg.sender != beneficiary)
            revert ESCROW__NotBeneficiary();
        _;
    }
    modifier onlyArbiterOrDepositor() {
        if(msg.sender != arbiter || msg.sender != depositor) 
            revert ESCROW__NotArbiterOrDepositor();
        _;
    }

    function approve() external onlyArbiterOrDepositor {
        require(haveIssue == false, "Issue is raised cannot approve");
        require(isApproved == false, "Already approved");
        if (msg.sender == arbiter) {
            require(
                isIssueRaised == true,
                "Arbiter cannot approve if issue is not raised"
            );
        }
        uint256 balance = address(this).balance;
        amountToWithdraw = uint232(balance);
        isApproved = true;
        emit Approved(msg.sender, balance);
    }

    function raiseIssue(string memory reason) external onlyDepositer {
        require(bytes(reason).length > 0, "No reason given");
        haveIssue = true;
        isIssueRaised = true;
        issueReason = reason;
        emit IssueRaised(reason);
    }

    function resolveIssue() external onlyArbiterOrDepositor {
        require(haveIssue, "Issue is not raised");
        haveIssue = false;
        issueReason = "";
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
        IEscrowFactory(escrowContractFactory).removeEscrow(address(this));
        selfdestruct(payable(depositor));
    }

    receive() external payable {}

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

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
