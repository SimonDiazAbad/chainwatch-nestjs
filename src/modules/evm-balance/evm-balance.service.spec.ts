import { Test, TestingModule } from '@nestjs/testing';
import { EvmBalanceService } from './evm-balance.service';

describe('EvmBalanceService', () => {
    let service: EvmBalanceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EvmBalanceService],
        }).compile();

        service = module.get<EvmBalanceService>(EvmBalanceService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
