# log simple client

쉽고 간단한 블로그 서비스입니다.

## 개발 일지

개발하면서 **공부한 내용**, **겪었던 문제를 해결하기 위해 노력했던 과정**을 [Github Wiki](https://github.com/keeep-runnning/log-simple-client/wiki)에 정리했습니다.

## 기술 스택

<div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react%20router&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />
  <img src="https://img.shields.io/badge/Emotion-FE74D0?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Chakra%20UI-319795?style=for-the-badge&logo=chakraui&logoColor=white" />
</div>
<div>
  <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=black" />
  <img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=Babel&logoColor=black" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" />
</div>
<div>
  <img src="https://img.shields.io/badge/Node.js-v18-339933?style=for-the-badge&logo=node.js" />
</div>

## 주요 기능

### 계정 관련 기능

- 회원가입, 로그인, 로그아웃
- 계정 설정
  - 유저이름 변경
  - 짧은 소개 변경
  - 소개 변경
  - 비밀번호 변경

### 블로그 포스트 관련 기능

- 블로그 포스트 생성/수정/삭제
- 블로그 포스트 목록 조회
- 블로그 포스트 상세 조회

## 로컬 환경에서 실행하는 방법

1. log-simple-server README의 [로컬 환경에서 실행하는 방법](https://github.com/keeep-runnning/log-simple-server/blob/main/README.md#%EB%A1%9C%EC%BB%AC-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-%EC%8B%A4%ED%96%89%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)을 참고해 log-simple-server를 `localhost:8080`에 먼저 실행시킵니다.
2. `.env.sample` 파일을 복사해 `.env` 파일을 생성합니다. (또는 `.env.sample` 파일의 이름을 `.env`로 변경합니다)
3. `npm install` 명령어로 필요한 패키지들을 설치합니다.
4. `npm run dev` 명령어로 webpack dev server를 실행시킵니다.

   - `3000` 포트에서 실행됩니다.
