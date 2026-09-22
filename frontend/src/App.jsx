import { useState, useEffect } from "react";
import Intro from "./Intro.jsx";
import MemoDemo from "./MemoDemo.jsx";

// 주소 끝의 #demo 여부로 두 페이지를 전환한다 (소개 ↔ API 연동 실습)
function currentPage() {
  return window.location.hash === "#demo" ? "demo" : "intro";
}

export default function App() {
  const [page, setPage] = useState(currentPage());

  useEffect(() => {
    const onHash = () => { setPage(currentPage()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="wrap">
      <nav className="topnav">
        <a className="brand" href="#">Amy</a>
        {page === "intro"
          ? <a className="go" href="#demo">API 연동 실습 페이지로 이동</a>
          : <a className="go" href="#">자기소개 페이지로 이동</a>}
      </nav>
      {page === "intro" ? <Intro /> : <MemoDemo />}
    </div>
  );
}
