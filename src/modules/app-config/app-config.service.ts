import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Blockchains, ERC20Tokens } from '@constants';

@Injectable()
export class AppConfigService {
    readonly providers = {};
    readonly erc20TokenAddress = {};

    constructor(private configService: ConfigService) {
        // TODO: add fallback providers when one is no defined in the .env
        this.providers[Blockchains.ETH] = this.configService.get<string>('ETH_PROVIDER');

        this.erc20TokenAddress[Blockchains.ETH] = {};
        this.erc20TokenAddress[Blockchains.ETH][ERC20Tokens.USDT] =
            '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    }
}
