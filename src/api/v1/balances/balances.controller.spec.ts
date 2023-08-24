import { Test, TestingModule } from '@nestjs/testing';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { Blockchains } from '@constants';
import { createMock } from '@golevelup/ts-jest';

// TODO: write tests
describe('BalancesController', () => {
    let balancesController: BalancesController;
    const resolvedNativeBalance = 123;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BalancesController],
        })
            .useMocker((token) => {
                if (token === BalancesService) {
                    return createMock<BalancesService>({
                        getNativeBalance: jest.fn().mockResolvedValue(resolvedNativeBalance),
                    });
                }
            })
            .compile();

        balancesController = module.get<BalancesController>(BalancesController);
    });

    it('should be defined', () => {
        expect(balancesController).toBeDefined();
    });

    it('should be able to get native balances', async () => {
        const balance = await balancesController.getNativeBalance({
            blockchain: Blockchains.ETH,
            address: '0x0089d53F703f7E0843953D48133f74cE247184c2',
        });

        console.log(balance);
        expect(balance).toEqual(resolvedNativeBalance);
    });
});
