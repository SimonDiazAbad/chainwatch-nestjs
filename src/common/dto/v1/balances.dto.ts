import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { Blockchains } from '@constants';

export const zGetNativeBalanceParamsSchema = z.object({
    blockchain: z.nativeEnum(Blockchains),
    // TODO: check if it's a valid address
    address: z.string(),
});

export class GetNativeBalanceParamsDTO extends createZodDto(zGetNativeBalanceParamsSchema) {}

export const zGetNativeBalanceResponse = z.object({
    address: z.string(),
    balance: z.string(),
    blockchain: z.nativeEnum(Blockchains),
    tokenType: z.enum(['native', 'erc20']),
});

export type GetNativeBalanceResponseType = z.infer<typeof zGetNativeBalanceResponse>;

export class GetNativeBalanceResponse extends createZodDto(zGetNativeBalanceResponse) {}
