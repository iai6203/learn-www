# 재프런 (2024)

### 핵심 기능

- 🔐 Clerk
- 📀 Prisma
- 📊 통계 대시보드 (선생님, 학생 별개)
- 📚 강좌 개설, 조회, 수정, 삭제
- 📚 챕터 등록, 조회, 수정, 삭제
- 🖱️ 드래그 & 드랍을 통한 챕터 순서 변경
- 🔎 데이터 검색
- 🌠 이미지 및 첨부 파일 ([uploadthing](https://uploadthing.com/))
- 🎥 미디어 플레이어 ([Mux](https://www.mux.com/))
- 🧾 강좌 결제 ([Stripe](https://stripe.com/))

### 필수 환경

- Node
- Docker

### 시작하기

1. 패키지 설치

    ```shell
    npm install
    ```

2. 환경 변수

    - `.env.example` 파일을 복사하여 `.env` 파일을 생성합니다.
    - `.env` 파일의 환경 변수들을 알맞게 설정합니다.
        - `Clerk`, `Stripe`, `Uploadthing`, `Mux`


3. 데이터베이스 구성

    ```shell
    # 개발 데이터베이스 실행
    npm run service
    
    # 테이블 생성
    npx prisma db push
    
    # 기본 데이터 추가
    node ./scripts/seed.ts
    ```

4. 서비스 실행

    ```shell
    # Stripe
    stripe listen --forward-to localhost:3000/api/webhook
    
    # Web
    npm run dev
    ```

### 가이드

- 개발 환경에서 테스트 결제를 시도하기 위해서는 아래 정보를 통해 결제해야 합니다.

    ```json
    {
      "카드 정보": "4242 4242 4242 4242",
      "유효 기간": "(과거가 아니라면 상관 없음)",
      "CVC": "상관 없음",
      "카드 소유자 이름": "상관 없음",
      "국가 또는 지역": "상관 없음"
    }
    ```
