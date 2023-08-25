import { Test, TestingModule } from '@nestjs/testing';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { Blockchains, TokenTypes } from '@constants';
import { createMock } from '@golevelup/ts-jest';
import { GetNativeBalanceResponseType } from '@dto/v1';

// TODO: write tests
describe('BalancesController', () => {
    let balancesController: BalancesController;
    let balancesService: BalancesService;
    // TODO: create mocker for this or inside balancesService.getNativeBalance()
    const resolvedNativeBalance: GetNativeBalanceResponseType = {
        address: '0x0089d53f703f7e0843953d48133f74ce247184c2',
        balance: '123',
        blockchain: Blockchains.ETH,
        tokenType: TokenTypes.NATIVE,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BalancesController],
        })
            .useMocker((token) => {
                if (token === BalancesService) {
                    return createMock<BalancesService>({
                        getNativeBalance: jest
                            .fn()
                            .mockResolvedValue({ ...resolvedNativeBalance, secret: 'password' }),
                    });
                }
            })
            .compile();

        balancesController = module.get<BalancesController>(BalancesController);
        balancesService = module.get<BalancesService>(BalancesService);
    });

    it('should be defined', () => {
        expect(balancesController).toBeDefined();
    });

    it('should be able to get native balances', async () => {
        const balance = await balancesController.getNativeBalance({
            blockchain: Blockchains.ETH,
            address: '0x0089d53F703f7E0843953D48133f74cE247184c2',
        });

        expect(balance.balance).toEqual(resolvedNativeBalance.balance);
    });

    it('should call balancesServices.getNativeToken()', async () => {
        await balancesController.getNativeBalance({
            blockchain: Blockchains.ETH,
            address: '0x0089d53F703f7E0843953D48133f74cE247184c2',
        });

        expect(balancesService.getNativeBalance).toHaveBeenCalled();
    });
});
