import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppConfigService } from '@config/app-config.service';
import { ethers } from 'ethers';
import { Blockchains, ERC20Tokens } from '@constants';
import erc20abi from './abi/erc20.json';
@Injectable()
export class EvmBalanceService {
    readonly providers;
    readonly tokenAddress;

    constructor(private appConfigService: AppConfigService) {
        this.providers = this.appConfigService.providers;
        this.tokenAddress = this.appConfigService.erc20TokenAddress;
    }

    getNativeBalance(blockchain: Blockchains, address: string) {
        const provider = this.getProvider(blockchain);

        return provider.getBalance(address);
    }

    getERC20Balance(blockchain: Blockchains, erc20token: ERC20Tokens, address: string) {
        const provider = this.getProvider(blockchain);
        const tokenAddress = this.getERC20TokenAddress(blockchain, erc20token);

        const contract = new ethers.Contract(tokenAddress, erc20abi, provider);

        return contract.balanceOf(address);
    }

    getProvider(blockchain: Blockchains) {
        const providerUrl = this.providers[blockchain];

        if (!providerUrl) {
            throw new HttpException(
                'The requested blockchain provider is not available at the moment.',
                HttpStatus.NOT_FOUND,
            );
        }

        const provider = new ethers.JsonRpcProvider(providerUrl);

        return provider;
    }

    getERC20TokenAddress(blockchain: Blockchains, erc20token: ERC20Tokens) {
        const tokenAddress = this.tokenAddress[blockchain][erc20token];

        if (!tokenAddress) {
            throw new HttpException(
                'The requested ERC20 token is not available at the moment.',
                HttpStatus.NOT_FOUND,
            );
        }

        return tokenAddress;
    }
}
