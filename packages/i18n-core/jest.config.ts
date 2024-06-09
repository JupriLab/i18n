import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  preset: "ts-jest",
  displayName: "i18n-core",
  testMatch: ["<rootDir>/packages/i18n-core/__tests__/**/*.spec.ts"],
  rootDir: "../../",
};

export default config;
