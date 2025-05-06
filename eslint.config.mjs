import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "**/.eslintrc.js",
      "**/public/**",
      "**/*.d.ts",
      "**/jest.config.js",
      "**/jest.setup.js"
    ],
    rules: {
      // Disable some rules that are too strict for this project
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": ["error", {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": "allow-with-description",
        "ts-nocheck": "allow-with-description",
        "minimumDescriptionLength": 3
      }],
      // Fix React Hook exhaustive deps warnings
      "react-hooks/exhaustive-deps": "warn",
      // Improve image usage
      "@next/next/no-img-element": "warn",
      // Improve imports
      "@typescript-eslint/no-require-imports": "warn",
      // Improve type safety
      "@typescript-eslint/no-this-alias": "warn"
    },
  },
];

export default eslintConfig;
