import { ethers } from 'ethers';

export function mockProviderGetBalance(balance = 5000) {
    ethers.JsonRpcProvider.prototype.getBalance = jest.fn().mockResolvedValue(BigInt(balance));
}
