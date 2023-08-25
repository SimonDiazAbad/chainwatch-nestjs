import { Injectable } from '@nestjs/common';
import { EvmBalanceService } from '@evm-balance/evm-balance.service';
import { Blockchains, TokenTypes } from '@constants';
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
            blockchain: Blockchains.ETH,
            tokenType: TokenTypes.NATIVE,
        };
    }
}
