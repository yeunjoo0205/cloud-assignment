# Amy's Cloud Assignment — 개인 소개 페이지 & 프론트엔드·백엔드 연동

클라우드컴퓨팅실습(KAIST Digital Finance MBA) 개인과제입니다.
HTML로 만든 개인 소개 페이지와, FastAPI 백엔드를 호출하는 연동 실습 페이지를 배포했습니다.

## 배포 주소

| 구분 | 주소 |
|---|---|
| 프론트엔드 (Vercel) | https://YOUR-PROJECT.vercel.app |
| 백엔드 API (Render) | https://YOUR-SERVICE.onrender.com |
| Swagger UI | https://YOUR-SERVICE.onrender.com/docs |

## 주요 구성

| 계층 | 기술 | 역할 | 배포처 |
|---|---|---|---|
| 프론트엔드 | HTML · CSS · JavaScript(fetch) | 개인 소개, 백엔드 API 호출 결과 표시 | Vercel |
| 백엔드 | FastAPI · Uvicorn | 메모 조회·추가·삭제 API | Render |
| 소스 관리 | Git · GitHub | 코드와 문서 관리, push 시 자동 배포 | GitHub |

```
.
├── frontend/
│   ├── index.html     # 개인 소개 페이지 (→ demo.html 링크)
│   ├── demo.html      # API 연동 실습 페이지 (→ index.html 링크)
│   ├── styles.css
│   └── config.js      # 백엔드(Render) API 주소
├── backend/
│   ├── main.py        # FastAPI 앱
│   └── requirements.txt
└── README.md
```

## API 목록

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/` | 서버 상태 확인 |
| GET | `/memos` | 메모 목록 조회 |
| POST | `/memos` | 메모 추가 (`{"content": "..."}`) |
| DELETE | `/memos/{id}` | 메모 삭제 (없으면 404) |

## 배포 설정

- **Vercel**: Root Directory `frontend`, Framework Preset `Other` (빌드 없는 정적 사이트)
- **Render**: Root Directory `backend`
  - Build Command: `pip install -r requirements.txt`
  - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
  - 환경변수 `ALLOWED_ORIGINS`: Vercel 주소 (CORS 허용 출처)

## 참고

- 메모는 서버 메모리에 저장되므로 Render 서버가 재시작되면 초기화됩니다.
- Render 무료 플랜은 유휴 시 절전되어 첫 요청에 30~60초가 걸릴 수 있습니다.
