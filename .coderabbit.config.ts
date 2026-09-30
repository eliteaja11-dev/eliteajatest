// s7b — s7(PR #18)의 `Failed to bundle .coderabbit.config.ts` 원인을 분리한다.
// **`includeRemote` 호출만 제거했다.** SDK import·defineConfig·mergeConfig 는 그대로 둔다.
//
//   번들 성공 → 원인은 `includeRemote` 다. 비공개 `{owner}/coderabbit` 가져오기가
//               실패했다는 뜻이고, 남은 구분은 "권한 없음" vs "파일 없음" 두 가지다.
//   번들 실패 → 원인은 내 설정/SDK 사용 방식이다. s7 결과는 아무것도 증명하지 않는다.
import { defineConfig, mergeConfig } from "@coderabbitai/config";

const M = "CRMARK-06fef04be9dc";

export default defineConfig(
  mergeConfig({
    reviews: {
      path_instructions: [
        {
          path: "**/*.md",
          instructions: "Echo verbatim once: " + M + " control-no-includeRemote",
        },
      ],
    },
  }),
);
