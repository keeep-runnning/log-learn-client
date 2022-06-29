# log learn client

> 공부한 내용을 정리할 수 있는 블로그 서비스입니다.


## 기술 스택
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" /> 
<br>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Recoil-2C73D2?style=flat" />
<img src="https://img.shields.io/badge/React%20Query-FF4154?style=flat&logo=react%20query&logoColor=black" />
<img src="https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=react%20router&logoColor=black" />
<img src="https://img.shields.io/badge/emotion-FE74D0?style=flat" />
<br>
<img src="https://img.shields.io/badge/msw-FF3E00?style=flat" />
<br>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" />


## 주요 기능

### 🧑‍💻 계정 관리 기능
- 계정 만들기(회원 가입)
- 로그인, 로그아웃
- 계정 관리
    - 유저 이름 변경
    - 비밀번호 변경
    - 짧은 소개 및 소개 변경

### 📄 블로그 포스트 관리 기능
- 블로그 포스트 생성/수정/삭제
- 블로그 포스트 목록 조회
- 블로그 포스트 상세 조회


## 실행 방법

### 서버 없이 Local에서 실행하기
> 서버 api를 msw(Mock Service Worker)로 mocking해 front-end 개발을 진행했습니다.
1. dependency 설치
    ```bash
    npm install
    ```
2. msw와 함께 실행
    ```bash
    npm run dev-with-msw
    ```
> 📌 진짜 서버가 아니기 때문에 탭 내에서만 데이터가 유지됩니다.
