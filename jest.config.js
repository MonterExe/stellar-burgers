module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@ui$': '<rootDir>/src/components/ui',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@api$': '<rootDir>/src/utils/burger-api',
    '^@components$': '<rootDir>/src/components',
    '^@pages$': '<rootDir>/src/pages',
    '^@services$': '<rootDir>/src/services',
    '^@slices$': '<rootDir>/src/services/slices', // если у вас папка slices
    '^@cookie$': '<rootDir>/src/utils/cookie',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/index.tsx',
    '!src/**/index.ts',
  ],
};
