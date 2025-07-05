module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.svg$': 'jest-transformer-svg', // SVG 변환 추가
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest', // JS/TS 변환
  },
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-transformer-svg', // SVG 파일 매핑
    // 이미지 파일 import를 모두 mock 처리
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    // 스타일 파일 등도 필요시 추가
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFiles: ['<rootDir>/jest.setup.js'],
};
