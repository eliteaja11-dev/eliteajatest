// 설치를 유발하려면 ESLint 가 돌 이유가 있어야 한다 — 최소 설정
export default [
  { files: ['**/*.js', '**/*.mjs'], rules: { 'no-unused-vars': 'warn' } },
];
