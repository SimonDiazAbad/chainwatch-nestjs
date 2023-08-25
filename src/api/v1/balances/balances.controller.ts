import { Controller, Get, Param } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { GetNativeBalanceParamsDTO, GetNativeBalanceResponse } from '@dto/v1';
import { ZodSerializerDto } from 'nestjs-zod';

@Controller('balances')
export class BalancesController {
    constructor(private readonly balancesService: BalancesService) {}

    @Get('/:blockchain/:address')
    // TODO: test serializers in e2e tests
    @ZodSerializerDto(GetNativeBalanceResponse)
    async getNativeBalance(@Param() getNativeBalanceParams: GetNativeBalanceParamsDTO) {
        const { blockchain, address } = getNativeBalanceParams;
        return this.balancesService.getNativeBalance(blockchain, address);
    }

    @Get('/:blockchain/:erc20token/:address')
    async getERC20Balance(@Param() getERC20BalanceParams) {
        const { blockchain, erc20token, address } = getERC20BalanceParams;
        return this.balancesService.getERC20Balance(blockchain, erc20token, address);
    }
}
