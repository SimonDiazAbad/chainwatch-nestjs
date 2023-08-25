import { Test, TestingModule } from '@nestjs/testing';
import { EvmBalanceService } from './evm-balance.service';
import { AppConfigService } from '@config/app-config.service';
import { createMock } from '@golevelup/ts-jest';
import { Blockchains } from '@constants';
import { HttpException } from '@nestjs/common';

describe('EvmBalanceService', () => {
    let evmBalanceService: EvmBalanceService;
    let appConfigService: AppConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EvmBalanceService],
        })
            .useMocker(createMock)
            .compile();

        evmBalanceService = module.get<EvmBalanceService>(EvmBalanceService);
        appConfigService = module.get<AppConfigService>(AppConfigService);

        appConfigService.providers[Blockchains.ETH] = 'https://eth.llamarpc.com';
    });

    it('should be defined', () => {
        expect(evmBalanceService).toBeDefined();
    });

    it('should throw exception on undefined provider', async () => {
        delete appConfigService.providers[Blockchains.MATIC];

        expect(() =>
            evmBalanceService.getBalance(
                Blockchains.MATIC,
                '0x0089d53f703f7e0843953d48133f74ce247184c2',
            ),
        ).toThrowError(HttpException);
    });
});
