import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppConfigService } from '@config/app-config.service';
import { ethers } from 'ethers';
import { Blockchains } from '@constants';

@Injectable()
export class EvmBalanceService {
    readonly providers;

    constructor(private appConfigService: AppConfigService) {
        this.providers = this.appConfigService.providers;
    }

    getNativeBalance(blockchain: Blockchains, address: string) {
        const providerUrl = this.providers[blockchain];

        if (!providerUrl) {
            throw new HttpException(
                'The requested blockchain provider is not available at the moment.',
                HttpStatus.NOT_FOUND,
            );
        }

        const provider = new ethers.JsonRpcProvider(providerUrl);

        return provider.getBalance(address);
    }

    getERC20Balance() {}
}
