import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { Blockchains } from '@constants';
import { EvmBalanceService } from '@evm-balance/evm-balance.service';
import { AppConfigService } from '@config/app-config.service';
import { AppConfigModule } from '@config/app-config.module';

// TODO: write tests
describe('BalancesController', () => {
    let balancesController: BalancesController;
    let balancesService: BalancesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BalancesController],
        }).compile();

        balancesService = module.get<BalancesService>(BalancesService);
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
        balancesService;

        console.log(balance);
    });
});
