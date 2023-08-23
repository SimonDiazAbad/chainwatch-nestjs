import { Injectable } from '@nestjs/common';
import { EvmBalanceService } from 'src/modules/evm-balance/evm-balance.service';

@Injectable()
export class BalancesService {
    constructor(private evmBalanceService: EvmBalanceService) {}

    async getNativeBalance(blockchain: string, address: string) {
        return this.evmBalanceService.getEthBalance(address);
    }
}
