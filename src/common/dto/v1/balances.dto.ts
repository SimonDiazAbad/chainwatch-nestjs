import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { Blockchains, ERC20Tokens } from '@constants';

export const zGetNativeBalanceParamsSchema = z.object({
    blockchain: z.nativeEnum(Blockchains),
    // TODO: check if it's a valid address
    address: z.string(),
});

export class GetNativeBalanceParamsDTO extends createZodDto(zGetNativeBalanceParamsSchema) {}

export const zGetERC20Balance = z.object({
    blockchain: z.nativeEnum(Blockchains),
    erc20token: z.nativeEnum(ERC20Tokens),
    // TODO: check if it's a valid address
    address: z.string(),
});

export class GetERC20BalanceParamsDTO extends createZodDto(zGetERC20Balance) {}

export const zGetNativeBalanceResponse = z.object({
    address: z.string(),
    balance: z.string(),
    blockchain: z.nativeEnum(Blockchains),
    tokenType: z.enum(['native', 'erc20']),
});

export type GetNativeBalanceResponseType = z.infer<typeof zGetNativeBalanceResponse>;
export class GetNativeBalanceResponse extends createZodDto(zGetNativeBalanceResponse) {}

export const zGetERC20BalanceResponse = z.object({
    address: z.string(),
    balance: z.string(),
    blockchain: z.nativeEnum(Blockchains),
    erc20token: z.nativeEnum(ERC20Tokens),
    tokenType: z.enum(['native', 'erc20']),
});

export type GetERC20BalanceResponseType = z.infer<typeof zGetERC20BalanceResponse>;
export class GetERC20BalanceResponse extends createZodDto(zGetERC20BalanceResponse) {}
