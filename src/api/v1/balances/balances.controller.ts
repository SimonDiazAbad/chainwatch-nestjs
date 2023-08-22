import { Controller, Get } from '@nestjs/common';
import { BalancesService } from './balances.service';

@Controller('balances')
export class BalancesController {
    constructor(private readonly balancesService: BalancesService) {}

    @Get('/:chainName/:address')
    async getNativeBalance() {
        return 'test';
    }
}
