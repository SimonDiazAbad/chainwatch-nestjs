import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Blockchains } from '@constants';

@Injectable()
export class AppConfigService {
    readonly providers = {};

    constructor(private configService: ConfigService) {
        // TODO: add fallback providers when one is no defined in the .env
        this.providers[Blockchains.ETH] = this.configService.get<string>('ETH_PROVIDER');
    }
}
