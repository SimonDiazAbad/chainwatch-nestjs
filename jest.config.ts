import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@evm-balance/(.*)$': '<rootDir>/modules/evm-balance/$1',
        '^@config/(.*)$': '<rootDir>/modules/app-config/$1',
        '^@dto/(.*)$': '<rootDir>/common/dto/$1',
        '^@tests/(.*)$': '<rootDir>/tests/$1',
        '^@constants$': '<rootDir>/common/constants/index.ts',
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
};

export default config;
