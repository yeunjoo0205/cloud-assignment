import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Amy's Memo API",
    description="클라우드컴퓨팅실습 개인과제 — Vercel 프론트엔드와 연동되는 FastAPI 백엔드",
)

# CORS: 허용할 프론트 주소를 환경변수로 관리 (바뀌는 값은 코드가 아니라 환경변수로)
# Render 환경변수 ALLOWED_ORIGINS 에 Vercel 주소를 넣으면 그 주소만 허용된다.
origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MemoIn(BaseModel):
    content: str

class MemoOut(BaseModel):
    id: int
    content: str

# 인메모리 저장소 (서버가 재시작되면 초기화된다)
memos: list[dict] = [{"id": 1, "content": "첫 번째 메모 — 백엔드에서 불러왔습니다"}]
next_id = 2

@app.get("/")
def health():
    return {"status": "ok", "message": "Amy's Memo API is running"}

@app.get("/memos", response_model=list[MemoOut])
def list_memos():
    return memos

@app.post("/memos", response_model=MemoOut)
def create_memo(memo: MemoIn):
    global next_id
    new = {"id": next_id, "content": memo.content}
    memos.append(new)
    next_id += 1
    return new

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id: int):
    global memos
    if not any(m["id"] == memo_id for m in memos):
        raise HTTPException(status_code=404, detail="Memo not found")
    memos = [m for m in memos if m["id"] != memo_id]
    return {"ok": True}
