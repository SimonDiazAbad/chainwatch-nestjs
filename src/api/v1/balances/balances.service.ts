import { Injectable } from '@nestjs/common';
import { EvmBalanceService } from '@evm-balance/evm-balance.service';

@Injectable()
export class BalancesService {
    constructor(private evmBalanceService: EvmBalanceService) {}

    async getNativeBalance(blockchain: string, address: string) {
        return this.evmBalanceService.getBalance(blockchain, address);
    }
}
