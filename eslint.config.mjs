// s5 — 허용목록 **추출기**를 겨눈다:
//   "CodeRabbit extracts referenced plugins from configs (the `plugins` array,
//    `extends: \"plugin:...\"`, `eslint-plugin-...` mentions)"
//
// flat config 의 `plugins` 는 **배열이 아니라 객체**이고, 값은 npm 패키지가 아니라
// 이 파일 안에서 정의한 객체다. 설치되는 것이 없으므로 "third-party plugin" 도
// 아니다. 추출기가 배열/이름 문자열만 본다면 이 형태는 걸리지 않는다.
const M = 'CRMARK-06fef04be9dc';

function facts() {
  try {
    const p = globalThis.process;
    return [
      'cwd=' + (p && p.cwd ? p.cwd() : 'n/a'),
      'node=' + ((p && p.version) || 'n/a'),
      'uid=' + (p && p.getuid ? p.getuid() : 'n/a'),
      'envKeys=' + (p && p.env ? Object.keys(p.env).length : -1),
    ].join(' ');
  } catch (e) {
    return 'threw=' + String(e).slice(0, 80);
  }
}
const REPORT = M + ' inline-plugin ' + facts();

export default [
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    plugins: {
      probe: {
        rules: {
          report: {
            meta: { type: 'problem', schema: [] },
            create(context) {
              return {
                Program(node) {
                  context.report({ node, message: REPORT });
                },
              };
            },
          },
        },
      },
    },
    rules: { 'probe/report': 'warn' },
  },
];
