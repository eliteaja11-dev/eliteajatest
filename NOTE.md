# s1c 판정 기준 — s1 의 실패 원인 분리

s1(PR #2)은 `Error while evaluating .coderabbit.config.ts` 로 실패하고 기본값으로 돌아갔다.
s1c 는 **아웃바운드 시도만** 제거한 것이다. 다른 변수는 그대로다.

| 관측 | 결론 |
|---|---|
| 평가 성공 + 봇 코멘트에 `CRMARK-06fef04be9dc ...` | **원인은 네트워크 호출.** 즉 `fetch` 가 샌드박스에 있고 호출은 거부되며, 거부된 프라미스가 평가를 깬다. 문서의 "networking denied" 는 지켜지지만 **처리되지 않은 거부로 설정 전체가 무효화**된다는 부수 사실이 남는다 |
| 또 `Error while evaluating` | 원인이 다른 곳이다. 다음 변형에서 전역 접근을 더 줄인다 |
| 평가 성공 + `envKeys=0` | "The environment is empty" 주장 확인 |
| 평가 성공 + `envKeys>0` | **문서와 다르다** |
| 평가 성공 + `cwd=...` 값 존재 | 파일시스템 문맥이 노출된다 |

## 이미 확정된 것 (s1 이 벌어 준 것)
- **저장소가 정한 TS 코드가 서버에서 실제로 평가된다.** 봇 스스로 "Error while
  **evaluating** .coderabbit.config.ts" 라고 밝혔다. 번들 단계가 아니라 평가 단계다.
- **설정 평가 실패는 fail-open 이다** — `Configuration used: defaults` 로 되돌아간다.
  문서는 원격 include 접근 검증 실패에 대해서만 "fails closed" 라고 말했다.
  설정에 보안 관련 설정(도구 활성화 등)을 넣어 둔 저장소에서, 설정을 깨뜨리면
  그 설정이 조용히 사라진다. 별도로 기록해 둔다.
