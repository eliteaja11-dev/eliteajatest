# s7b — s7 실패 원인 분리용 대조군

s7(PR #18): `Configuration used: defaults` + `Failed to bundle .coderabbit.config.ts`.
번들 단계는 문서상 원격 include 를 가져오는 단계다("All file fetching happens here,
outside the sandbox"). 하지만 내 설정 자체의 문제일 수도 있다.

s7b 는 `includeRemote` **호출 한 줄만** 뺐다.

| 관측 | 결론 |
|---|---|
| `Path: .coderabbit.config.ts` (번들 성공) | 원인은 `includeRemote` — 비공개 저장소 가져오기 실패 |
| 또 `Failed to bundle` | 원인은 내 설정/SDK 사용법. **s7 은 무효** |

## 그 다음에 남는 구분 (사용자 조작 필요)
"권한 없음" 과 "파일 없음" 을 가르려면 **양성 대조군**이 필요하다:
CodeRabbit 앱 설치에 `coderabbit` 저장소를 **추가**하고 s7 을 다시 돌린다.
- 그때 성공하면 → 앞선 실패는 진짜 권한 때문 = **통제 동작**(음성, 확정)
- 그때도 실패하면 → `probe.yaml` 이 없거나 다른 이유. 파일부터 확인
