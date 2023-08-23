import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/modules/app-config/app-config.service';
import { ethers } from 'ethers';

@Injectable()
export class EvmBalanceService {
    readonly providers;
    constructor(private appConfigService: AppConfigService) {
        this.providers = this.appConfigService.providers;
    }

    getBalance(blockchain: string, address: string) {
        // const provider = new ethers.providers.JsonRpcProvider(url);
        const provider = new ethers.JsonRpcProvider(this.providers[blockchain]);

        return provider.getBalance(address);
    }
}
