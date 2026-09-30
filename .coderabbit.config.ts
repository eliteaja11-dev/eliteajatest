// s10 — **판정기 자체를 검증한다.** 한 설정 안에 대조군을 같이 넣는다.
//
// 애매한 지점: PR #15 에서 리뷰 파이프라인은 비공개 `eliteaja11-dev/coderabbit` 을
//   "🔗 Linked repositories identified" 에 올렸는데, 봇의 채팅 도구는 같은 저장소에
//   `gh: Not Found (HTTP 404)` 를 받았다. 두 경로의 권한이 다르다.
//   PR #14(존재하지 않는 저장소)에서는 블록이 나오지 않았다.
//
// 그래서 묻는다: 그 블록은 **해결에 성공한 저장소만** 싣는가, 아니면 설정값을 그대로 찍는가.
//
//   블록에 존재하는 것만 실린다  → 블록은 진짜 판정기다. 리뷰 파이프라인이 비공개
//                                 저장소를 해결할 수 있다는 뜻이고, 설치 범위가
//                                 그것을 허용하는지가 남은 질문이 된다.
//   둘 다 실린다                 → 블록은 단순 반영이다. 판정기로 쓸 수 없고
//                                 PR #14 의 부재는 다른 이유였다.
//
// 대상은 전부 우리 계정 이름공간이다. 남의 저장소는 쓰지 않는다.
const MARK = "CRMARK-06fef04be9dc";

export default {
  knowledge_base: {
    linked_repositories: [
      // (A) 존재하고 비공개 — 앱이 설치되지 않았어야 한다
      { repository: "eliteaja11-dev/coderabbit", instructions: MARK + " case-A exists-private" },
      // (B) 존재하지 않음 — 대조군
      { repository: "eliteaja11-dev/zz-nonexistent-control-9f3a1c", instructions: MARK + " case-B absent" },
      // (C) 존재하고 공개 — 양성 대조군 (이 저장소 자신)
      { repository: "eliteaja11-dev/eliteajatest", instructions: MARK + " case-C exists-public" },
    ],
  },
};
