import { Injectable } from '@nestjs/common';
import { EvmBalanceService } from '@evm-balance/evm-balance.service';
import { Blockchains, ERC20Tokens, TokenTypes } from '@constants';
import { GetNativeBalanceResponseType } from '@dto/v1';

@Injectable()
export class BalancesService {
    constructor(private evmBalanceService: EvmBalanceService) {}

    // TODO: check if response DTO be at controller level
    async getNativeBalance(
        blockchain: Blockchains,
        address: string,
    ): Promise<GetNativeBalanceResponseType> {
        const balance = await this.evmBalanceService.getNativeBalance(blockchain, address);
        return {
            address: address,
            balance: balance.toString(),
            blockchain: blockchain,
            tokenType: TokenTypes.NATIVE,
        };
    }

    async getERC20Balance(blockchain: Blockchains, erc20token: ERC20Tokens, address: string) {
        const balance = await this.evmBalanceService.getERC20Balance(
            blockchain,
            erc20token,
            address,
        );

        return {
            address: address,
            balance: balance.toString(),
            blockchain: blockchain,
            tokenType: TokenTypes.ERC20,
            erc20token: erc20token,
        };
    }
}
