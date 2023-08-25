import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppConfigService } from '@config/app-config.service';
import { ethers } from 'ethers';

@Injectable()
export class EvmBalanceService {
    readonly providers;
    constructor(private appConfigService: AppConfigService) {
        this.providers = this.appConfigService.providers;
    }

    getBalance(blockchain: string, address: string) {
        const providerUrl = this.providers[blockchain];

        if (!providerUrl) {
            throw new HttpException(
                `Provider for ${blockchain} not defined`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        const provider = new ethers.JsonRpcProvider(providerUrl);

        return provider.getBalance(address);
    }
}
