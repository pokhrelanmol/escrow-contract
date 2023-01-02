import { expect } from "chai";
import { ethers } from "hardhat";

describe("EscrowFactory", function () {
    async function deployEscrowFactory() {
        const [depositor, arbiter, beneficiary] = await ethers.getSigners();
        const amount = ethers.utils.parseEther("1");
        const factory = await ethers.getContractFactory("EscrowFactory");
        const contract = await factory.deploy();
        contract.deployed();

        return { contract, depositor, arbiter, beneficiary, amount };
    }
    it("should give empty list if escrow is not created", async function () {
        const { contract } = await deployEscrowFactory();
        const escrows = await contract.getEscrows();
        expect(escrows.length).to.equal(0);
    });

    it("Should create an escrow and add balance", async function () {
        const { contract, arbiter, beneficiary, amount } =
            await deployEscrowFactory();
        const escrowContract = await contract.createEscrow(
            arbiter.address,
            beneficiary.address,
            {
                value: amount,
            }
        );
        await expect(escrowContract).to.emit(contract, "EscrowCreated");
        const escrows = await contract.getEscrows();
        expect(escrows.length).to.equal(1);
    });
});
