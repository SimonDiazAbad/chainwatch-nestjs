import { Controller, Get, Param } from '@nestjs/common';
import { BalancesService } from './balances.service';
import {
    GetNativeBalanceParamsDTO,
    GetNativeBalanceResponse,
} from '../../../common/constants/dto/v1';
import { ZodSerializerDto } from 'nestjs-zod';

@Controller('balances')
export class BalancesController {
    constructor(private readonly balancesService: BalancesService) {}

    @Get('/:blockchain/:address')
    @ZodSerializerDto(GetNativeBalanceResponse)
    async getNativeBalance(@Param() getNativeBalanceParams: GetNativeBalanceParamsDTO) {
        const { blockchain, address } = getNativeBalanceParams;
        return this.balancesService.getNativeBalance(blockchain, address);
    }
}
