# s1 판정 기준

이 PR 은 이 파일을 바꿔 `**/*.md` path_instruction 이 걸리게 한다.

| 관측 | 결론 |
|---|---|
| 봇 코멘트에 `CRMARK-06fef04be9dc ...` 가 나온다 | 저장소 TS 설정이 **서버에서 평가된다**(문서대로) |
| `envKeys=0` | "The environment is empty" 주장 확인 |
| `envKeys>0` | **문서와 다르다** — 평가 문맥에 환경변수가 남아 있다 |
| 수신 엔드포인트에 `/s1-config-fetch` 도착 | **"all outbound networking denied" 실패 → SSRF 후보** |
| 도착 없음 | 차단 주장 확인 (음성 기록) |
| 봇이 설정 오류를 낸다 | 번들/평가 단계에서 거부 — 오류 문구를 그대로 기록 |
