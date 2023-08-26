import { ethers } from 'ethers';

export function mockProviderGetBalance(balance = 5000) {
    ethers.JsonRpcProvider.prototype.getBalance = jest.fn().mockResolvedValue(BigInt(balance));
}

export function mockGetERC20Balance(balance = 5000) {
    // Create a dummy class for our mock
    class MockContract {
        balanceOf: any;

        constructor() {
            this.balanceOf = jest.fn().mockResolvedValue(BigInt(balance));
        }
    }

    function mockContractFactory() {
        return new MockContract();
    }

    jest.spyOn(ethers, 'Contract').mockImplementation(mockContractFactory as any);
}
