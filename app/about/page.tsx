import Link from "next/link";

export const metadata = {
  title: "소개 — 하루하나불교",
  description: "처음엔 나를 위해 만들었습니다. 매일 아침 불안했던 저를 위해.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#EEECEA] text-[#1a1a1a]">

      {/* NAV */}
      <nav className="px-8 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-[13px] font-medium tracking-[0.08em] hover:opacity-60 transition-opacity"
        >
          하루하나불교
        </Link>
        <span className="text-[13px] text-[#1a1a1a] tracking-[0.04em]">소개</span>
      </nav>

      {/* OPENING — 큰 선언 */}
      <header className="px-8 pt-16 pb-24 max-w-4xl">
        <p className="text-[11px] tracking-[0.25em] text-[#888] uppercase mb-8">About</p>
        <h1
          className="font-light leading-tight text-[#1a1a1a]"
          style={{
            fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: "1.25",
          }}
        >
          처음엔<br />나를 위해<br />만들었습니다.
        </h1>
      </header>

      <div className="h-px bg-[#d5d2cf] mx-8" />

      {/* STORY SECTION 1 */}
      <section className="px-8 py-20 max-w-2xl">
        <p className="text-[11px] tracking-[0.25em] text-[#888] uppercase mb-8">01</p>
        <p
          className="font-light text-[#1a1a1a] leading-loose"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", lineHeight: "2" }}
        >
          불안, 불확실함이 넘쳐나는 요즘.
          <br /><br />
          저는 매일 아침마다 불안했습니다.
          <br />
          오늘은 어떤 일이 생길까.
          <br />
          앞으로 어떻게 살아야 할까.
          <br /><br />
          시선은 내가 아닌 자꾸 남으로만 가는 나날들.
          <br />
          점점 정신이 피폐해지는 것 같았습니다.
        </p>
      </section>

      <div className="h-px bg-[#d5d2cf] mx-8" />

      {/* STORY SECTION 2 — 전환점, 인용 강조 */}
      <section className="px-8 py-20">
        <p className="text-[11px] tracking-[0.25em] text-[#888] uppercase mb-12">02</p>

        <p
          className="font-light text-[#1a1a1a] leading-loose max-w-2xl mb-16"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", lineHeight: "2" }}
        >
          그러던 어느 날,
          <br />
          불교 경전의 한 글귀를 보고
          <br />
          마음이 편안해지는 기분이 들었죠.
        </p>

        {/* 전환점 인용 */}
        <blockquote className="border-l-2 border-[#1a1a1a] pl-8 my-12 max-w-xl">
          <p
            className="font-light text-[#1a1a1a] leading-loose"
            style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", lineHeight: "1.7" }}
          >
            "연꽃은 진흙 속에서 피어나지만
            <br />
            진흙에 물들지 않는다."
          </p>
          <p className="text-[12px] text-[#888] tracking-[0.15em] uppercase mt-4">— 법구경</p>
        </blockquote>

        <p
          className="font-light text-[#1a1a1a] leading-loose max-w-2xl mt-16"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", lineHeight: "2" }}
        >
          그래서 만들기 시작했습니다.
          <br />
          처음엔 나를 위해.
        </p>
      </section>

      <div className="h-px bg-[#d5d2cf] mx-8" />

      {/* STORY SECTION 3 — 확장 */}
      <section className="px-8 py-20 max-w-2xl">
        <p className="text-[11px] tracking-[0.25em] text-[#888] uppercase mb-8">03</p>
        <p
          className="font-light text-[#1a1a1a] leading-loose"
          style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", lineHeight: "2" }}
        >
          그런데 주변을 둘러보니
          <br />
          저와 비슷한 사람들이 많더군요.
          <br /><br />
          나를 포함한, 나의 주변 사람들도
          <br />
          작게나마 마음의 평안을 얻을 수 있었으면 좋겠다 싶었습니다.
          <br /><br />
          그래서 지금의
          <br />
          <span className="font-medium">'하루하나불교'</span>가 탄생하게 되었답니다.
        </p>
      </section>

      <div className="h-px bg-[#d5d2cf] mx-8" />

      {/* CLOSING — CTA */}
      <section className="px-8 py-24 text-center">
        <p
          className="font-light text-[#1a1a1a] mb-12"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)", letterSpacing: "-0.01em", lineHeight: "1.4" }}
        >
          오늘도 잠깐,
          <br />
          마음을 내려놓아 보세요.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#1a1a1a] text-[#1a1a1a] text-[13px] tracking-[0.12em] hover:bg-[#1a1a1a] hover:text-[#EEECEA] transition-colors"
        >
          오늘의 경전 보기 →
        </Link>
      </section>

      {/* FOOTER */}
      <div className="h-px bg-[#d5d2cf] mx-8" />
      <footer className="px-8 py-6 flex items-center justify-between">
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">매일 하나의 경전</span>
        <span className="text-[12px] text-[#1a1a1a] tracking-[0.06em]">© 하루하나불교</span>
      </footer>

    </div>
  );
}
