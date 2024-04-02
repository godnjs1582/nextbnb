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

# 4. 모킹 데이터 생성하기
## 1) Prisma 문법 알아보기
- Migration : 데이터베이스 스키마 변경을 추적하고 적용하는데 사용
- npx prisma migrate dev --name init
- npx prisma db seed : 데이터페이스 시드 적용
## 2) Prisma로 Mock 데이터 생성하기
- pacage.json 에 ```"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}```  추가
- yarn add @faker-js/faker --dev

# 5. 숙박 예약 플랫폼 메인 페이지 개발하기
## 1) date fetching
### (1) Next.js 12
- getStaticProps(SSG)
- getServerSideProps(SSR)
- getStaticProps  + revalidate(ISR)
### (2) Next.js 13
- fetch(Web API) 함수와 Cashing, Revalidating 정책을 사용해서 SSG, SSR, ISR 요청을 보낼 수 있음
- Next.js 13부터는 fetch Web API를 사용해서 데이터를 가져올 수 있음(App Router에서만 가능)
- 캐싱 및 revalidation 설정을 직접 할 수 있으며, 각 설정에 따라 SSR, SSG, ISR 구현 가능
- Server Component 내부에서 async/await 를 함께 사용해서 fetch API 사용
```
async function getData(){
  const res=await fetch("https://api.example.com/")

  if(!res.ok){
    throw new Erro("Failed to fetch data")
  }

  return res.json()
}

export default async function Page(){
 const res=await getData();
 return <main></main>
}
```
- a. SSR
- SSR(Server-Side Rendering) : 클라이언트가 요청할 때마다 서버에서 페이지를 동적으로 렌더링하여 HTML을 생성하고 클라이언트에게 전달하는 방법
- 캐싱정책 : no-store
```async function getData(){
  const res=await fetch("https://api.example.com/...",{cache:"no-store"});

  if(!res.ok){
    throw new Error("Failed to fetch data")
  }
  return res.json();
}```

- b. SSG
- SSG(Static Site Generation) : 빌드 시간에 페이지를 렌더링하여 정적인 HTML 파일을 생성하는 방법
- 캐싱정책 : force-cache(디폴트 값, 생략 가능)
- ```
async function getData(){
  const res=await fetch("https://api.example.com/...",{
    cache:"force-cache"
  })
  if(!res.ok){
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
```
- c. ISR
- SSG의 한 변형으로 페이지는 빌드 시간에 정적으로 생성되지만 특정 갱신 주기 동안에는 이전에 생성된 페이지를 서빙하고, 그 주기가 지나면 새로운 페이지를 생성하는 방법
- revalidate 옵션 사용





