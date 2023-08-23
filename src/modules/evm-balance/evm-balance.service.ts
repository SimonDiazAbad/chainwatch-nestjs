import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// we import ethers
import { ethers } from 'ethers';

@Injectable()
export class EvmBalanceService {
    providers;
    constructor(private configService: ConfigService) {
        // TODO: move this to a config file
        this.configService.get<string>('ETH_PROVIDER');
        this.configService.get<string>('MATIC_PROVIDER');
        this.configService.get<string>('BSC_PROVIDER');
    }

    getEthBalance(address: string) {
        const provider = ethers.getDefaultProvider('mainnet');
        return provider.getBalance(address);
    }

    // getBalance(blockchain: string, address: string) {
    //     const provider = getProvider(blockchain);

    //     return provider.getBalance(address);
    // }

    getProvider(blockchain: string) {
        // TODO: implement this in a better way
    }
}
