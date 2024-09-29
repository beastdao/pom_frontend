import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    { files: ['**/*.{ts,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    pluginReact.configs.flat.recommended,
    { ignores: ['!node_modules/**/*/', '!build/**/*/'] },
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
        },
        settings: {
            react: {
                version: '18.2.0',
            },
        },
    },
];
