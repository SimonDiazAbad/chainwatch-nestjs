import { Injectable } from '@nestjs/common';
// we import ethers
import { ethers } from 'ethers';

@Injectable()
export class EvmBalanceService {
    getEthBalance(address: string) {
        const provider = ethers.getDefaultProvider('mainnet');

        return provider.getBalance(address);
    }
}
