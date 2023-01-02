# Escrow Contract

This is a simple escrow contract that allows a depositor to transfer funds to a beneficiary, with the option to involve an arbiter to resolve any issues that may arise. The contract is self-destructing, meaning that it will be deleted from the blockchain once the funds have been successfully withdrawn by the beneficiary.

## Features

-   The depositor can transfer funds to the contract upon deployment.
-   The beneficiary can withdraw the funds after they have been approved by either the depositor or the arbiter.
-   The depositor can raise an issue with the transaction, which must be resolved by the arbiter or depositor himself before the funds can be withdrawn.
-   After a succesfull withdrawl by beneficiary the contract is self-destructed and reward is sent to depositor

## Events

The contract includes the following events:

-   `Approved(address indexed approver, uint amount)`: Emitted when the funds are approved for withdrawal by either the depositor or the arbiter.
-   `IssueRaised()`: Emitted when the depositor raises an issue with the transaction.
-   `IssueResolved()`: Emitted when the arbiter resolves the issue raised by the depositor.
-   `Withdrawn(address beneficiary, uint amount)`: Emitted when the beneficiary successfully withdraws the funds.

## Modifiers

The contract uses the following modifiers to control access to its functions:

-   `onlyDepositer`: Allows only the depositor to call the function.
-   `onlyBeneficiary`: Allows only

## Getters

The contract provides the following getter functions:

-   `getDepositor()`: Returns the address of the depositor.
-   `getBeneficiary()`: Returns the address of the beneficiary.
-   `getArbiter()`: Returns the address of the arbiter.
-   `getBalance()`: Returns the current balance of the contract.

## Improvement To-do

This is just an simple implementation of the raw idea, still tons of improvement is need to be done

-   Allow beneficiary to raise an issue
-   Allow user to put the reasonString when raising an issue so it can be more clear what the issue is about
-   create subgraph for event indexing(Faster retrival)
-   incentivize user with tokens on successfull deal

## License

This contract is licensed under the MIT License.

## Feel free to send PR with whatever new idea you have
