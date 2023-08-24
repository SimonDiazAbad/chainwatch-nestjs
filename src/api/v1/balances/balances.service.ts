import { Injectable } from '@nestjs/common';
import { EvmBalanceService } from '@evm-balance/evm-balance.service';
import { Blockchains, TokenTypes } from '@constants';
import { GetNativeBalanceResponseType } from '../../../common/constants/dto/v1';

@Injectable()
export class BalancesService {
    constructor(private evmBalanceService: EvmBalanceService) {}

    async getNativeBalance(
        blockchain: string,
        address: string,
    ): Promise<GetNativeBalanceResponseType> {
        const balance = await this.evmBalanceService.getBalance(blockchain, address);
        return {
            address: address,
            balance: balance.toString(),
            blockchain: Blockchains.ETH,
            tokenType: TokenTypes.NATIVE,
        };
    }
}
