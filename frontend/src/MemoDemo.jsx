import { useState, useEffect } from "react";

// 백엔드 API 주소. 배포 환경에서는 Vercel 환경변수 VITE_API_URL(Render 주소)로 주입된다.
// VITE_ 로 시작하는 변수만 브라우저 코드에 노출된다.
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

export default function MemoDemo() {
  const [memos, setMemos] = useState([]);
  const [text, setText] = useState("");
  const [status, setStatus] = useState({ state: "", text: "서버에 연결하는 중… (첫 연결은 최대 1분)" });
  const [msg, setMsg] = useState({ text: "", err: false });

  useEffect(() => {
    checkHealth().then(loadMemos);   // 처음 뜰 때 서버 상태 확인 후 목록을 불러온다
  }, []);

  const checkHealth = async () => {
    try {
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      setStatus({ state: "ok", text: `연결됨 — ${data.message}` });
    } catch {
      setStatus({ state: "err", text: "연결 실패 — VITE_API_URL과 Render 상태를 확인하세요" });
    }
  };

  const loadMemos = async () => {
    try {
      const res = await fetch(`${API_URL}/memos`);          // 목록 조회 GET
      setMemos(await res.json());
    } catch {
      setMsg({ text: "메모 목록을 불러오지 못했습니다. 서버 연결을 확인하세요.", err: true });
    }
  };

  const addMemo = async () => {
    if (!text.trim()) return setMsg({ text: "메모 내용을 입력하세요.", err: true });
    try {
      const res = await fetch(`${API_URL}/memos`, {         // 메모 추가 POST
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),            // JS 객체 → JSON 문자열
      });
      const m = await res.json();
      setText("");
      setMsg({ text: `메모 #${m.id}을(를) 추가했습니다.`, err: false });
      loadMemos();
    } catch {
      setMsg({ text: "메모를 추가하지 못했습니다.", err: true });
    }
  };

  const deleteMemo = async (id) => {
    try {
      await fetch(`${API_URL}/memos/${id}`, { method: "DELETE" });   // 메모 삭제 DELETE
      setMsg({ text: `메모 #${id}을(를) 삭제했습니다.`, err: false });
      loadMemos();
    } catch {
      setMsg({ text: "메모를 삭제하지 못했습니다.", err: true });
    }
  };

  return (
    <>
      <header>
        <span className="ticker">Vercel ↔ Render</span>
        <h1>API 연동 실습</h1>
        <p className="sub">이 화면(React · Vercel)이 FastAPI 백엔드(Render)를 <code>fetch</code>로 호출해 메모를 주고받습니다.</p>
      </header>

      <h2>백엔드 연결 상태</h2>
      <span className="status"><span className={`dot ${status.state}`} />{status.text}</span>
      <p className="msg">
        API 주소: <code>{API_URL}</code> · <a href={`${API_URL}/docs`} target="_blank" rel="noopener noreferrer">Swagger UI 열기</a>
      </p>

      <h2>메모</h2>
      <div className="row">
        <input value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addMemo()}
          placeholder="메모를 입력하세요" maxLength={200} aria-label="메모 내용" />
        <button className="primary" onClick={addMemo}>메모 추가</button>
      </div>
      <p className={`msg${msg.err ? " err" : ""}`}>{msg.text}</p>
      <ul className="memos">
        {memos.length === 0 && <li>아직 메모가 없습니다. 위에서 첫 메모를 추가해 보세요.</li>}
        {memos.map((m) => (
          <li key={m.id}>
            <span><span className="id">#{m.id}</span>{m.content}</span>
            <button className="del" onClick={() => deleteMemo(m.id)}>삭제</button>
          </li>
        ))}
      </ul>

      <p className="note">무료 Render 서버는 한동안 요청이 없으면 잠들어, 첫 호출에 30~60초가 걸릴 수 있습니다. 메모는 서버 메모리에 저장되므로 서버가 재시작되면 초기화됩니다.</p>
    </>
  );
}
