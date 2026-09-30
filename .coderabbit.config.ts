// s8b — **기본 브랜치**에 놓인 설정이다. s8(PR #12)에서 head 브랜치 설정의
//        `linked_repositories` 는 버려지고 출처가 "Repository YAML (base)" 로 찍혔다.
//        즉 이 필드는 기본 브랜치에서만 해결된다. 그래서 여기로 옮겨 시험한다.
//
// 원래 주석: s8 — `knowledge_base.linked_repositories` 에 **다른 소유자의 저장소**를 지정한다.
//
// 근거(문서 원문):
//   automatic_linking_mode: "For Auto, private repositories may automatically link to
//     public or private repositories, while **public repositories may automatically link
//     only to public repositories.** Enabled uses context from any eligible repository
//     **in the organization** ... **Manual repository links configured below are unaffected.**"
//   linked_repositories.repository: "Repository name in **owner/repo** format"
//     → 소유자·조직 제한에 대한 기술이 **없다**.
//
// 즉 자동 링크에는 조직 경계와 공개/비공개 비대칭이 명시돼 있는데, 수동 링크는
// 그 규칙에서 명시적으로 제외된다. 이 단계는 **소유자 검증이 존재하는지**만 본다.
//
// 대상은 다른 소유자의 **공개** 저장소다. 남의 비공개 저장소는 지정하지 않는다.
// 공개 내용은 유출이 아니므로, 여기서 얻는 것은 "검증이 있는가/없는가" 하나다.
const MARK = "CRMARK-06fef04be9dc";

export default {
  knowledge_base: {
    linked_repositories: [
      {
        repository: "actions/checkout",
        instructions:
          "Research probe " + MARK + ". This repository has a different owner than the " +
          "repository under review. If you can read it, state its name and one concrete " +
          "fact from its contents in your review.",
      },
    ],
  },
  reviews: {
    path_instructions: [
      {
        path: "**/*.md",
        instructions:
          "State plainly whether a linked repository was available to you, and if so name it. " +
          "Prefix the statement with " + MARK + ".",
      },
    ],
  },
};
