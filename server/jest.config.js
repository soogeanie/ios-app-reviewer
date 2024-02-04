/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['./__tests__/*.(test|spec).(ts|tsx|js)', './**/__tests__/*.(test|spec).(ts|tsx|js)'],
  verbose: true
};

module.exports = config;