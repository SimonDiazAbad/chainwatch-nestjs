import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { Blockchains } from 'src/common/constants/blockchains';

export const GetNativeBalanceSchema = z.object({
    blockchain: z.nativeEnum(Blockchains),
    // TODO: check if it's a valid address
    address: z.string(),
});

// class is required for using DTO as a type
export class GetNativeBalanceDTO extends createZodDto(GetNativeBalanceSchema) {}
