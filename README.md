# 조경석 포트폴리오

만든 것(프로젝트)과 공부한 것(스터디 노트)을 모아 둔 개인 포트폴리오 사이트입니다.
Next.js 16 App Router로 만들었고, 모든 페이지가 빌드할 때 정적으로 생성됩니다.

| 주소 | 내용 |
|---|---|
| `/` | 첫 화면. 대표 프로젝트, 공부 기록 일부, 지금 하는 것, 연락처 |
| `/projects` | 프로젝트 전체 (연도별, 팀/개인 필터. `?kind=team`, `?kind=solo`로 바로 열 수 있음) |
| `/projects/[slug]` | 프로젝트 상세 |
| `/study` | 공부 기록 전체 (분야별) |
| `/study/[slug]` | 공부 기록 상세 |
| `/about` | 소개 |

## 로컬에서 실행하기

Node.js 20.9 이상이 필요합니다.

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 열면 됩니다. 파일을 저장하면 바로 반영됩니다.

그 밖의 명령어는 다음과 같습니다.

```bash
npm run build   # 배포용 빌드 (모든 페이지를 정적으로 생성)
npm run start   # 빌드한 결과를 로컬에서 실행
npm run lint    # ESLint 검사
```

## 내용 고치기

글, 프로젝트, 공부 기록은 모두 **`src/content/site.ts`** 한 파일에 있습니다. 페이지 코드는 건드리지 않아도 됩니다.

- `person`: 이름, 소개 문장, 이메일, GitHub, velog, 지금 하는 것(`now`)
- `projects`: 프로젝트 목록. `featured: true`인 프로젝트가 첫 화면에 나옵니다.
- `study`: 공부 기록 목록. `featured: true`인 기록이 첫 화면에 나옵니다. `related`에 프로젝트 `slug`를 적으면 서로 연결됩니다.
- `record`: 소개 페이지의 이력

새 프로젝트나 공부 기록을 추가하면 목록, 상세 페이지, 이전/다음 링크가 자동으로 만들어집니다.
`slug`는 주소에 쓰이므로 영문 소문자와 `-`만 쓰는 것이 좋습니다.

## 이미지

이미지는 **`public/work`** 폴더에 있습니다.

```
public/work/
  icons/          앱 아이콘 (정사각형)
  pinyut/         프로젝트별 스크린샷
  damoim/
  ...
```

`site.ts`에서는 `/work/...`로 시작하는 경로와 함께 실제 픽셀 크기(`w`, `h`), 대체 텍스트(`alt`), 캡션(`caption`)을 적습니다.

```ts
{ src: "/work/pinyut/map.webp", w: 772, h: 1600, alt: "핀유트 핀맵 화면", caption: "핀맵" }
```

- 형식은 webp를 권장합니다.
- 휴대폰 화면은 폰 프레임 안에 들어갑니다. 데스크톱 앱이라면 프로젝트에 `imageLayout: "desktop"`을 적어 주세요.
- 스크린샷이 없는 프로젝트는 아이콘(없으면 이름 첫 글자 타일)으로 표시됩니다.

## Vercel에 배포하기

### 방법 1. 저장소 가져오기

1. 이 폴더를 GitHub 저장소에 올립니다.
2. https://vercel.com/new 에서 그 저장소를 선택합니다 (Import).
3. 설정은 그대로 두고 Deploy를 누릅니다. Next.js 프로젝트로 자동 인식됩니다.

이후에는 기본 브랜치에 push할 때마다 자동으로 다시 배포됩니다.

### 방법 2. 터미널에서 바로 배포

```bash
npx vercel          # 처음 한 번은 로그인과 프로젝트 연결을 묻습니다. 미리보기 주소가 나옵니다.
npx vercel --prod   # 실제 주소로 배포
```

### 공유 미리보기 주소

링크를 공유할 때 보이는 미리보기 이미지(og:image)는 사이트 주소를 기준으로 만들어집니다.
Vercel에서는 기본 production 주소를 자동으로 사용합니다.
직접 산 도메인을 연결했다면 Vercel 프로젝트의 Environment Variables에 다음 값을 추가해 주세요.

```
NEXT_PUBLIC_SITE_URL=https://내-도메인.com
```

## 폴더 구조

```
src/
  content/site.ts     모든 내용 (여기만 고치면 됩니다)
  lib/content.ts      site.ts를 정렬하고 찾는 도우미 (내용을 새로 만들지 않음)
  app/                페이지 (App Router)
  components/         화면 구성 요소
public/work/          이미지
DESIGN.md             디자인 규칙 (색, 모서리, 컴포넌트 사용법)
```
