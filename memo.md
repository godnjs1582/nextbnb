# 1 개발환경 구축
## 1) prettier, eslint
- eslint 설치 및 다운 : yarn
 add eslint --dev
- prettier 설치 및 다운 :yarn
 add --dev --exact prettier
- eslint-config-prettier 설치 : yarn add eslint-config-prettier --dev
- eslint-plugin-prettier 설치 : yarn add eslint-plugin-prettier --dev

## 2) supabase and prisma
- prisma 설치 : yarn add --dev prisma, yarn add @prisma/client(쿼리 날리기용)
- prisma init : npx prisma init
- supabase project 생성 > setting > database >connection string>uri 복사 
- .env의 DATABASE_URL 갈아끼기

## 3) database modeling schema 구성
- schema.prisma 에 model 생성
- 마이그레이션 명령 : npx prisma migrate dev --name init
- prisma studio 확인 : npx prisma studio

# 2. 공통 레이아웃 개발하기
## 1) Tailwind 사용하기
- tailwind.config.js 파일을 통해서 사용자 정의 스타일 및 커스텀 클래스 추가 가능
## 2) 공통 레이아웃 개발하기
- react-icons 설치 : yarn add react-icons
- not-found.tsx 생성






