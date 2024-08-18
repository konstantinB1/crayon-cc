import type { Config } from "jest";

const config: Config = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    transform: {
        "^.+\\.(t|j)sx?$": [
            "@swc/jest",
            {
                $schema: "https://swc.rs/schema.json",
                sourceMaps: true,

                jsc: {
                    parser: {
                        syntax: "typescript",
                        tsx: true,
                        dynamicImport: true,
                        decorators: true,
                    },
                    target: "es2021",

                    transform: {
                        hidden: {
                            jest: true,
                        },
                        react: {
                            runtime: "automatic",
                        },
                    },
                },
                module: {
                    type: "commonjs", // Ensure Jest gets the CommonJS modules
                    strict: true,
                    strictMode: true,
                    noInterop: false, // Ensure module interop is enabled
                },
            },
        ],
    },
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};

export default config;
