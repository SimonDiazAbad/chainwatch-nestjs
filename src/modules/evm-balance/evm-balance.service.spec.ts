import { Test, TestingModule } from '@nestjs/testing';
import { EvmBalanceService } from './evm-balance.service';
import { AppConfigService } from '@config/app-config.service';
import { createMock } from '@golevelup/ts-jest';
import { Blockchains, ERC20Tokens } from '@constants';
import { HttpException } from '@nestjs/common';
import { mockProviderGetBalance, mockGetERC20Balance } from '@tests/mocks';

describe('EvmBalanceService', () => {
    let evmBalanceService: EvmBalanceService;
    let appConfigService: AppConfigService;
    const mockBalance = 10000;

    beforeEach(async () => {
        mockProviderGetBalance(mockBalance);
        mockGetERC20Balance(mockBalance);

        const module: TestingModule = await Test.createTestingModule({
            providers: [EvmBalanceService],
        })
            .useMocker(createMock)
            .compile();

        evmBalanceService = module.get<EvmBalanceService>(EvmBalanceService);
        appConfigService = module.get<AppConfigService>(AppConfigService);
    });

    it('should be defined', () => {
        expect(evmBalanceService).toBeDefined();
    });

    it('should get native balance', async () => {
        appConfigService.providers[Blockchains.ETH] = 'https://eth.llamarpc.com';

        const balance = await evmBalanceService.getNativeBalance(
            Blockchains.ETH,
            '0x0089d53f703f7e0843953d48133f74ce247184c2',
        );

        expect(balance.toString()).toEqual(mockBalance.toString());
    });

    it('should throw exception on undefined provider of getNativeBalance()', async () => {
        delete appConfigService.providers[Blockchains.MATIC];

        expect(() =>
            evmBalanceService.getNativeBalance(
                Blockchains.MATIC,
                '0x0089d53f703f7e0843953d48133f74ce247184c2',
            ),
        ).toThrowError(HttpException);
    });

    it('should get ERC20 balance', async () => {
        appConfigService.providers[Blockchains.ETH] = 'https://eth.llamarpc.com';
        appConfigService.erc20TokenAddress[Blockchains.ETH] = {};
        appConfigService.erc20TokenAddress[Blockchains.ETH][ERC20Tokens.USDT] =
            '0xdAC17F958D2ee523a2206206994597C13D831ec7';

        const balance = await evmBalanceService.getERC20Balance(
            Blockchains.ETH,
            ERC20Tokens.USDT,
            '0x0089d53f703f7e0843953d48133f74ce247184c2',
        );

        expect(balance.toString()).toEqual(mockBalance.toString());
    });
    it.todo('should throw exception on undefined provider of getERC20Balance');
});
