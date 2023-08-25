import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppConfigService } from '@config/app-config.service';
import { ethers } from 'ethers';
import { Blockchains, ERC20Tokens } from '@constants';
import erc20abi from './abi/erc20.json';
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

    async getERC20Balance(blockchain: Blockchains, erc20token: ERC20Tokens, address: string) {
        const providerUrl = this.providers[blockchain];

        if (!providerUrl) {
            throw new HttpException(
                'The requested blockchain provider is not available at the moment.',
                HttpStatus.NOT_FOUND,
            );
        }

        const provider = new ethers.JsonRpcProvider(providerUrl);

        const contract = new ethers.Contract(
            '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            erc20abi,
            provider,
        );

        return contract.balanceOf(address);
    }
}
