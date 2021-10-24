module.exports = {
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    collectCoverageFrom: [
      "./src/console/**",
      "./src/constants/**",
      "./src/index.ts",
      "./src/types.ts"
    ]
  }