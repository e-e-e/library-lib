module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },
  maxConcurrency: 1,
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*'
  ],
};
