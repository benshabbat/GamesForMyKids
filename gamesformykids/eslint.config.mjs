import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'coverage/**', 'scripts/**', 'next-env.d.ts'] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Five new rules added in eslint-plugin-react-hooks for React 19 are flagging
      // pre-existing patterns throughout the codebase. Disabled here to match the
      // behavior before this Next.js 16 upgrade; a dedicated follow-up PR will
      // enable these rules and fix each violation.
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // React Compiler only treats `use*` functions as hooks. A hook factory result bound to
    // any other name (e.g. `const _useStore = createShallowHook(...)`) gets memoized like a
    // plain call, so its hooks are skipped on re-render and React crashes on load.
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "VariableDeclarator[init.callee.name=/^create\\w*Hook$/]:not([id.name=/^use[A-Z0-9]/])",
          message: "Name hook factory results use* (e.g. useChessStore) — React Compiler only treats use* calls as hooks.",
        },
      ],
    },
  },
];

export default eslintConfig;
