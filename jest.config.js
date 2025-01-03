
export default {
    testEnvironment: "jsdom",
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$' : 'babel-jest'
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}