import { Module } from '@nestjs/common';
import { EvmBalanceService } from './evm-balance.service';

@Module({
    providers: [EvmBalanceService],
})
export class EvmBalanceModule {}
