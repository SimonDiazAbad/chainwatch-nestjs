import { Controller, Get, Param } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { GetNativeBalanceParamsDTO } from 'src/common/constants/dto/v1';

@Controller('balances')
export class BalancesController {
    constructor(private readonly balancesService: BalancesService) {}

    @Get('/:blockchain/:address')
    async getNativeBalance(@Param() getNativeBalanceParams: GetNativeBalanceParamsDTO) {
        console.log({ getNativeBalanceParams });
        const { blockchain, address } = getNativeBalanceParams;
        return this.balancesService.getNativeBalance(blockchain, address);
    }
}
