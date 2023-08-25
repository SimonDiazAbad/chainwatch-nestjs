import { Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { EvmBalanceService } from '@evm-balance/evm-balance.service';
import { BalancesController } from './balances.controller';

@Module({
    controllers: [BalancesController],
    providers: [BalancesService, EvmBalanceService],
})
export class BalancesModule {}
