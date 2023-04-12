# log simple client

쉽고 간단한 블로그 서비스입니다.

![메인 페이지](https://user-images.githubusercontent.com/80243123/231373243-cab3cb94-f376-42fa-b001-5cc4fce49a62.gif)

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

#### 회원가입

![회원가입 예시](https://user-images.githubusercontent.com/80243123/231371940-cdf9cc2d-7fed-4a26-930c-7032798e563f.gif)

- 유저이름, 이메일, 비밀번호를 입력하고 회원가입 할 수 있습니다.
- 각 필드를 검증 후, 문제가 있다면 에러 메시지를 표시합니다.
- 문제없이 회원가입했다면, 로그인 페이지로 이동합니다.

#### 로그인

![로그인 예시](https://user-images.githubusercontent.com/80243123/231372359-e4503dc7-cd9a-472b-952b-fcef95d173ef.gif)

- 이메일과 비밀번호를 입력해 로그인할 수 있습니다.
- 로그인을 실패한 경우, 에러 메시지를 표시합니다.
- 로그인을 성공한 경우, 기본적으로 **로그인 한 유저의 블로그 홈**으로 이동합니다.
  - 블로그 포스트 생성 페이지, 계정 설정 페이지처럼 로그인이 필요한 페이지에 로그인 안 된 상태로 접근하면, 로그인 페이지로 이동합니다. 즉, **인증이 필요한 페이지를 보호합니다.**
  - 이때, 유저가 로그인 성공하면, 직전에 접근하려고 했던 페이지로 이동합니다.

#### 로그아웃

![로그아웃 예시](https://user-images.githubusercontent.com/80243123/231372479-c06a9357-078c-40df-aa10-29bc02e80f6f.gif)

- 로그아웃 버튼을 클릭해 로그아웃할 수 있습니다.
- 위의 경우, 로그인 한 사용자만 접근할 수 있는, 계정 설정 페이지에서 로그아웃한 경우입니다.
  - 그래서 로그아웃되면 계정 설정 페이지에 접근할 수 없도록(**인증이 필요한 페이지를 보호**하기 위해) 로그인 페이지로 이동합니다.

#### 계정 설정

![계정 설정 예시](https://user-images.githubusercontent.com/80243123/231372578-44fc2341-6849-4959-a6d0-4ecce9c6e47a.gif)

유저이름, 짧은 소개, 소개, 비밀번호를 변경할 수 있습니다.

### 블로그 포스트 관련 기능

#### 블로그 포스트 생성/조회/수정/삭제

![블로그 포스트 CRUD 예시](https://user-images.githubusercontent.com/80243123/231372895-06061611-3fbd-4274-a4ef-9731f689f3d0.gif)

#### 블로그 포스트 목록 조회(infinite scroll)

![블로그 포스트 목록 조회 예시](https://user-images.githubusercontent.com/80243123/231373018-53890502-80eb-41dc-94a7-d9840f13caab.gif)

React Query(`useInfiniteQuery` hook), Intersection Observer API를 이용해 블로그 포스트 목록을 infinite scroll 형태로 구현했습니다.

## 로컬 환경에서 실행하는 방법

1. log-simple-server README의 [로컬 환경에서 실행하는 방법](https://github.com/keeep-runnning/log-simple-server/blob/main/README.md#%EB%A1%9C%EC%BB%AC-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-%EC%8B%A4%ED%96%89%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)을 참고해 log-simple-server를 `localhost:8080`에 먼저 실행시킵니다.
2. `.env.sample` 파일을 복사해 `.env` 파일을 생성합니다. (또는 `.env.sample` 파일의 이름을 `.env`로 변경합니다)
3. `npm install` 명령어로 필요한 패키지들을 설치합니다.
4. `npm run dev` 명령어로 webpack dev server를 실행시킵니다.

   - `3000` 포트에서 실행됩니다.
