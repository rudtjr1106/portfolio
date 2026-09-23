/**
 * Portfolio content, v2: WHAT I BUILT and WHAT I STUDIED.
 * Deep problem-solving stories live in the resume, not here.
 * Facts come from the resume (2026-09-14), GitHub repositories, and Notion notes.
 * Do not invent numbers or claims. No em dash or en dash characters; use "-" for ranges.
 */

export type Img = { src: string; w: number; h: number; alt: string; caption?: string };
export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  nameNote?: string;
  tagline: string; // one line: what it is
  kind: "팀" | "개인";
  platform: string;
  period: string;
  year: number; // for sorting and grouping
  featured?: boolean; // shown on the home page
  team?: string;
  role: string; // what I did, one line
  status: string;
  summary: string[]; // 1-3 short paragraphs: what it is and why it exists
  features: string[]; // what the product does
  myWork: string[]; // what I built
  highlights?: string[]; // short technical points, one line each
  stack: string[];
  links: Link[];
  icon?: Img;
  images: Img[];
  imageLayout?: "phone" | "desktop"; // how screenshots should be framed
  imageNote?: string;
  note?: string;
};

export type Study = {
  slug: string;
  title: string;
  short: string; // one line for lists
  area: "Android" | "Kotlin" | "인프라·연구" | "협업·교육";
  source: string; // where the notes live
  period: string;
  featured?: boolean;
  summary: string[];
  topics: string[];
  sections?: { heading: string; items: string[] }[];
  links?: Link[];
  related?: string; // project slug
  caveat?: string;
};

const icon = (slug: string, alt: string, w = 240): Img => ({ src: `/work/icons/${slug}.webp`, w, h: w, alt });

export const person = {
  name: "조경석",
  nameEn: "Kyungseok Cho",
  role: "Android 개발자",
  headline: "앱을 만들고, 출시하고, 운영합니다.", // from the user's GitHub profile README
  lede: "Kotlin으로 Android와 iOS, 서버까지. 지금까지 만든 것과 공부한 것을 모았습니다.",
  about: [
    "명지대학교 컴퓨터공학과에 다니는 Android 개발자입니다. XML View로 시작해 Jetpack Compose, Kotlin Multiplatform으로 옮겨 왔고, 필요하면 서버와 데스크톱 앱도 직접 만듭니다.",
    "지금은 UMC 중앙 Android 파트장으로 운영 앱을 만들고 전국 챌린저 교육을 맡고 있습니다. 연구실에서는 컨테이너 런타임의 데이터 입력 성능을 측정하고 있습니다.",
  ],
  now: [
    { what: "UMC 운영 앱", detail: "Android 개발, 중앙 Android 파트장" },
    { what: "다모임", detail: "앱부터 서버, 배포까지 1인 개발" },
    { what: "지능형데이터처리 연구실", detail: "학부연구생, 컨테이너 런타임 성능 연구" },
  ],
  email: "rudtjr1206@gmail.com",
  github: "https://github.com/rudtjr1106",
  velog: "https://velog.io/@rudtjr1106",
  // Deliberately omitted from the public site: phone number, birth date, photo.
};

export const projects: Project[] = [
  {
    slug: "pinyut",
    name: "핀유트",
    nameNote: "구 핀업",
    tagline: "지인이 직접 다녀온 곳만 모아 보는 지도 기반 장소 공유 SNS",
    kind: "팀",
    platform: "Android, iOS",
    period: "2025.08 - 운영 중",
    year: 2025,
    featured: true,
    team: "9명 (기획 3, 디자인 2, Android 2, 백엔드 2)",
    role: "프로젝트 세팅을 뺀 거의 모든 화면과 iOS 네이티브 연결, 스토어 배포",
    status: "Google Play, App Store 출시 후 운영 중",
    summary: [
      "광고성 리뷰 때문에 믿기 어려워진 지도 서비스 대신, 지인이 직접 경험한 장소만 모아 보는 폐쇄형 지도 SNS입니다.",
      "iOS 개발자가 없는 팀이라 Kotlin Multiplatform과 Compose Multiplatform으로 Android와 iOS를 한 코드베이스로 만들어 두 스토어에 동시에 출시했습니다. 모바일 저장소 커밋의 88%가 제 커밋입니다.",
    ],
    features: [
      "네이버 지도 위 핀과 클러스터링, 카테고리별 마커, 지도 검색",
      "핀로그(장소 리뷰) 작성과 사진 3장, 별점, 댓글",
      "핀버디(친구)와 피드, 피드 검색",
      "에디터 아티클과 북마크, 스크랩",
      "FCM 알림과 카카오톡 공유",
    ],
    myWork: [
      "핀맵, 로그 등록, 마이피드, 스크랩, 에디터 아티클 등 전 기능 화면",
      "Naver Map, 카카오·네이버 로그인, FCM, WebView의 iOS 연결(expect/actual)",
      "commonMain을 domain, data, remote, local, ui 레이어로 나눈 구조 개편",
      "develop은 Play 내부 테스트와 TestFlight로, master는 두 스토어로 가는 자동 배포",
    ],
    highlights: [
      "R8을 도입해 dex 메서드 81%, 다운로드 용량 50%를 줄였습니다.",
      "핀업에서 핀유트로 리브랜딩하면서 Android 16(API 36)을 타겟팅했습니다.",
    ],
    stack: ["Kotlin Multiplatform", "Compose Multiplatform", "Koin", "Ktor", "Ktorfit", "Coil3", "Naver Map", "Kakao SDK", "FCM", "DataStore", "fastlane", "GitHub Actions"],
    links: [
      { label: "GitHub", href: "https://github.com/TEAM-PIN-UP/MOBILE-PIN-UP" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.pinup.placePinup" },
    ],
    icon: icon("pinyut", "핀유트 앱 아이콘"),
    imageLayout: "phone",
    images: [
      { src: "/work/pinyut/map.webp", w: 772, h: 1600, alt: "핀유트 핀맵 화면. 네이버 지도 위에 현재 위치와 장소 검색창", caption: "핀맵" },
      { src: "/work/pinyut/article.webp", w: 772, h: 1600, alt: "핀유트 에디터 아티클 화면. 장소 사진과 제목이 이어진다", caption: "에디터 아티클" },
      { src: "/work/pinyut/my.webp", w: 772, h: 1600, alt: "핀유트 마이피드 화면. 프로필과 내가 남긴 핀로그", caption: "마이피드" },
    ],
  },
  {
    slug: "umc",
    name: "UMC 운영 앱",
    tagline: "전국 28개 대학, 약 1,000명이 쓰는 대학 연합 IT 동아리 운영 앱",
    kind: "팀",
    platform: "Android",
    period: "2025.12 - 진행 중",
    year: 2025,
    featured: true,
    team: "Android 5명, 19개 모듈",
    role: "공지 도메인 전체, 인증, 출석, CI/CD. 중앙 Android 파트장 겸임",
    status: "Google Play 출시, 운영 중 (v3.4.0)",
    summary: [
      "대학 연합 IT 동아리 UMC의 공지, 출석, 스터디, 커뮤니티를 한곳에 모은 공식 앱입니다.",
      "XML View로 만든 앱을 Jetpack Compose로 옮기고 있고, 5명 중 커밋 수 2위로 참여하고 있습니다.",
    ],
    features: [
      "공지 목록, 검색, 작성과 마크다운 에디터, 투표, 읽음 확인",
      "지도 기반 출석(반경 50m), 경고와 벌점",
      "스터디와 커리큘럼, 커뮤니티",
      "명함과 QR",
      "원격 설정으로 화면별 안내와 점검 모드 띄우기",
    ],
    myWork: [
      "프로젝트 구조와 Base 설계, 공통 컴포넌트",
      "카카오·구글·이메일 로그인과 회원가입, 토큰 갱신",
      "공지 탭 전체를 Compose로 새로 구현 (마크다운 에디터, 형광펜, 작성 권한)",
      "Splash, 로그인, 회원가입, 권한 화면의 XML에서 Compose 전환",
      "ML Kit GenAI(Gemini Nano)로 공지 요약과 다듬기",
      "태그 기반 버전, 바뀐 모듈만 검사하는 PR 검사, 자동 배포와 릴리즈 노트",
    ],
    highlights: [
      "단발성 이벤트 유실을 잡는 Custom Lint 규칙을 만들어 배포 파이프라인에 붙였습니다.",
      "앱 배포 없이 안내를 바꾸는 원격 설정을 GitHub Pages와 JSON 스키마 검사로 만들었습니다.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "멀티 모듈", "Clean Architecture", "Hilt", "Retrofit", "Coroutines", "Flow", "DataStore", "ML Kit GenAI", "Custom Lint", "Macrobenchmark", "GitHub Actions"],
    links: [
      { label: "GitHub", href: "https://github.com/UMC-PRODUCT/umc-product-android" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.umc.product" },
      { label: "원격 설정 저장소", href: "https://github.com/UMC-PRODUCT/umc-product-android-config" },
    ],
    icon: icon("umc", "UMC 앱 아이콘"),
    imageLayout: "phone",
    images: [],
  },
  {
    slug: "damoim",
    name: "다모임",
    tagline: "동아리장과 운영진을 위한 동아리 운영 앱, 기획부터 서버 배포까지 혼자",
    kind: "개인",
    platform: "Android, iOS, 서버",
    period: "2026.07 - 진행 중",
    year: 2026,
    featured: true,
    role: "기획, 디자인, 앱, 서버, DB, 배포 전부",
    status: "전 기능 구현과 서버 연동 완료, 출시 준비 중",
    summary: [
      "공지는 오픈채팅에 묻히고, 자료는 카페에 흩어지고, 명부는 엑셀로 따로 관리되는 문제를 동아리를 운영하며 직접 겪었습니다. 대상을 동아리장과 운영진으로 좁혀 전용 앱으로 만들고 있습니다.",
      "86개 화면을 직접 디자인하고, Compose Multiplatform 앱(Android, iOS)과 Spring Boot 서버를 만들어 집 PC에서 Docker로 운영합니다. 화면 42개, REST API 99개, 테이블 39개 규모입니다.",
    ],
    features: [
      "카카오 로그인과 가입 코드 신청, 운영진 승인",
      "동아리 생성과 여러 동아리 간 전환",
      "게시판(투표, 모집, 댓글, 첨부, 검색)과 자료실",
      "기수, 회원, 운영진 세부 권한 관리",
      "일정과 동적 신청폼, 정원 관리",
      "구독과 인앱 결제, FCM 푸시",
    ],
    myWork: [
      "기획과 디자인 시안 86개 화면",
      "CMP 앱: 직접 만든 MVI-lite로 38개 화면 패턴 통일, expect/actual 브릿지 8종",
      "Spring Boot 서버: 카카오 OAuth, JWT 리프레시 토큰 회전, presigned URL 업로드, 레이트 리밋",
      "PostgreSQL과 Flyway 마이그레이션, Docker Compose 자가 호스팅, Tailscale Funnel",
    ],
    highlights: [
      "Kakao SDK와 StoreKit은 Swift가 Kotlin 인터페이스를 구현해 등록하는 방식으로 붙여 commonMain에 SDK 의존성이 없습니다.",
      "파일은 서버를 거치지 않고 스토리지로 바로 올라가고, 서버는 실제 크기만 다시 확인합니다.",
    ],
    stack: ["Compose Multiplatform", "Ktor Client", "MVI-lite", "Kakao SDK", "StoreKit 2", "FCM", "Spring Boot 3", "Kotlin", "PostgreSQL 16", "JPA", "Flyway", "AWS S3", "Docker", "Tailscale"],
    links: [
      { label: "앱 GitHub", href: "https://github.com/rudtjr1106/damoim" },
      { label: "서버 GitHub", href: "https://github.com/rudtjr1106/damoim-server" },
    ],
    icon: icon("damoim", "다모임 앱 아이콘"),
    imageLayout: "phone",
    images: [
      { src: "/work/damoim/05-home.webp", w: 560, h: 1200, alt: "다모임 동아리장 홈. 회원 수, 가입 신청 대기, 다가오는 일정, 게시판 요약", caption: "동아리장 홈" },
      { src: "/work/damoim/14-post-detail.webp", w: 560, h: 1200, alt: "다모임 게시글 상세. 투표와 댓글", caption: "게시글과 투표" },
      { src: "/work/damoim/21-schedule.webp", w: 560, h: 1200, alt: "다모임 일정과 이벤트 신청", caption: "일정 신청" },
      { src: "/work/damoim/09-join-approval.webp", w: 560, h: 1200, alt: "다모임 가입 신청 승인 화면", caption: "가입 승인" },
      { src: "/work/damoim/19-cohorts.webp", w: 560, h: 1200, alt: "다모임 기수 관리 화면", caption: "기수 관리" },
      { src: "/work/damoim/67-resources.webp", w: 560, h: 1200, alt: "다모임 자료실 화면", caption: "자료실" },
      { src: "/work/damoim/30-staff-perms.webp", w: 560, h: 1200, alt: "다모임 운영진 권한 설정 화면", caption: "운영진 권한" },
      { src: "/work/damoim/27-subscription.webp", w: 560, h: 1200, alt: "다모임 구독 결제 화면", caption: "구독" },
      { src: "/work/damoim/01-login.webp", w: 560, h: 1200, alt: "다모임 카카오 로그인 화면", caption: "로그인" },
    ],
    imageNote: "직접 그린 디자인 시안입니다. 앱은 같은 화면을 실제 서버 데이터로 띄웁니다.",
  },
  {
    slug: "poketdesktop",
    name: "포스크탑",
    tagline: "바탕화면을 걸어다니는 포켓몬을 잡고 키우고 대전하는 데스크톱 게임",
    kind: "개인",
    platform: "Windows, macOS, 서버",
    period: "2026.08 - 2026.09",
    year: 2026,
    featured: true,
    role: "게임 클라이언트, 서버, 배포, 자동 업데이트 전부",
    status: "릴리즈 66개, 설치 파일 다운로드 1,275회",
    summary: [
      "바탕화면 위를 도트 포켓몬이 걸어다니고, 5-7분마다 야생 포켓몬이 나타나 잡을 수 있는 데스크톱 게임입니다.",
      "Python 클라이언트와 FastAPI 서버를 혼자 만들었고, 서명·공증된 설치 파일과 자동 업데이트까지 붙여 실제 사용자에게 배포하고 있습니다.",
    ],
    features: [
      "바탕화면 위를 걷는 도트 포켓몬 (1,025종 중 982종)",
      "볼 21종과 서버가 계산하는 상황별 포획 배율",
      "전국 시군구 256곳의 관장과 6대6 턴제 배틀",
      "비동기 PvP(랜덤, 친구)와 랭킹",
      "도감, 기술머신 358개, 도구 212종, 특성 167종",
      "자동 업데이트와 자동 시작",
    ],
    myWork: [
      "tkinter와 PyObjC로 만든 투명 창 클라이언트 (Windows 트레이, macOS 메뉴 막대)",
      "클라이언트와 서버가 공유하는 배틀 로직, 상성 기반 교체 AI",
      "FastAPI 서버와 SQLite/Turso, Docker 배포",
      "PyInstaller 빌드, Apple 서명과 공증, GitHub Actions 릴리즈와 매일 암호화 백업",
    ],
    highlights: [
      "macOS에서는 Tk가 투명 창에 그리지 못해 CALayer로 직접 그렸습니다.",
      "교체 AI는 순서대로 내보내는 방식과 600판을 붙여 검증했습니다.",
    ],
    stack: ["Python", "tkinter", "PyObjC", "FastAPI", "SQLite", "Turso", "Docker", "PyInstaller", "GitHub Actions"],
    links: [
      { label: "GitHub", href: "https://github.com/rudtjr1106/poketdesktop" },
      { label: "최신 릴리즈", href: "https://github.com/rudtjr1106/poketdesktop/releases/latest" },
    ],
    icon: { src: "/work/icons/poketdesktop.webp", w: 128, h: 128, alt: "포스크탑 아이콘" },
    imageLayout: "desktop",
    images: [
      { src: "/work/poketdesktop/mac-desktop.webp", w: 627, h: 411, alt: "macOS 바탕화면 위를 도트 포켓몬들이 걸어다니는 모습", caption: "바탕화면 위의 포켓몬" },
      { src: "/work/poketdesktop/gym-map.webp", w: 1040, h: 728, alt: "전국 시군구 관장 지도 화면", caption: "전국 관장 지도" },
      { src: "/work/poketdesktop/gym-battle.webp", w: 1032, h: 663, alt: "6대6 턴제 배틀 화면", caption: "관장 배틀" },
      { src: "/work/poketdesktop/dex.webp", w: 1040, h: 728, alt: "포켓몬 도감 화면", caption: "도감" },
      { src: "/work/poketdesktop/shop.webp", w: 1040, h: 728, alt: "상점 화면", caption: "상점" },
      { src: "/work/poketdesktop/walk-directions.webp", w: 872, h: 680, alt: "네 방향으로 걷는 도트 스프라이트 표", caption: "방향별 걷기 도트" },
    ],
    note: "포켓몬은 Nintendo, Game Freak, Creatures의 상표입니다. 비상업 팬 프로젝트이며 도트는 CC BY-NC 4.0입니다.",
  },
  {
    slug: "switchboard",
    name: "스위치보드",
    nameNote: "Switchboard",
    tagline: "Android 원격 설정을 폼으로 편집하고 PR부터 배포까지 대신 해 주는 데스크톱 앱",
    kind: "개인",
    platform: "macOS, Windows",
    period: "2026.09",
    year: 2026,
    featured: true,
    role: "기획, 디자인, 개발, 배포 전부",
    status: "v1.0.3 릴리즈",
    summary: [
      "UMC 앱의 원격 설정(GitHub Pages의 JSON 파일)을 사람이 JSON을 직접 고치지 않고 폼으로 바꿀 수 있게 만든 데스크톱 앱입니다.",
      "변경하면 PR을 만들고, 스키마 검증이 통과하면 머지와 배포까지 대신 진행합니다. Compose Multiplatform Desktop으로 만들었습니다.",
    ],
    features: [
      "GitHub 로그인 (OAuth Device Flow, gh CLI 토큰, PAT)",
      "설정 저장소 자동 생성: 스키마, 검증 워크플로, GitHub Pages, main 보호 규칙",
      "폼 편집과 Android 화면 미리보기, 입력 즉시 스키마 검사",
      "실패하면 PR과 브랜치를 정리하는 안전한 적용",
      "Android 프로젝트를 스캔해 화면 목록을 찾고 연동 코드 13개 파일 생성",
      "기기 안의 로컬 LLM(Gemma 3)으로 안내 문구 초안 작성",
    ],
    myWork: [
      "core:config, core:github, core:ai, core:scanner, app 5개 모듈 구성",
      "내비게이션(Navigation 3, 타입 세이프, XML), DI, HTTP 라이브러리를 감지하는 프로젝트 스캐너",
      "jpackage로 DMG와 MSI 생성, macOS 서명과 공증, 서명을 확인하는 자동 업데이트",
      "UMC 화면 34개를 정답 세트로 둔 AI 평가 하네스와 테스트 파일 74개",
    ],
    stack: ["Kotlin", "Compose Multiplatform Desktop", "Coroutines", "Ktor", "Koin", "llama.cpp", "JSON Schema", "jpackage", "GitHub Actions"],
    links: [{ label: "GitHub", href: "https://github.com/rudtjr1106/switchboard" }],
    icon: { src: "/work/icons/switchboard.webp", w: 256, h: 256, alt: "스위치보드 아이콘" },
    imageLayout: "desktop",
    images: [
      { src: "/work/switchboard/editor.webp", w: 1400, h: 875, alt: "스위치보드 편집기. 왼쪽에 설정 폼, 오른쪽에 Android 미리보기", caption: "편집과 Android 미리보기" },
      { src: "/work/switchboard/setup-3-labeling.webp", w: 1600, h: 1000, alt: "Android 프로젝트에서 찾은 화면에 이름을 붙이는 단계", caption: "화면 라벨링" },
      { src: "/work/switchboard/setup-4-plan.webp", w: 1600, h: 1000, alt: "생성할 연동 코드 파일 목록과 미리보기", caption: "연동 코드 생성" },
      { src: "/work/switchboard/apply-dialog.webp", w: 1400, h: 875, alt: "변경 사항 적용 확인 창", caption: "적용 전 확인" },
      { src: "/work/switchboard/login-device-code.webp", w: 1400, h: 875, alt: "GitHub 기기 코드 로그인 화면", caption: "GitHub 로그인" },
    ],
  },
  {
    slug: "hugg",
    name: "허그",
    nameNote: "FOREGG",
    tagline: "부부가 함께 쓰는 난임 시술 일정과 기록 관리 앱",
    kind: "팀",
    platform: "Android",
    period: "2024.04 - 2025.03",
    year: 2024,
    team: "7명 (Android 2)",
    role: "Android 주 개발 (커밋 약 60%): 구조 설계, 공통 컴포넌트, 캘린더, 가계부, 마이페이지, 알림",
    status: "Google Play 출시, 약 6개월 운영, 약 100명 실사용",
    summary: [
      "난임 치료를 받는 부부가 주사, 약, 병원 일정과 비용, 하루 기록을 함께 남기는 앱입니다.",
      "XML View로 출시한 뒤 Jetpack Compose와 feature 단위 멀티 모듈로 다시 만들었습니다. 서버 운영비 부담으로 서비스를 닫았습니다.",
    ],
    features: [
      "온보딩과 배우자 공유 코드로 부부 연결",
      "캘린더: 주사, 약, 병원 일정과 알람",
      "가계부: 회차별, 월별 지출과 지원금",
      "데일리 허그: 하루 기록과 남편의 답장",
      "챌린지와 난임 정보",
    ],
    myWork: [
      "멀티 모듈 Clean Architecture 세팅과 공통 TabBar, Dialog, Toast",
      "캘린더(일정 우선순위 정렬, 칸 높이 확장), 가계부, 마이페이지",
      "주사·약 정확한 알람, FCM과 알림 탭 시 화면 이동",
      "Compose 버전: 공통 컴포넌트, 홈의 오늘 일정 페이저, 남편 모드, 연타 방지 Modifier",
    ],
    highlights: [
      "라이브러리 없이 ViewPager2 코드를 분석해 겹치는 카드 캐러셀을 구현했습니다.",
      "시스템 글꼴 크기에 영향받지 않는 타이포그래피로 큰 글꼴 기기의 레이아웃 깨짐을 막았습니다.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "XML View", "Clean Architecture", "MVVM", "멀티 모듈", "Hilt", "Retrofit", "Coroutines", "Flow", "DataStore", "FCM", "Firebase Analytics"],
    links: [
      { label: "GitHub (XML)", href: "https://github.com/FOREGG-DEV/FOREGG_Android" },
      { label: "GitHub (Compose)", href: "https://github.com/FOREGG-DEV/FOREGG_ANDROID_COMPOSE" },
    ],
    icon: icon("hugg", "허그 앱 아이콘"),
    imageLayout: "phone",
    images: [
      { src: "/work/hugg/home.webp", w: 720, h: 1600, alt: "허그 홈 화면. 오늘 일정과 생활습관 챌린지", caption: "홈" },
      { src: "/work/hugg/calendar.webp", w: 720, h: 1600, alt: "허그 캘린더 화면", caption: "캘린더" },
      { src: "/work/hugg/daily.webp", w: 720, h: 1600, alt: "허그 데일리 허그 화면. 오늘의 답변과 남편의 답장", caption: "데일리 허그" },
      { src: "/work/hugg/budget.webp", w: 720, h: 1600, alt: "허그 가계부 화면", caption: "가계부" },
      { src: "/work/hugg/challenge.webp", w: 720, h: 1600, alt: "허그 챌린지 화면. 하루에 30분 이상 걷기", caption: "챌린지" },
      { src: "/work/hugg/mypage.webp", w: 720, h: 1600, alt: "허그 마이페이지 화면", caption: "마이페이지" },
    ],
  },
  {
    slug: "plub",
    name: "PLUB",
    tagline: "취미와 관심사로 사람을 잇는 소모임 커뮤니티 앱",
    kind: "팀",
    platform: "Android",
    period: "2022.01 - 2023.06",
    year: 2022,
    team: "14명 (Android 3)",
    role: "메인 홈, 검색, 북마크, 모집 글 상세, 아카이브, 마이페이지, 신고, 설정",
    status: "개발 완료, 팀 사정으로 정식 출시 전 마무리",
    summary: [
      "14명이 함께한 첫 대규모 협업입니다. Activity만 다루던 때에 들어가 멀티 모듈, Hilt, Flow를 처음 익혔고, Android 3명 중 커밋 수 1위(611개)였습니다.",
      "초기 프로토타입에서는 네이버 로그인과 네이버 지도를 붙였고, 본 앱에서는 모집과 활동 흐름의 주요 화면을 맡았습니다.",
    ],
    features: [
      "관심사 카테고리별 모임 탐색과 인원 필터",
      "모집 글 상세와 지원, 호스트의 지원자 관리",
      "모임 아카이브와 할 일 체크",
      "북마크, 검색, 신고",
    ],
    myWork: [
      "모임 홈(호스트, 게스트 분리)과 카테고리별 모임",
      "모집 글 바텀시트와 호스트 상세, 지원자 응답",
      "아카이브 업로드, 마이페이지(모집 중, 대기 중, 활동 중 모임), 프로필 설정",
      "공통 Toast, 로딩 다이얼로그, 커서 기반 무한 스크롤",
    ],
    stack: ["Kotlin", "멀티 모듈", "MVVM", "Hilt", "Retrofit", "Coroutines", "Flow", "DataBinding", "Room", "Paging", "Navigation", "FCM"],
    links: [{ label: "GitHub", href: "https://github.com/PLUB2022/PLUB-Android" }],
    icon: icon("plub", "PLUB 앱 아이콘"),
    imageLayout: "phone",
    images: [
      { src: "/work/plub/home.webp", w: 188, h: 376, alt: "PLUB 메인 홈 화면", caption: "메인 홈" },
      { src: "/work/plub/bookmark.webp", w: 188, h: 376, alt: "PLUB 북마크 화면", caption: "북마크" },
      { src: "/work/plub/detail.webp", w: 180, h: 360, alt: "PLUB 모집 글 상세 화면", caption: "모집 글 상세" },
    ],
    imageNote: "당시 캡처라 해상도가 낮습니다.",
  },
  {
    slug: "what-is-that",
    name: "What is That?",
    tagline: "XR 글래스로 바라본 사물을 인식해 제품 정보 카드를 시야에 띄우는 앱",
    kind: "팀",
    platform: "Meta Quest (Unity XR)",
    period: "2026.08",
    year: 2026,
    team: "팀 '개발자 전설이 되다'",
    role: "Unity XR 클라이언트 전체, 백엔드 일부",
    status: "2026 AI·가상융합(XR) 서비스 개발자 경진대회 출품",
    summary: [
      "XR 글래스를 쓰고 사물을 바라보면 앱 안에서 바로 사물을 인식하고, 제품 정보 카드를 시야에 띄워 주는 앱입니다.",
    ],
    features: [
      "시선이 350ms 머문 사물을 지목",
      "앱 안에서 돌아가는 ONNX 사물 인식",
      "제품 정보 카드와 추적 ID 기반 캐시",
    ],
    myWork: [
      "카메라 프레임 확보와 Unity Inference Engine으로 YOLO 모델 추론",
      "정보 카드 UI, 다른 물건에 정보가 잘못 붙던 문제를 추적 ID 캐시로 해결",
      "웹캠 테스트, Quest, 폰 세 가지 빌드",
      "FastAPI와 Gemini 백엔드의 응답 지연 개선과 엔드포인트 보호",
    ],
    stack: ["Unity", "C#", "OpenXR", "ONNX", "YOLO", "FastAPI", "Gemini API", "Docker"],
    links: [],
    images: [],
    note: "팀 비공개 저장소라 코드 링크는 없습니다.",
  },
  {
    slug: "scoi",
    name: "SCOI",
    tagline: "스테이블 코인으로 결제하고 송금하는 앱 (UMC 프로젝트)",
    kind: "팀",
    platform: "Android",
    period: "2025.12 - 2026.02",
    year: 2025,
    team: "Android 4명",
    role: "프로젝트 구조 설계, 공통 컴포넌트, 충전 파트 (Android 커밋 약 50%)",
    status: "UMC 프로젝트",
    summary: ["한국형 스테이블 코인으로 결제와 송금을 하는 플랫폼의 Android 앱입니다."],
    features: ["회원가입과 로그인", "송금과 계좌 이체", "USDT, USDC 충전과 환전, 입금 주소 생성", "내 지갑과 실시간 차트"],
    myWork: ["프로젝트 구조와 공통 컴포넌트", "충전·투자 API 연동, 입금 주소 생성, 충전 바텀시트와 완료 화면", "메인, 스플래시, 마이페이지 연결"],
    stack: ["Kotlin", "XML View", "DataBinding", "Hilt", "Retrofit", "Coroutines", "Navigation", "FCM"],
    links: [{ label: "GitHub", href: "https://github.com/UMCSCOI/Android" }],
    images: [],
  },
  {
    slug: "landrop",
    name: "LanDrop",
    tagline: "같은 공유기에 있는 내 기기끼리 서버 없이 파일과 텍스트를 주고받는 도구",
    kind: "개인",
    platform: "Windows, 브라우저",
    period: "2026.08",
    year: 2026,
    role: "개발 전부",
    status: "v1.2.0 릴리즈, MIT",
    summary: ["같은 공유기에 있는 내 기기끼리 서버 없이 파일을 주고받으려고 만들었습니다. 실행하면 같은 공유기의 기기를 찾고, 휴대폰은 QR로 접속합니다."],
    features: ["기기 자동 발견 (2초마다 알리고 8초 조용하면 목록에서 제외)", "256KB씩 흘려보내 10GB도 메모리 일정", "QR과 landrop.local 주소로 접속", "클립보드 텍스트 공유와 폴더 기반 공유함", "보내기 전에 암호를 확인하는 사전 검증"],
    myWork: ["Python 표준 라이브러리 HTTP 서버와 UDP 브로드캐스트, mDNS", "오프라인에서도 동작하는 내장 웹 UI", "백신 오탐을 줄이는 PyInstaller 빌드 설정"],
    stack: ["Python", "HTTP", "UDP", "mDNS", "PyInstaller"],
    links: [{ label: "GitHub", href: "https://github.com/rudtjr1106/LanDrop" }],
    images: [],
  },
  {
    slug: "hanbang-macro",
    name: "한의원 차팅 자동화",
    tagline: "한의원의 반복적인 진료 기록(차팅) 작업을 자동화하는 프로그램",
    kind: "개인",
    platform: "Windows",
    period: "2026.01",
    year: 2026,
    role: "개발",
    status: "개인 프로젝트",
    summary: ["한의원에서 매번 손으로 반복하던 차팅 입력을 자동으로 처리하는 프로그램입니다."],
    features: ["반복 차팅 입력 자동화"],
    myWork: ["Python으로 작성"],
    stack: ["Python"],
    links: [{ label: "GitHub", href: "https://github.com/rudtjr1106/hanbangmacro" }],
    images: [],
  },
  {
    slug: "darestory",
    name: "달의 이야기",
    tagline: "짧은 산문을 쓰고 책으로 토론하는 글쓰기 커뮤니티 앱",
    kind: "개인",
    platform: "Android",
    period: "2024.02 - 2024.04",
    year: 2024,
    role: "기획부터 개발까지 혼자 (131커밋)",
    status: "개인 프로젝트",
    summary: ["Firebase를 백엔드로 혼자 완성한 첫 개인 앱입니다. 멀티 모듈과 MVVM을 스스로 세팅해 본 프로젝트입니다."],
    features: ["이메일 가입과 인증, 자동 로그인", "오늘의 산문, 정렬, 검색", "산문 쓰기, 좋아요, 댓글", "토론장: 네이버 책 검색, 대댓글", "나만의 책, 신고, 알림 설정"],
    myWork: ["presentation, domain, data 멀티 모듈과 buildSrc", "Firebase Auth, Realtime Database, FCM 연동 (Firestore에서 전환)", "Room으로 최근 검색어, 네이버 책 검색 API 연동"],
    stack: ["Kotlin", "XML View", "DataBinding", "멀티 모듈", "MVVM", "Hilt", "Coroutines", "Firebase", "Room"],
    links: [{ label: "GitHub", href: "https://github.com/rudtjr1106/DareStory" }],
    images: [],
  },
  {
    slug: "maedeup",
    name: "매듭",
    tagline: "팀 프로젝트 팀원을 쉽게 구하기 위한 앱",
    kind: "개인",
    platform: "Android",
    period: "2024.03",
    year: 2024,
    role: "서버 없이 혼자 개발",
    status: "개인 프로젝트",
    summary: ["팀 프로젝트 팀원을 구하기 어렵다는 문제에서 시작해, 서버 없이 Firebase만으로 만든 앱입니다."],
    features: ["카카오 로그인과 자동 로그인", "실시간 채팅"],
    myWork: ["Firebase Functions가 카카오 사용자 API를 호출하고 Custom Token으로 Firebase 인증을 잇는 로그인", "Realtime Database 채팅을 callbackFlow로 구독"],
    stack: ["Kotlin", "Firebase Functions", "Firebase Auth", "Realtime Database", "Coroutines"],
    links: [],
    images: [],
    note: "과정은 공부 기록에 정리했습니다.",
  },
  {
    slug: "volunteer",
    name: "봉사활동 앱",
    tagline: "1365 봉사 정보 조회와 신청, 기록 캘린더를 담은 학부 팀 프로젝트",
    kind: "팀",
    platform: "Android",
    period: "2021.10 - 2021.12",
    year: 2021,
    team: "5명",
    role: "프로필, 캘린더, 푸시 알림, 즐겨찾기",
    status: "학부 팀 프로젝트",
    summary: ["Android를 처음 시작한 프로젝트입니다. 공공데이터 봉사참여정보 API와 Firebase로 만들었습니다."],
    features: ["봉사 정보 조회와 신청", "봉사 기록 캘린더", "커뮤니티와 그룹 채팅"],
    myWork: ["프로필과 프로필 이미지, 설정", "신청한 봉사 기록 캘린더", "봉사 신청과 채팅 푸시 알림", "즐겨찾기와 홈 배너"],
    stack: ["Kotlin", "XML View", "Firebase", "MPAndroidChart"],
    links: [{ label: "GitHub", href: "https://github.com/pdh90345/VolunteerApp" }],
    images: [],
  },
];

export const study: Study[] = [
  {
    slug: "container-runtime",
    title: "컨테이너 런타임과 학습 데이터 입력 성능",
    short: "Apptainer, Podman, Enroot에서 ResNet-50 학습의 입력 파이프라인을 따로 떼어 측정한 연구",
    area: "인프라·연구",
    source: "Notion, 지능형데이터처리 연구실",
    period: "2026.03 - 진행 중",
    featured: true,
    summary: [
      "연구실에서 컨테이너 런타임별로 딥러닝 학습의 데이터 입력 성능이 어떻게 다른지 측정하고 있습니다.",
      "선행 연구는 Enroot와 Apptainer의 차이를 입력과 GPU 연산이 합쳐진 값으로만 보고했습니다. 그 차이가 데이터를 읽고 디코딩해 GPU로 넘기는 입력 계층에서 오는지 보려고, 단일 노드에서 입력 계층만 따로 쟀습니다.",
    ],
    topics: ["Apptainer", "Podman", "Enroot", "user namespace", "SIF와 squashfs", "overlayfs와 FUSE", "PyTorch DataLoader", "strace", "실험 설계"],
    sections: [
      {
        heading: "Apptainer를 뜯어본 것",
        items: [
          "데몬 없음, 컨테이너 안팎이 같은 사용자, SIF 단일 파일, 격리보다 통합이라는 네 가지 특징을 커널 원리(user namespace, uid_map, NoNewPrivs, squashfuse)와 함께 정리",
          "GPU 연동(--nv), Slurm과 MPI 연동, Docker, Podman, Apptainer, Enroot 비교",
          "uid_map, 네임스페이스 inode, SIF 안의 squashfs, 서명한 SIF의 변조 탐지를 직접 확인하는 데모",
        ],
      },
      {
        heading: "실험",
        items: [
          "Ryzen 9 9950X, RTX 5070, Ubuntu 24.04에서 host, Podman, Apptainer, Enroot를 마운트 방식까지 나눈 7개 조건 비교",
          "GPU 연산을 뺀 공급 처리량, 실제 학습 처리량, 입력 비용을 0으로 둔 수요 처리량을 나눠 측정",
          "시나리오 스크립트, 실행기, 보고서 생성기로 된 벤치마크 킷 container-dl-bench를 직접 제작",
        ],
      },
      {
        heading: "알게 된 것",
        items: [
          "성능을 가른 건 런타임이 아니라 데이터 경로(커널 경로냐 FUSE냐)였습니다. ext4 대비 fuse-overlayfs의 파일 접근 처리량은 -64.8%였고, 런타임 사이 차이는 재현 오차(약 ±3%) 안이었습니다.",
          "비용은 데이터를 옮기는 read가 아니라 openat, newfstatat처럼 경로를 해석하는 단계에 있었습니다.",
          "/proc을 도는 모니터링 도구가 일부 런타임에만 부담을 줘, 끄자 Apptainer가 5.06% 빨라졌습니다. 재는 도구가 결과를 바꿀 수 있다는 걸 배웠습니다.",
          "빈 컨테이너 기동은 Apptainer가 133ms로 가장 빨랐지만 import torch까지 재면 2,392ms로 가장 느렸습니다. 무엇을 기동 완료로 보느냐에 따라 순위가 바뀝니다.",
        ],
      },
    ],
    caveat: "단일 노드, 단일 GPU에서의 결과이고 원인 분석을 이어 가고 있습니다.",
  },
  {
    slug: "docker-basics",
    title: "도커와 컨테이너 기초",
    short: "가상 머신과 컨테이너의 차이, 도커를 쓰는 이유, 마이크로서비스와 오케스트레이션",
    area: "인프라·연구",
    source: "Notion",
    period: "2026.04",
    summary: ["연구를 시작하며 도커와 컨테이너의 기본을 정리했습니다. 이후 다모임 서버와 포스크탑 서버는 Docker로 배포했습니다."],
    topics: ["Docker Engine", "하이퍼바이저와 컨테이너", "namespace, cgroup, chroot", "모놀리스와 마이크로서비스", "오케스트레이션"],
    sections: [
      {
        heading: "정리한 내용",
        items: [
          "컨테이너는 호스트 커널을 공유하고 namespace, cgroup, chroot로 프로세스 단위 격리를 만들어 하이퍼바이저 방식보다 성능 손실과 이미지 크기가 작다",
          "컨테이너 안에서 무엇을 설치하고 바꿔도 호스트 OS에 영향이 없고, 배포는 이미지를 전달하는 것으로 끝난다",
          "마이크로서비스는 모듈을 독립적으로 구성해 변화에 빠르게 대응하고, 보통 도커 스웜이나 쿠버네티스 같은 오케스트레이션 플랫폼으로 운영한다",
        ],
      },
    ],
    related: "damoim",
  },
  {
    slug: "compose-study",
    title: "Jetpack Compose 스터디",
    short: "기본 컴포넌트부터 Recomposition, State Hoisting, CompositionLocal까지 날짜별 정리",
    area: "Android",
    source: "GitHub Compose-Study",
    period: "2024.06 - 2024.07",
    featured: true,
    summary: ["XML View만 쓰다 Compose로 넘어가며 2주 동안 날짜별로 정리한 스터디 노트입니다. 스터디를 마친 직후 허그를 Compose로 다시 만들기 시작했습니다."],
    topics: ["Text, Surface, Box, Row, Column", "BoxWithConstraints", "Slot API", "Recomposition", "ConstraintLayout", "Dialog, SnackBar, BottomAppBar", "State Hoisting", "Crossfade", "ViewModel과 LiveData", "CompositionLocal과 Theme"],
    sections: [
      { heading: "6월 20일, 21일", items: ["Text, Surface, Box, Row, Column, BoxWithConstraints, Image", "CheckBox와 Slot API"] },
      { heading: "6월 24일, 28일", items: ["Recomposition과 스마트 Recomposition", "ConstraintLayout", "Dialog, DropdownMenu, SnackBar, BottomAppBar", "State Hoisting"] },
      { heading: "7월 1일 - 3일", items: ["TODO 앱 실습", "Crossfade와 텍스트 변경 애니메이션", "ViewModel, LiveData, CompositionLocal과 Theme"] },
    ],
    links: [{ label: "GitHub", href: "https://github.com/rudtjr1106/Compose-Study" }],
    related: "hugg",
  },
  {
    slug: "overlap-viewpager",
    title: "라이브러리 없이 겹치는 카드 캐러셀 만들기",
    short: "ViewPager2 내부 구조를 분석해 가운데 카드가 앞으로 나오는 캐러셀을 직접 구현",
    area: "Android",
    source: "Notion",
    period: "2024",
    summary: ["이전 프로젝트에서 라이브러리로도 구현하지 못했던 겹치는 카드 디자인을 허그에서 다시 만나, 이번에는 ViewPager2 코드를 직접 읽고 구현했습니다."],
    topics: ["ViewPager2", "RecyclerView", "PageTransformer", "clipToPadding", "translationZ"],
    sections: [
      {
        heading: "구현 방법",
        items: [
          "내부 RecyclerView에 좌우 padding과 clipToPadding=false, offscreenPageLimit=2로 양옆 카드를 보이게",
          "PageTransformer에서 위치에 따라 scale과 alpha를 0.5, 0.7, 1.0 사이로 보간하고 translationX로 겹치게",
          "OnPageChangeCallback에서 translationZ를 조정해 가운데 카드를 맨 위로",
        ],
      },
      { heading: "헤맨 부분", items: ["when 분기 순서를 잘못 두면 오른쪽 두 번째 카드 처리로 가지 않아 판별 순서를 바로잡았습니다."] },
    ],
    related: "hugg",
  },
  {
    slug: "firebase-kakao",
    title: "서버 없이 Firebase로 카카오 로그인과 채팅 붙이기",
    short: "Firebase Functions와 Custom Token으로 카카오 로그인, callbackFlow로 실시간 채팅",
    area: "Android",
    source: "Notion",
    period: "2024.03",
    summary: ["서버 없이 혼자 만든 앱 '매듭'에서 막혔던 두 가지를 정리했습니다."],
    topics: ["Firebase Functions", "Custom Token", "Kakao 로그인", "Realtime Database", "suspendCoroutine", "callbackFlow"],
    sections: [
      {
        heading: "카카오 로그인",
        items: [
          "이메일과 회원번호로 가입시키는 방식은 기기 변경과 자동 로그인 문제로 버림",
          "Firebase Functions에서 카카오 사용자 API를 호출하고, 서비스 계정으로 초기화해 Access Denied 해결",
          "createCustomToken으로 받은 토큰으로 Firebase 로그인과 자동 로그인 구현",
        ],
      },
      {
        heading: "실시간 채팅",
        items: ["값이 계속 들어오는 리스너를 suspendCoroutine으로 감싸 'Already resumed' 오류가 남", "callbackFlow와 awaitClose로 바꿔 스트림으로 구독"],
      },
    ],
    related: "maedeup",
  },
  {
    slug: "android-interview",
    title: "Android 면접 기술 질문 정리",
    short: "4대 컴포넌트, Context, 생명주기부터 코루틴, Hilt, DiffUtil까지 23개 질문",
    area: "Android",
    source: "Notion",
    period: "2025",
    summary: ["면접을 준비하며 자주 나오는 Android와 Kotlin 질문을 모아 스스로 답을 달아 보고 있습니다. 아직 답을 채우는 중인 질문도 있습니다."],
    topics: ["4대 컴포넌트", "Application Context와 Activity Context", "ViewModel과 AndroidViewModel", "sealed class와 enum", "Repository 패턴", "data class의 copy", "Service 재시작 정책", "Activity, Fragment 생명주기", "lateinit과 by lazy", "remember와 mutableState", "LaunchedEffect", "코루틴 동시성과 병렬성", "Hilt의 @Binds와 @Provides", "의존성 주입", "DiffUtil"],
  },
  {
    slug: "android-radar",
    title: "Android 레이더",
    short: "매주 월요일 공식 소스에서 Compose, Kotlin, 빌드 변화만 골라 요약하는 동향 노트",
    area: "Android",
    source: "Notion (자동화)",
    period: "2026.08 - 현재",
    featured: true,
    summary: [
      "AndroidX 릴리스 노트, Android Developers Blog, Android Studio 블로그, Kotlin Blog, Android Weekly, compose-rules 릴리스 같은 공식 소스를 매주 모아, Compose와 Kotlin, 빌드, AI 도구와 관련된 변화만 한국어로 요약하는 자동화입니다.",
      "항목마다 왜 중요한지와, Lint 규칙이나 코딩 에이전트 규칙으로 옮길 만한 후보를 함께 적어 둡니다.",
    ],
    topics: ["Kotlin 2.4.20", "Compose 1.12", "Navigation 3", "Room 2.8", "compose-rules", "Android Studio", "DroidKaigi 2026"],
    sections: [
      {
        heading: "최근에 쌓인 항목",
        items: [
          "Kotlin 2.4.20 출시",
          "compose-rules 0.6.5의 새 규칙 UnnecessaryLaunchedEffect, MissingNonRestartableComposable",
          "Compose 1.12.1과 Navigation 2.10.1 패치",
          "Navigation3 1.2.0-rc01, 딥링크 API 안정화 직전",
          "Room 2.8.5, 닫힌 DB에 쿼리하면 IllegalStateException",
          "DroidKaigi 2026: Compose는 도입에서 숙련으로",
        ],
      },
    ],
  },
  {
    slug: "umc-workbook",
    title: "UMC Android 워크북",
    short: "챌린저로 풀고, 파트장으로 다시 쓴 주차별 Android 커리큘럼",
    area: "협업·교육",
    source: "GitHub",
    period: "2025.09 - 2026.05",
    summary: [
      "UMC 9기에서는 챌린저로 FLO 음악 앱을 클론하며 10주 워크북을 풀었고, 10기에서는 중앙 Android 파트장으로 XML 전용이던 공식 워크북을 XML과 Compose를 함께 다루고 옮기는 과정까지 배우는 커리큘럼으로 개편했습니다.",
    ],
    topics: ["XML View", "ViewPager", "RecyclerView", "Jetpack Compose", "Navigation Compose", "DataStore", "Retrofit"],
    sections: [
      { heading: "9기 챌린저 (2025.09 - 2025.11)", items: ["FLO 음악 앱 클론, 1-10주차 미션", "XML, ViewPager, RecyclerView"] },
      { heading: "10기 워크북 (2026.03 - 2026.05)", items: ["신발 쇼핑 앱 클론: 홈, 구매, 위시리스트, 장바구니, 프로필", "초반은 XML과 Navigation, 9주차에는 Compose와 Navigation Compose로 전환", "DataStore, Retrofit, Coil"] },
    ],
    links: [
      { label: "10기 워크북", href: "https://github.com/rudtjr1106/UMC-10th-Android-workbook" },
      { label: "9기 미션", href: "https://github.com/UMC-MJU/9th_Android" },
    ],
    related: "umc",
  },
  {
    slug: "reading-study",
    title: "클린 코드, 코틀린 인 액션 스터디",
    short: "PLUB 팀에서 함께한 책 스터디",
    area: "Kotlin",
    source: "GitHub (PLUB2022)",
    period: "2022.09 - 2023.04",
    summary: ["PLUB 팀원들과 『클린 코드』를 3주 동안 1장부터 10장까지 읽고, 『코틀린 인 액션』을 챕터별로 정리했습니다."],
    topics: ["의미 있는 이름", "함수", "주석과 형식", "객체와 자료 구조", "오류 처리", "코틀린이란 무엇이며 왜 필요한가", "클래스, 객체, 인터페이스"],
    links: [
      { label: "클린 코드 스터디", href: "https://github.com/PLUB2022/Clean-Code-Study" },
      { label: "코틀린 인 액션 스터디", href: "https://github.com/PLUB2022/kotlin-in-action" },
    ],
  },
];

export const record = {
  education: [
    { when: "2020.03 - 2027.02", what: "명지대학교 컴퓨터공학과", detail: "2027년 2월 졸업 예정, 전공 학점 3.94 / 4.5" },
    { when: "2026.03 - 현재", what: "지능형데이터처리 연구실 학부연구생", detail: "컨테이너 런타임별 학습 데이터 입력 파이프라인 성능 비교 연구" },
  ],
  activities: [
    { when: "UMC 10기 - 현재", what: "UMC 중앙 Android 파트장", detail: "전국 28개 대학, 약 1,000명 규모의 대학 연합 IT 동아리. 공식 Android 워크북을 개편하고 전국 챌린저 교육을 맡고 있습니다." },
    { when: "UMC 9기", what: "UMC Android 챌린저", detail: "팀 프로젝트로 데모데이 우수상" },
    { when: "19기 - 23기", what: "대학 연합 봉사 동아리 발룬타스 부회장, 회장", detail: "봉사 활동 약 310시간" },
  ],
  awards: [
    { when: "2025", what: "UMC 9기 데모데이 우수상" },
    { when: "2024", what: "MEDILUX 21기 대상" },
    { when: "2024", what: "제6회 청년 스타트업 어워즈 대상" },
  ],
  skills: [
    { group: "Android", items: ["Kotlin", "Jetpack Compose", "XML View", "Kotlin Multiplatform", "Compose Multiplatform", "Coroutines", "Flow", "Clean Architecture", "MVVM", "MVI"] },
    { group: "라이브러리", items: ["Hilt", "Koin", "Retrofit", "OkHttp", "Ktor", "Room", "DataStore", "Coil", "Firebase"] },
    { group: "품질과 배포", items: ["R8", "Custom Lint", "Macrobenchmark", "GitHub Actions", "fastlane"] },
    { group: "그 밖에", items: ["Spring Boot", "PostgreSQL", "Docker", "Python", "FastAPI", "Unity"] },
  ],
};
