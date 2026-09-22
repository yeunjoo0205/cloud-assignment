import { useEffect, useState } from "react";

const skills = [
  { name: "ETF 상품전략", w: 35 },
  { name: "시장 리서치", w: 25 },
  { name: "마케팅·콘텐츠", w: 25 },
  { name: "클라우드·개발", w: 15 },
];

export default function Intro() {
  const [filled, setFilled] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setFilled(true)); }, []);

  return (
    <>
      <header>
        <span className="ticker">AMY · KAIST DFMBA 7기</span>
        <h1>주연경 (Amy)</h1>
        <p className="sub">ETF 상품을 기획하고 알리는 일을 합니다. 요즘은 금융과 클라우드·AI가 만나는 지점을 공부하고 있어요.</p>
      </header>

      <h2>기본 정보</h2>
      <table className="facts">
        <tbody>
          <tr><th>소속</th><td>자산운용사 ETF상품마케팅본부 · 매니저</td></tr>
          <tr><th>담당 업무</th><td>ETF 신상품 발굴, 시장 리서치, 판매사 제안, 투자자 콘텐츠 제작</td></tr>
          <tr><th>학업</th><td>KAIST Digital Finance MBA 7기 (2025년 입학, 재직 병행)</td></tr>
          <tr><th>관심 테마</th><td>반도체, 우주·위성, AI 인프라, 디지털 자산</td></tr>
        </tbody>
      </table>

      <h2>역량 구성 비중</h2>
      <div className="bars">
        {skills.map((s) => (
          <div className="bar" key={s.name}>
            <span>{s.name}</span>
            <div className="track"><div className="fill" style={{ width: filled ? `${s.w}%` : 0 }} /></div>
            <span className="pct">{s.w}%</span>
          </div>
        ))}
      </div>

      <h2>이력</h2>
      <ul className="timeline">
        <li><span className="when">현재</span><div><strong>자산운용사 ETF상품마케팅본부</strong>ETF 상품전략 · 기관/판매사 영업 지원 · 마케팅</div></li>
        <li><span className="when">이전</span><div><strong>QUAD Investment Management</strong>자산운용 실무</div></li>
        <li><span className="when">이전</span><div><strong>넥슨코리아</strong>재무회계</div></li>
      </ul>

      <h2>이번 과제에서 만든 것</h2>
      <p>
        이 페이지는 React(Vite)로 만들어 Vercel에 배포했고,{" "}
        <a href="#demo">API 연동 실습 페이지</a>에서는 Render에 배포한 FastAPI 백엔드를 호출해
        메모를 조회·추가·삭제할 수 있습니다.
      </p>

      <p className="note">본 페이지는 클라우드컴퓨팅실습 개인과제용입니다. 과거의 이력이 미래의 성과를 보장하지 않습니다.</p>
    </>
  );
}
