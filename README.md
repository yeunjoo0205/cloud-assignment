# Amy's Cloud Assignment — 개인 소개 페이지 & 프론트엔드·백엔드 연동

클라우드컴퓨팅실습(KAIST Digital Finance MBA) 개인과제입니다.
React(Vite)로 만든 개인 소개 페이지와 API 연동 실습 페이지를 Vercel에 배포하고, Render에 배포한 FastAPI 백엔드를 호출합니다.

## 배포 주소

| 구분 | 주소 |
|---|---|
| 프론트엔드 (Vercel) | https://yeunkyung-cloud-assignment.vercel.app |
| API 연동 실습 페이지 | https://yeunkyung-cloud-assignment.vercel.app/#demo |
| 백엔드 API (Render) | https://yeunkyung-memo-api.onrender.com |
| Swagger UI | https://yeunkyung-memo-api.onrender.com/docs |

## 주요 구성

| 계층 | 기술 | 역할 | 배포처 |
|---|---|---|---|
| 프론트엔드 | React (Vite) | 개인 소개, 백엔드 API 호출(fetch) 및 결과 표시 | Vercel |
| 백엔드 | FastAPI · Uvicorn | 메모 조회·추가·삭제 API | Render |
| 소스 관리 | Git · GitHub | 코드와 문서 관리, push 시 자동 배포(CI/CD) | GitHub |

```
.
├── frontend/                 # Vercel (Root Directory: frontend)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx           # 소개(#) ↔ API 연동 실습(#demo) 페이지 전환
│       ├── Intro.jsx         # 개인 소개 페이지
│       ├── MemoDemo.jsx      # API 연동 실습 페이지 (GET/POST/DELETE)
│       └── styles.css
├── backend/                  # Render (Root Directory: backend)
│   ├── main.py               # FastAPI 앱
│   └── requirements.txt
└── README.md
```

소개 페이지 상단의 "API 연동 실습 페이지로 이동" 버튼으로 연동 실습 페이지에, 연동 실습 페이지의 "자기소개 페이지로 이동" 버튼으로 소개 페이지에 접근할 수 있습니다.

## API 목록

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/` | 서버 상태 확인 |
| GET | `/memos` | 메모 목록 조회 |
| POST | `/memos` | 메모 추가 (`{"content": "..."}`) |
| DELETE | `/memos/{id}` | 메모 삭제 (없으면 404) |

## 배포 설정

**Vercel (프론트엔드)**
- Framework Preset: `Vite` / Root Directory: `frontend`
- Build Command: `npm run build` / Output Directory: `dist`
- 환경변수 `VITE_API_URL` = `https://yeunkyung-memo-api.onrender.com`

**Render (백엔드)**
- Root Directory: `backend` / Language: Python 3 / Plan: Free
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- 환경변수 `ALLOWED_ORIGINS` = `https://yeunkyung-cloud-assignment.vercel.app` (CORS 허용 출처)

바뀌는 값(API 주소, 허용 출처)은 코드가 아니라 환경변수로 관리합니다.

## 로컬 실행

```bash
# 백엔드
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload  # http://localhost:8000/docs

# 프론트엔드 (다른 터미널)
cd frontend
npm install
npm run dev                # http://localhost:5173
```

## 참고

- 메모는 서버 메모리에 저장되므로 Render 서버가 재시작되면 초기화됩니다.
- Render 무료 플랜은 유휴 시 절전되어 첫 요청에 30~60초가 걸릴 수 있습니다.
