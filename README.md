<<<<<<< HEAD
# moviewsd
=======
## 🎬 영화 추천 웹 애플리케이션
이 프로젝트는 Vue.js로 구현된 영화 추천 웹 애플리케이션입니다. TMDB API를 통해 인기 영화, 장르별 영화, 검색 기능 및 위시리스트를 관리할 수 있습니다. 또한, 로그인 및 회원가입 기능을 통해 사용자 인증을 지원합니다.

## 🚀 주요 기능

사용자 인증
- 로그인 및 로그아웃 기능
- 회원가입 및 API 키 유효성 검증

영화 데이터
- 인기 영화 목록 조회
- 영화 검색 및 상세 정보 보기
- 장르별 영화 필터링

위시리스트
- 좋아하는 영화 추가 및 관리
- 위시리스트 페이지에서 영화 리스트 조회

한국어(ko-KR) 기반의 영화 정보 제공

## ⚙️ 설치 및 실행 방법
## 1. 프로젝트 클론
   먼저 GitHub에서 프로젝트를 클론합니다:
```
git clone https://github.com/woojung1234/moviewsd.git
cd moviewsd
```
## 2. Project setup
    
npm을 사용하여 필수 의존성들을 설치합니다.
```
npm install
```

## 3. 개발 서버 실행
```
npm run serve
```

## 4. 프로덕션 빌드
```
npm run build
```
생성된 빌드는 dist/ 폴더에 저장됩니다.

## 5. 배포
```
git add .
git commit -m "commit"
git push origin your-branch
```
브랜치 push 후 PR에서 main 브랜치와 병합하여 배포합니다.
### 또는 
로컬 main 브랜치에서 
```
git merge 해당 브랜치
git push origin main
```
 으로 병합 후 배포합니다.

